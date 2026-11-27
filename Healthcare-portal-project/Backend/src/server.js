require("dotenv").config();

const app = require("./app");
const { connectToDatabase } = require("./config/database");

const port = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on port ${port}`);
    });

    connectToDatabase().catch((error) => {
        console.error("Initial MongoDB connection failed:", error.message);
    });
}

module.exports = app;
