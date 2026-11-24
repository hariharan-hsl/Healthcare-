
'use strict';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    experience: 14,
    hospital: 'City Heart Center',
    fee: 800,
    availableDays: ['Mon', 'Wed', 'Fri'],
    rating: 5,
    reviews: 128,
    emoji: '👩‍⚕️',
    color: '#0d9488',
    about: 'Expert in interventional cardiology with 14 years of experience.'
  },
  {
    id: 2,
    name: 'Dr. James Patel',
    specialization: 'Cardiologist',
    experience: 18,
    hospital: 'Metro Cardiac Hospital',
    fee: 1000,
    availableDays: ['Tue', 'Thu', 'Sat'],
    rating: 5,
    reviews: 210,
    emoji: '👨‍⚕️',
    color: '#0891b2',
    about: 'Pioneering minimally invasive cardiac procedures.'
  },
  {
    id: 3,
    name: 'Dr. Priya Mehta',
    specialization: 'Dentist',
    experience: 9,
    hospital: 'Bright Smile Clinic',
    fee: 500,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    rating: 4,
    reviews: 87,
    emoji: '👩‍⚕️',
    color: '#7c3aed',
    about: 'Specializes in cosmetic dentistry and painless procedures.'
  },
  {
    id: 4,
    name: 'Dr. Marcus Lee',
    specialization: 'Dentist',
    experience: 12,
    hospital: 'Pearl Dental Studio',
    fee: 600,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    rating: 4,
    reviews: 103,
    emoji: '👨‍⚕️',
    color: '#db2777',
    about: 'Certified in orthodontics and advanced restorative dentistry.'
  },
  {
    id: 5,
    name: 'Dr. Aisha Rahman',
    specialization: 'Orthopedic',
    experience: 16,
    hospital: 'Bone & Joint Institute',
    fee: 900,
    availableDays: ['Tue', 'Wed', 'Fri'],
    rating: 5,
    reviews: 174,
    emoji: '👩‍⚕️',
    color: '#ea580c',
    about: 'Expert in sports injuries and joint replacement surgeries.'
  },
  {
    id: 6,
    name: 'Dr. Raj Sharma',
    specialization: 'Orthopedic',
    experience: 20,
    hospital: 'Advanced Spine Center',
    fee: 1100,
    availableDays: ['Mon', 'Thu', 'Sat'],
    rating: 5,
    reviews: 256,
    emoji: '👨‍⚕️',
    color: '#d97706',
    about: 'Renowned spinal surgeon with international training.'
  },
  {
    id: 7,
    name: 'Dr. Elena Torres',
    specialization: 'Neurologist',
    experience: 11,
    hospital: 'NeuroScience Medical Center',
    fee: 950,
    availableDays: ['Mon', 'Tue', 'Fri'],
    rating: 4,
    reviews: 92,
    emoji: '👩‍⚕️',
    color: '#2563eb',
    about: 'Specializes in epilepsy, migraines, and movement disorders.'
  },
  {
    id: 8,
    name: 'Dr. David Chen',
    specialization: 'Neurologist',
    experience: 15,
    hospital: 'Brain Health Institute',
    fee: 1050,
    availableDays: ['Wed', 'Thu', 'Sat'],
    rating: 5,
    reviews: 149,
    emoji: '👨‍⚕️',
    color: '#4f46e5',
    about: 'Leading researcher in neurodegenerative diseases and stroke management.'
  },
  {
    id: 9,
    name: 'Dr. Meera Nair',
    specialization: 'Pediatrician',
    experience: 8,
    hospital: "Children's Wellness Clinic",
    fee: 600,
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    rating: 5,
    reviews: 195,
    emoji: '👩‍⚕️',
    color: '#16a34a',
    about: 'Passionate about child development, immunizations, and family health.'
  },
  {
    id: 10,
    name: 'Dr. Noah Williams',
    specialization: 'Pediatrician',
    experience: 13,
    hospital: 'Little Stars Hospital',
    fee: 700,
    availableDays: ['Mon', 'Thu', 'Sat'],
    rating: 4,
    reviews: 138,
    emoji: '👨‍⚕️',
    color: '#0d9488',
    about: 'Expert in neonatal care and childhood respiratory conditions.'
  },
  {
    id: 11,
    name: 'Dr. Fatima Al-Hassan',
    specialization: 'Cardiologist',
    experience: 10,
    hospital: 'Heartbeat Wellness Center',
    fee: 850,
    availableDays: ['Tue', 'Thu', 'Sat'],
    rating: 4,
    reviews: 76,
    emoji: '👩‍⚕️',
    color: '#0891b2',
    about: 'Focused on preventive cardiology and echocardiography.'
  },
  {
    id: 12,
    name: 'Dr. Samuel Okonkwo',
    specialization: 'Orthopedic',
    experience: 7,
    hospital: 'ActiveLife Orthopedics',
    fee: 750,
    availableDays: ['Mon', 'Wed', 'Thu'],
    rating: 4,
    reviews: 61,
    emoji: '👨‍⚕️',
    color: '#ea580c',
    about: 'Specializes in arthroscopic surgery and pediatric orthopedics.'
  }
];

