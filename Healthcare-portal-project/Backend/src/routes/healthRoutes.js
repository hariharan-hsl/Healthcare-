const express = require("express");
const ensureDatabase = require("../middleware/ensureDatabase");
const healthController = require("../controllers/healthController");

const router = express.Router();

router.get("/", ensureDatabase, healthController.getHealth);

module.exports = router;
