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

app.get("/health", (req, res) => {
    const databaseConnected = mongoose.connection.readyState === 1;

    res.status(databaseConnected ? 200 : 503).json({
        status: databaseConnected ? "ok" : "unavailable",
        database: databaseConnected ? "connected" : "disconnected"
    });
});

app.use("/api/appointments", (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: "Appointment service is temporarily unavailable"
        });
    }

    next();
});

// Routes
app.use("/api/appointments", appointmentRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Healthcare+ API is running"
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
});

async function connectToMongo() {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not set; MongoDB connection is disabled");
        return;
    }

    while (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000
            });
            console.log("MongoDB connected successfully");
        } catch (error) {
            console.error("MongoDB connection failed:", error.message);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}

connectToMongo();