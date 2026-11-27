function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    let statusCode = 500;
    let message = "Internal server error";

    if (error.code === 11000) {
        statusCode = 409;
        message = "This doctor and time slot is already booked";
    } else if (error.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(error.errors)[0].message;
    } else if (error.statusCode === 503) {
        statusCode = 503;
        message = "Database service is temporarily unavailable";
    } else if (error.status === 400) {
        statusCode = 400;
        message = "Invalid request";
    }

    if (statusCode === 503 && req.path === "/health") {
        return res.status(503).json({
            status: "unavailable",
            database: "disconnected"
        });
    }

    if (statusCode === 500) {
        console.error("Request error:", error);
    }

    return res.status(statusCode).json({ success: false, message });
}

module.exports = errorHandler;
