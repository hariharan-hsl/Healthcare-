const express = require("express");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes");
const healthRoutes = require("./routes/healthRoutes");
const ensureDatabase = require("./middleware/ensureDatabase");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
    res.json({ success: true, message: "Healthcare+ API is running" });
});

app.use("/health", healthRoutes);
app.use("/api/appointments", ensureDatabase, appointmentRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
