const appointmentService = require("../services/appointmentService");

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

const todayString = () => new Date().toISOString().slice(0, 10);

async function bookAppointment(req, res) {
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

    const appointment = await appointmentService.createAppointment({
        patientName,
        age: Number(age),
        gender,
        phone,
        email,
        doctor,
        appointmentDate,
        appointmentTime,
        symptoms
    });

    return res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment
    });
}

async function getBookedAppointments(req, res) {
    const { doctor, date } = req.query;

    if (!doctor || !date || !DATE_RE.test(String(date))) {
        return res.status(400).json({
            success: false,
            message: "doctor and date (YYYY-MM-DD) are required"
        });
    }

    const taken = await appointmentService.getBookedSlots(String(doctor), String(date));

    return res.json({
        success: true,
        doctor,
        date,
        bookedSlots: taken.map((appointment) => appointment.appointmentTime)
    });
}

module.exports = { bookAppointment, getBookedAppointments };
