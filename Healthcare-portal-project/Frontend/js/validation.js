/* ============================================
   VALIDATION.JS — Form field & date validators
   ============================================ */

'use strict';

/* ── Show / clear inline error ── */
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(fieldId + 'Error');
  if (!field) return false;

  field.classList.add('invalid');
  field.classList.remove('valid');
  if (errEl) errEl.innerHTML = `<i class="fas fa-circle-exclamation"></i> ${message}`;
  return false;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(fieldId + 'Error');
  if (!field) return;

  field.classList.remove('invalid');
  field.classList.add('valid');
  if (errEl) errEl.innerHTML = '';
}

/* ── Individual field validators ── */
function validateName(id, label) {
  const val = (document.getElementById(id)?.value || '').trim();
  if (!val) return showError(id, `${label} is required.`);
  if (val.length < 2) return showError(id, `${label} must be at least 2 characters.`);
  if (!/^[a-zA-Z\s.'-]+$/.test(val)) return showError(id, `${label} contains invalid characters.`);
  clearError(id);
  return true;
}

function validateAge(id) {
  const val = document.getElementById(id)?.value;
  if (!val) return showError(id, 'Age is required.');
  const age = parseInt(val, 10);
  if (isNaN(age) || age < 1 || age > 120) return showError(id, 'Age must be between 1 and 120.');
  clearError(id);
  return true;
}

function validateSelect(id, label) {
  const val = document.getElementById(id)?.value;
  if (!val || val === '' || val === 'select') return showError(id, `Please select a ${label}.`);
  clearError(id);
  return true;
}

function validatePhone(id) {
  const val = (document.getElementById(id)?.value || '').trim();
  if (!val) return showError(id, 'Phone number is required.');
  if (!/^\d{10}$/.test(val.replace(/[\s\-\(\)]/g, ''))) {
    return showError(id, 'Enter a valid 10-digit phone number.');
  }
  clearError(id);
  return true;
}

function validateEmail(id) {
  const val = (document.getElementById(id)?.value || '').trim();
  if (!val) return showError(id, 'Email address is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    return showError(id, 'Enter a valid email address (e.g. user@example.com).');
  }
  clearError(id);
  return true;
}

function validateDate(id) {
  const field = document.getElementById(id);
  if (!field) return false;
  const val = field.value;
  if (!val) return showError(id, 'Please select an appointment date.');

  const selected = new Date(val);
  const today    = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selected.getTime())) return showError(id, 'Invalid date selected.');
  if (selected < today) return showError(id, 'Appointment date cannot be in the past.');

  // Max 90 days in future
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);
  if (selected > maxDate) return showError(id, 'Please select a date within the next 90 days.');

  clearError(id);
  return true;
}

function validateTextarea(id, label, minLen) {
  const val = (document.getElementById(id)?.value || '').trim();
  if (!val) return showError(id, `${label} is required.`);
  if (minLen && val.length < minLen) return showError(id, `${label} must be at least ${minLen} characters.`);
  clearError(id);
  return true;
}

/* ── Full form validation ── */
function validateAppointmentForm() {
  const checks = [
    validateName('patientName', 'Patient name'),
    validateAge('patientAge'),
    validateSelect('patientGender', 'gender'),
    validatePhone('patientPhone'),
    validateEmail('patientEmail'),
    validateSelect('appointmentDoctor', 'doctor'),
    validateDate('appointmentDate'),
    validateSelect('appointmentTime', 'time slot'),
    validateTextarea('symptoms', 'Reason for visit', 10)
  ];
  return checks.every(Boolean);
}

function validateContactForm() {
  const checks = [
    validateName('contactName', 'Your name'),
    validateEmail('contactEmail'),
    validateName('contactSubject', 'Subject'),
    validateTextarea('contactMessage', 'Message', 20)
  ];
  return checks.every(Boolean);
}

/* ── Live validation on blur ── */
function attachLiveValidation() {
  const rules = {
    patientName:       () => validateName('patientName', 'Patient name'),
    patientAge:        () => validateAge('patientAge'),
    patientGender:     () => validateSelect('patientGender', 'gender'),
    patientPhone:      () => validatePhone('patientPhone'),
    patientEmail:      () => validateEmail('patientEmail'),
    appointmentDoctor: () => validateSelect('appointmentDoctor', 'doctor'),
    appointmentDate:   () => validateDate('appointmentDate'),
    appointmentTime:   () => validateSelect('appointmentTime', 'time slot'),
    symptoms:          () => validateTextarea('symptoms', 'Reason for visit', 10),
    contactName:       () => validateName('contactName', 'Your name'),
    contactEmail:      () => validateEmail('contactEmail'),
    contactSubject:    () => validateName('contactSubject', 'Subject'),
    contactMessage:    () => validateTextarea('contactMessage', 'Message', 20)
  };

  Object.entries(rules).forEach(([id, fn]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', fn);
  });
}

document.addEventListener('DOMContentLoaded', attachLiveValidation);
