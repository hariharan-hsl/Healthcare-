const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Cached MongoDB connection, reused across requests (serverless-safe)
let connectPromise = null;

async function connectToMongo() {
    if (mongoose.connection.readyState === 1) return;

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set");
    }

    if (!connectPromise) {
        connectPromise = mongoose
            .connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000
            })
            .then(() => console.log("MongoDB connected successfully"))
            .catch((error) => {
                connectPromise = null; // allow a retry on the next request
                throw error;
            });
    }

    await connectPromise;
}

// Test API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Healthcare+ API is running"
    });
});

app.get("/health", async (req, res) => {
    try {
        await connectToMongo();
        res.status(200).json({ status: "ok", database: "connected" });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        res.status(503).json({ status: "unavailable", database: "disconnected" });
    }
});

// Make sure DB is connected before any appointment route runs
app.use("/api/appointments", async (req, res, next) => {
    try {
        await connectToMongo();
        next();
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        res.status(503).json({
            success: false,
            message: "Appointment service is temporarily unavailable"
        });
    }
});

// Routes
app.use("/api/appointments", appointmentRoutes);

// Listen only when running locally. Vercel handles requests itself.
if (!process.env.VERCEL) {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = app;
