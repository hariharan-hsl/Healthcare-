const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set to false once the database connection works
const SHOW_DEBUG_REASON = true;

// ---------- Middleware ----------
const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json({ limit: "10kb" }));

// =====================================================
// MONGODB CONNECTION
// The URI comes from the MONGO_URI environment variable
// (Vercel: Settings -> Environment Variables, or local .env)
// =====================================================
const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.on("connected", () => console.log("Mongoose: connected to", mongoose.connection.name));
mongoose.connection.on("error", (err) => console.error("Mongoose: connection error:", err.message));
mongoose.connection.on("disconnected", () => console.log("Mongoose: disconnected"));

let connectPromise = null;

async function connectToMongo() {
    if (mongoose.connection.readyState === 1) return;

    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not set in environment variables");
    }

    if (!connectPromise) {
        connectPromise = mongoose
            .connect(MONGO_URI, {
                serverSelectionTimeoutMS: 10000,
                maxPoolSize: 5
            })
            .then(() => console.log("MongoDB connected successfully"))
            .catch((error) => {
                connectPromise = null; // retry on the next request
                throw error;
            });
    }

    await connectPromise;
}

// When running locally, connect right away so problems show at startup
if (!process.env.VERCEL) {
    connectToMongo().catch((e) => console.error("Initial MongoDB connection failed:", e.message));
}

function debugReason(error) {
    if (!SHOW_DEBUG_REASON) return undefined;
    const code = error.code ? ` [${error.code}]` : "";
    return `${error.name}${code}: ${String(error.message).slice(0, 250)}`;
}

// =====================================================
// ROUTES
// =====================================================
app.get("/", (req, res) => {
    res.json({ success: true, message: "Healthcare+ API is running" });
});

app.get("/health", async (req, res) => {
    try {
        await connectToMongo();
        res.status(200).json({ status: "ok", database: "connected" });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(503).json({
            status: "unavailable",
            database: "disconnected",
            reason: debugReason(error)
        });
    }
});

app.use("/api/appointments", async (req, res, next) => {
    try {
        await connectToMongo();
        next();
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(503).json({
            success: false,
            message: "Appointment service is temporarily unavailable",
            reason: debugReason(error)
        });
    }
});

app.use("/api/appointments", appointmentRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Listen only locally; Vercel handles requests itself
if (!process.env.VERCEL) {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = app;