/* ── Build star HTML ── */
function buildStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fas fa-star${i > rating ? ' empty' : ''}"></i>`;
  }
  return html;  
}

/* ── Build single card ── */
function buildDoctorCard(doc, index) {
  const delay = Math.min(index * 60, 400);
  return `
    <div class="doctor-card" role="article" style="animation-delay:${delay}ms" data-id="${doc.id}">
      <div class="card-top" style="background: linear-gradient(135deg, ${doc.color} 0%, ${doc.color}cc 100%);">
        <div class="availability-badge">
          <i class="fas fa-circle" style="font-size:.5rem;margin-right:4px;color:#86efac"></i>Available
        </div>
        <div class="card-avatar" aria-hidden="true" style="background:${doc.color}22;">
          <span style="font-size:2.2rem;">${doc.emoji}</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-name">${doc.name}</h3>
        <span class="spec-badge">
          <i class="fas fa-stethoscope"></i>${doc.specialization}
        </span>
        <div class="card-meta">
          <div class="card-meta-row">
            <i class="fas fa-briefcase-medical"></i>
            <span>${doc.experience} years experience</span>
          </div>
          <div class="card-meta-row">
            <i class="fas fa-hospital"></i>
            <span>${doc.hospital}</span>
          </div>
          <div class="card-meta-row">
            <i class="fas fa-calendar-check"></i>
            <span>${doc.availableDays.join(', ')}</span>
          </div>
        </div>
        <div class="card-rating">
          <div class="stars" aria-label="Rating: ${doc.rating} out of 5">${buildStars(doc.rating)}</div>
          <span class="rating-num">${doc.rating}.0</span>
          <span class="rating-count">(${doc.reviews} reviews)</span>
        </div>
        <div class="card-footer">
          <div>
            <div class="fee-label">Consultation Fee</div>
            <div class="fee-amount">₹${doc.fee.toLocaleString()} <span class="fee-unit">/ visit</span></div>
          </div>
          <a href="appointment.html?doctor=${doc.id}" class="btn-book" aria-label="Book appointment with ${doc.name}">
            <i class="fas fa-calendar-plus"></i>Book
          </a>
        </div>
      </div>
    </div>
  `.trim();
}

/* ── Render doctor list ── */
function showDoctors(list) {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state" role="status">
        <div class="empty-state-icon">🔍</div>
        <h3>No doctors found</h3>
        <p>Try adjusting your search or filter to find a doctor.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((doc, i) => buildDoctorCard(doc, i)).join('');
  updateResultsCount(list.length);
}

/* ── Update results count text ── */
function updateResultsCount(count) {
  const el = document.getElementById('resultsCount');
  if (el) el.innerHTML = `Showing <strong>${count}</strong> doctor${count !== 1 ? 's' : ''}`;
}

/* ── Show loading shimmer ── */
function showShimmer() {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;
  grid.innerHTML = Array.from({ length: 6 }, () =>
    `<div class="shimmer-card"><div class="shimmer"></div></div>`
  ).join('');
}

/* ── Init doctors page ── */
function initDoctorsPage() {
  if (!document.getElementById('doctorsGrid')) return;

  showShimmer();
  setTimeout(() => {
    showDoctors(doctors);
    // init filter after doctors are rendered
    if (typeof initFilter === 'function') initFilter();
  }, 600);
}

document.addEventListener('DOMContentLoaded', initDoctorsPage);
