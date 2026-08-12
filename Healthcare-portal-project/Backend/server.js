const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/appointments", appointmentRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Healthcare+ API is running"
    });
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running at http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });