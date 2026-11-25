import { useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { doctors } from "../data/doctors";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const initial = {
  patientName: "",
  patientAge: "",
  patientGender: "",
  patientPhone: "",
  patientEmail: "",
  appointmentDoctor: "",
  appointmentDate: "",
  appointmentTime: "",
  symptoms: "",
};

export default function Appointment() {
  const [params] = useSearchParams();
  const preselected = params.get("doctor") || "";
  const [form, setForm] = useState({
    ...initial,
    appointmentDoctor: preselected,
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const doctor = doctors.find(
    (item) => String(item.id) === form.appointmentDoctor,
  );
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 90);
    return date.toISOString().slice(0, 10);
  }, []);

  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const validate = () => {
    const next = {};
    if (!form.patientName.trim())
      next.patientName = "Patient name is required.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(form.patientName.trim()))
      next.patientName = "Patient name contains invalid characters.";
    const age = Number(form.patientAge);
    if (!age) next.patientAge = "Age is required.";
    else if (age < 1 || age > 120)
      next.patientAge = "Age must be between 1 and 120.";
    if (!form.patientGender) next.patientGender = "Please select a gender.";
    if (!/^\d{10}$/.test(form.patientPhone.replace(/[\s()-]/g, "")))
      next.patientPhone = "Enter a valid 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.patientEmail))
      next.patientEmail = "Enter a valid email address.";
    if (!form.appointmentDoctor)
      next.appointmentDoctor = "Please select a doctor.";
    if (!form.appointmentDate)
      next.appointmentDate = "Please select an appointment date.";
    else if (form.appointmentDate < today || form.appointmentDate > maxDate)
      next.appointmentDate = "Please select a date within the next 90 days.";
    if (!form.appointmentTime)
      next.appointmentTime = "Please select a time slot.";
    if (form.symptoms.trim().length < 10)
      next.symptoms = "Reason for visit must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (!API_BASE_URL) throw new Error("VITE_API_URL is not configured.");
      const payload = {
        patientName: form.patientName.trim(),
        age: Number(form.patientAge),
        gender: form.patientGender,
        phone: form.patientPhone.trim(),
        email: form.patientEmail.trim(),
        doctor: String(doctor?.name || form.appointmentDoctor),
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        symptoms: form.symptoms.trim(),
      };
      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Unable to book appointment.");
      setModal(result.appointment);
      setForm(initial);
    } catch (error) {
      alert(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };
  const fmt = (date) =>
    date
      ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";
  const FieldError = ({ name }) =>
    errors[name] ? (
      <span className="error-msg" role="alert">
        <i className="fas fa-circle-exclamation" /> {errors[name]}
      </span>
    ) : null;
  const times = [
    "09:00 AM – 09:30 AM",
    "09:30 AM – 10:00 AM",
    "10:00 AM – 10:30 AM",
    "10:30 AM – 11:00 AM",
    "11:00 AM – 11:30 AM",
    "11:30 AM – 12:00 PM",
    "02:00 PM – 02:30 PM",
    "02:30 PM – 03:00 PM",
    "03:00 PM – 03:30 PM",
    "03:30 PM – 04:00 PM",
    "04:00 PM – 04:30 PM",
    "05:00 PM – 05:30 PM",
    "05:30 PM – 06:00 PM",
  ];

  return (
    <>
      <section className="page-hero" aria-labelledby="pageHeroTitle">
        <div className="container">
          <div className="page-hero-content">
            <h1 id="pageHeroTitle">Book an Appointment</h1>
            <p>
              Fill in your details to schedule a consultation with your chosen
              doctor
            </p>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <NavLink to="/">Home</NavLink>
              <i
                className="fas fa-chevron-right"
                style={{ fontSize: ".7rem" }}
              />
              <NavLink to="/doctors">Doctors</NavLink>
              <i
                className="fas fa-chevron-right"
                style={{ fontSize: ".7rem" }}
              />
              <span>Book Appointment</span>
            </nav>
          </div>
        </div>
      </section>
      <section className="appointment-section">
        <div className="container">
          <div className="appointment-grid">
            <div>
              <div className="form-card">
                <h2 className="form-card-title">
                  <i className="fas fa-calendar-plus" /> Patient Information
                </h2>
                <p className="form-card-subtitle">
                  All fields marked with{" "}
                  <span style={{ color: "var(--danger)" }}>*</span> are
                  required.
                </p>
                <form
                  noValidate
                  aria-label="Appointment booking form"
                  onSubmit={submit}
                >
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="patientName">
                        <i className="fas fa-user" /> Full Name{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        id="patientName"
                        name="patientName"
                        className={`form-input${errors.patientName ? " invalid" : ""}`}
                        value={form.patientName}
                        onChange={update}
                        placeholder="e.g. Arjun Sharma"
                        autoComplete="name"
                      />
                      <FieldError name="patientName" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="patientAge">
                        <i className="fas fa-calendar" /> Age{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        id="patientAge"
                        name="patientAge"
                        type="number"
                        min="1"
                        max="120"
                        className={`form-input${errors.patientAge ? " invalid" : ""}`}
                        value={form.patientAge}
                        onChange={update}
                        placeholder="e.g. 30"
                      />
                      <FieldError name="patientAge" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="patientGender">
                        <i className="fas fa-venus-mars" /> Gender{" "}
                        <span className="required">*</span>
                      </label>
                      <select
                        id="patientGender"
                        name="patientGender"
                        className={`form-select${errors.patientGender ? " invalid" : ""}`}
                        value={form.patientGender}
                        onChange={update}
                      >
                        <option value="">— Select Gender —</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                      <FieldError name="patientGender" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="patientPhone">
                        <i className="fas fa-phone" /> Phone Number{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        id="patientPhone"
                        name="patientPhone"
                        type="tel"
                        className={`form-input${errors.patientPhone ? " invalid" : ""}`}
                        value={form.patientPhone}
                        onChange={update}
                        placeholder="10-digit mobile number"
                        autoComplete="tel"
                      />
                      <FieldError name="patientPhone" />
                    </div>
                    <div className="form-group full">
                      <label className="form-label" htmlFor="patientEmail">
                        <i className="fas fa-envelope" /> Email Address{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        id="patientEmail"
                        name="patientEmail"
                        type="email"
                        className={`form-input${errors.patientEmail ? " invalid" : ""}`}
                        value={form.patientEmail}
                        onChange={update}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                      <FieldError name="patientEmail" />
                    </div>
                    <div className="form-group full">
                      <label className="form-label" htmlFor="appointmentDoctor">
                        <i className="fas fa-user-doctor" /> Select Doctor{" "}
                        <span className="required">*</span>
                      </label>
                      <select
                        id="appointmentDoctor"
                        name="appointmentDoctor"
                        className={`form-select${errors.appointmentDoctor ? " invalid" : ""}`}
                        value={form.appointmentDoctor}
                        onChange={update}
                      >
                        <option value="">— Select a Doctor —</option>
                        {doctors.map((item) => (
                          <option value={String(item.id)} key={item.id}>
                            {item.name} ({item.specialization})
                          </option>
                        ))}
                      </select>
                      <FieldError name="appointmentDoctor" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="appointmentDate">
                        <i className="fas fa-calendar-day" /> Appointment Date{" "}
                        <span className="required">*</span>
                      </label>
                      <input
                        id="appointmentDate"
                        name="appointmentDate"
                        type="date"
                        min={today}
                        max={maxDate}
                        className={`form-input${errors.appointmentDate ? " invalid" : ""}`}
                        value={form.appointmentDate}
                        onChange={update}
                      />
                      <FieldError name="appointmentDate" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="appointmentTime">
                        <i className="fas fa-clock" /> Preferred Time Slot{" "}
                        <span className="required">*</span>
                      </label>
                      <select
                        id="appointmentTime"
                        name="appointmentTime"
                        className={`form-select${errors.appointmentTime ? " invalid" : ""}`}
                        value={form.appointmentTime}
                        onChange={update}
                      >
                        <option value="">— Select Time Slot —</option>
                        {times.map((time) => (
                          <option value={time} key={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <FieldError name="appointmentTime" />
                    </div>
                    <div className="form-group full">
                      <label className="form-label" htmlFor="symptoms">
                        <i className="fas fa-notes-medical" /> Reason for Visit
                        / Symptoms <span className="required">*</span>
                      </label>
                      <textarea
                        id="symptoms"
                        name="symptoms"
                        className={`form-textarea${errors.symptoms ? " invalid" : ""}`}
                        rows="4"
                        value={form.symptoms}
                        onChange={update}
                        placeholder="Briefly describe your symptoms or reason for the consultation…"
                      />
                      <FieldError name="symptoms" />
                    </div>
                    <button
                      type="submit"
                      className="form-submit"
                      disabled={submitting}
                    >
                      <i
                        className={
                          submitting
                            ? "fas fa-spinner fa-spin"
                            : "fas fa-calendar-check"
                        }
                      />
                      {submitting ? "Booking…" : "Confirm Appointment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="sidebar-sticky">
              <div className="summary-card">
                <h3 className="summary-card-title">
                  <i className="fas fa-receipt" /> Appointment Summary
                </h3>
                {doctor || form.patientName ? (
                  <>
                    <div className="summary-doctor">
                      {doctor && (
                        <>
                          <div className="summary-doctor-avatar">
                            <img src={doctor.image} alt="" />
                          </div>
                          <div>
                            <div className="summary-doctor-name">
                              {doctor.name}
                            </div>
                            <div className="summary-doctor-spec">
                              {doctor.specialization}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="summary-rows">
                      {form.patientName && (
                        <div className="summary-row">
                          <i className="fas fa-user" />
                          <div>
                            <div className="summary-row-label">Patient</div>
                            <div className="summary-row-value">
                              {form.patientName}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="summary-row">
                        <i className="fas fa-calendar" />
                        <div>
                          <div className="summary-row-label">Date</div>
                          <div className="summary-row-value">
                            {fmt(form.appointmentDate)}
                          </div>
                        </div>
                      </div>
                      {form.appointmentTime && (
                        <div className="summary-row">
                          <i className="fas fa-clock" />
                          <div>
                            <div className="summary-row-label">Time</div>
                            <div className="summary-row-value">
                              {form.appointmentTime}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="summary-placeholder">
                    <i className="fas fa-calendar-heart" />
                    Fill in the form to see your appointment summary
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {modal && (
        <div
          className="modal-overlay show"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="modal-card">
            <div className="modal-icon">✅</div>
            <h2 className="modal-title" id="modalTitle">
              Appointment Confirmed!
            </h2>
            <p className="modal-subtitle">
              Your appointment has been successfully booked. A confirmation will
              be sent to your email.
            </p>
            <div className="modal-details">
              <div className="modal-detail-row">
                <i className="fas fa-user-doctor" />
                <span className="modal-detail-label">Doctor</span>
                <span className="modal-detail-value">{modal.doctor}</span>
              </div>
              <div className="modal-detail-row">
                <i className="fas fa-user" />
                <span className="modal-detail-label">Patient</span>
                <span className="modal-detail-value">{modal.patientName}</span>
              </div>
              <div className="modal-detail-row">
                <i className="fas fa-calendar" />
                <span className="modal-detail-label">Date</span>
                <span className="modal-detail-value">
                  {fmt(modal.appointmentDate)}
                </span>
              </div>
              <div className="modal-detail-row">
                <i className="fas fa-clock" />
                <span className="modal-detail-label">Time</span>
                <span className="modal-detail-value">
                  {modal.appointmentTime}
                </span>
              </div>
            </div>
            <button className="modal-close-btn" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
