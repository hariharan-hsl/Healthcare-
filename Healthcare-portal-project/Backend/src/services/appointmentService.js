const Appointment = require("../models/appointment");

function createAppointment(data) {
    return new Appointment(data).save();
}

function getBookedSlots(doctor, date) {
    return Appointment.find(
        { doctor, appointmentDate: date },
        { appointmentTime: 1, _id: 0 }
    ).lean();
}

module.exports = { createAppointment, getBookedSlots };
