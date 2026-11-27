const mongoose = require("mongoose");

let connectionPromise = null;

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    connectionPromise = null;
    console.log("MongoDB disconnected");
});

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set in environment variables");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 5
        }).catch((error) => {
            connectionPromise = null;
            throw error;
        });
    }

    await connectionPromise;
}

module.exports = { connectToDatabase };
