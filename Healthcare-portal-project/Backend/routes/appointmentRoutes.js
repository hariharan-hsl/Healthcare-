const express = require("express");
const Appointment = require("../models/appointment");

const router = express.Router();

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

const todayString = () => new Date().toISOString().slice(0, 10);

// POST /api/appointments/book
router.post("/book", async (req, res) => {
    try {
        const {
            patientName, age, gender, phone, email,
            doctor, appointmentDate, appointmentTime, symptoms
        } = req.body || {};

        if (
            !patientName || !age || !gender || !phone || !email ||
            !doctor || !appointmentDate || !appointmentTime || !symptoms
        ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!EMAIL_RE.test(String(email).trim())) {
            return res.status(400).json({ success: false, message: "Invalid email address" });
        }

        if (!PHONE_RE.test(String(phone).trim())) {
            return res.status(400).json({ success: false, message: "Invalid phone number" });
        }

        if (!DATE_RE.test(String(appointmentDate))) {
            return res.status(400).json({
                success: false,
                message: "appointmentDate must be in YYYY-MM-DD format"
            });
        }

        if (String(appointmentDate) < todayString()) {
            return res.status(400).json({
                success: false,
                message: "Appointment date cannot be in the past"
            });
        }

        const saved = await new Appointment({
            patientName,
            age: Number(age),
            gender,
            phone,
            email,
            doctor,
            appointmentDate,
            appointmentTime,
            symptoms
        }).save();

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: saved
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "This doctor and time slot is already booked"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors)[0].message
            });
        }

        console.error("Appointment Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET /api/appointments/booked?doctor=Dr. Sarah Wilson&date=2026-12-05
// Returns only taken slots, no patient data
router.get("/booked", async (req, res) => {
    try {
        const { doctor, date } = req.query;

        if (!doctor || !date || !DATE_RE.test(String(date))) {
            return res.status(400).json({
                success: false,
                message: "doctor and date (YYYY-MM-DD) are required"
            });
        }

        const taken = await Appointment.find(
            { doctor: String(doctor), appointmentDate: String(date) },
            { appointmentTime: 1, _id: 0 }
        ).lean();

        return res.json({
            success: true,
            doctor,
            date,
            bookedSlots: taken.map((a) => a.appointmentTime)
        });
    } catch (error) {
        console.error("Booked slots error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
