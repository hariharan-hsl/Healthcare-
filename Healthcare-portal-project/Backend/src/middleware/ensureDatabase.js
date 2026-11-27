const { connectToDatabase } = require("../config/database");

async function ensureDatabase(req, res, next) {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        error.statusCode = 503;
        next(error);
    }
}

module.exports = ensureDatabase;
