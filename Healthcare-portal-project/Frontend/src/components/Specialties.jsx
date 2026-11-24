import { NavLink } from "react-router-dom";
import { doctors } from "../data/doctors";

const specialties = [
  { name: "Cardiologist", label: "Cardiology", icon: "fa-heart-pulse", description: "Heart and circulation consultations." },
  { name: "Dentist", label: "Dentistry", icon: "fa-tooth", description: "Dental and oral health consultations." },
  { name: "Orthopedic", label: "Orthopedics", icon: "fa-bone", description: "Bone, joint, and mobility consultations." },
  { name: "Neurologist", label: "Neurology", icon: "fa-brain", description: "Nervous system and neurological consultations." },
  { name: "Pediatrician", label: "Pediatrics", icon: "fa-child", description: "Healthcare for children and families." },
];

export default function Specialties() {
  return (
    <section className="specialties-section" aria-labelledby="specialtiesTitle">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-badge"><i className="fas fa-stethoscope" /> Our Specialties</div>
          <h2 className="section-title" id="specialtiesTitle">Find Care by <span>Specialty</span></h2>
          <p className="section-subtitle">Explore our specialties and find a doctor for your consultation.</p>
        </div>
        <div className="specialty-grid">
          {specialties.map((specialty) => {
            const count = doctors.filter((doctor) => doctor.specialization === specialty.name).length;
            return (
              <NavLink
                className="specialty-card"
                to={`/doctors?specialization=${encodeURIComponent(specialty.name)}`}
                key={specialty.name}
              >
                <span className="specialty-icon" aria-hidden="true"><i className={`fas ${specialty.icon}`} /></span>
                <span className="specialty-name">{specialty.label}</span>
                <span className="specialty-description">{specialty.description}</span>
                <span className="specialty-count">{count} doctors <i className="fas fa-arrow-right" aria-hidden="true" /></span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
