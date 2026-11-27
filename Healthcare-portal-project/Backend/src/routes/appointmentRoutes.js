const express = require("express");
const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

router.post("/book", appointmentController.bookAppointment);
router.get("/booked", appointmentController.getBookedAppointments);

module.exports = router;
