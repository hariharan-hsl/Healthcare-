const express = require("express");
const Appointment = require("../models/appointment");

const router = express.Router();


// =====================================================
// POST /api/appointments/book
// Book Appointment
// =====================================================

router.post("/book", async (req, res) => {

    try {

        const {
            patientName,
            age,
            gender,
            phone,
            email,
            doctor,
            appointmentDate,
            appointmentTime,
            symptoms
        } = req.body;


        // -------------------------------
        // Validation
        // -------------------------------

        if (
            !patientName ||
            !age ||
            !gender ||
            !phone ||
            !email ||
            !doctor ||
            !appointmentDate ||
            !appointmentTime ||
            !symptoms
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"
            });
        }


        // -------------------------------
        // Check duplicate slot
        // -------------------------------

        const existingAppointment =
            await Appointment.findOne({

                doctor: doctor,

                appointmentDate:
                    appointmentDate,

                appointmentTime:
                    appointmentTime
            });


        if (existingAppointment) {

            return res.status(409).json({

                success: false,

                message:
                    "This doctor and time slot is already booked"
            });
        }


        // -------------------------------
        // Create appointment
        // -------------------------------

        const appointment =
            new Appointment({

                patientName,

                age,

                gender,

                phone,

                email,

                doctor,

                appointmentDate,

                appointmentTime,

                symptoms
            });


        // -------------------------------
        // Save MongoDB
        // -------------------------------

        const savedAppointment =
            await appointment.save();


        // -------------------------------
        // Response
        // -------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Appointment booked successfully",

            appointment:
                savedAppointment
        });


    } catch (error) {

        console.error(
            "Appointment Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Internal server error"
        });
    }
});


module.exports = router;