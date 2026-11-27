const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            min: 1,
            max: 120
        },
        gender: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        doctor: {
            type: String,
            required: true
        },
        appointmentDate: {
            type: String,
            required: true
        },
        appointmentTime: {
            type: String,
            required: true
        },
        symptoms: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("appointment", appointmentSchema);
