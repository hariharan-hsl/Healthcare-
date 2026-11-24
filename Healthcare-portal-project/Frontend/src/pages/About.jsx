import { NavLink } from "react-router-dom";
import { doctors } from "../data/doctors";

const values = [
  ["teal", "fas fa-heart-pulse", "Patient First", "Every feature, decision, and improvement starts with one question: does this make it better for the patient?"],
  ["blue", "fas fa-shield-halved", "Trust & Transparency", "We verify every doctor, show real reviews, and display honest fees. No surprises, ever."],
  ["purple", "fas fa-universal-access", "Accessibility", "Quality healthcare shouldn't be a privilege. We work to make our platform inclusive and affordable for all."],
  ["orange", "fas fa-bolt", "Speed & Efficiency", "Book appointments in under 2 minutes. Get care when you need it, not when the system allows it."],
  ["green", "fas fa-leaf", "Continuous Improvement", "We listen, learn, and evolve. Your feedback shapes the platform you use every day."],
  ["pink", "fas fa-handshake", "Empathy & Care", "Healthcare is deeply personal. We treat every patient and provider with genuine empathy and respect."],
];

const team = [
  ["RK", "Rohit Kumar", "Co-Founder & CEO", "Healthcare entrepreneur with 12 years in digital health. Passionate about making care accessible."],
  ["AP", "Ananya Patel", "Chief Medical Officer", "MBBS, MD with 15 years clinical experience. Ensures all medical standards are upheld."],
  ["VN", "Vikram Nair", "CTO", "Full-stack engineer and AI enthusiast building the tech infrastructure that powers HealthCare+."],
  ["SM", "Sonal Mehta", "Head of Patient Experience", "Former hospital administrator dedicated to ensuring every patient interaction is seamless."],
];

const reasons = [
  ["fas fa-user-check", "Verified Specialists", "All doctors undergo strict license, credential, and background verification."],
  ["fas fa-calendar-check", "Convenient Booking", "Choose a doctor and request an appointment through one simple form."],
  ["fas fa-comments", "Patient Reviews", "Review ratings and information to help you choose with confidence."],
  ["fas fa-lock", "Data Privacy", "Your personal information is handled with care."],
  ["fas fa-headset", "Support", "Contact our team for booking questions and assistance."],
  ["fas fa-tag", "Transparent Pricing", "See consultation fees on doctor profiles before booking."],
];

export default function About() {
  return <>
    <section className="page-hero" aria-labelledby="aboutPageTitle">
      <div className="container">
        <div className="page-hero-content">
          <div className="section-badge"><i className="fas fa-heart-pulse" /> About HealthCare+</div>
          <h1 id="aboutPageTitle">Care that puts people first</h1>
          <p>Learn about our mission, the people behind HealthCare+, and how we make it easier to find care.</p>
          <nav className="breadcrumb" aria-label="Breadcrumb"><NavLink to="/">Home</NavLink><i className="fas fa-chevron-right" aria-hidden="true" /><span>About</span></nav>
        </div>
      </div>
    </section>

    <section className="story-section" aria-labelledby="storyTitle">
      <div className="container">
        <div className="story-grid">
          <div className="story-image-wrap reveal">
            <img className="about-story-photo" src={doctors[0].image} alt="A doctor ready to help patients" loading="lazy" />
            <div className="story-float-card"><div className="story-float-icon">🎯</div><div><div className="story-float-title">Founded 2020</div><div className="story-float-sub">5+ years of excellence</div></div></div>
          </div>
          <div className="story-text reveal reveal-delay-1">
            <div className="section-badge"><i className="fas fa-book-open" /> Our Story</div>
            <h2 className="section-title" id="storyTitle">Born From a <span>Real Need</span></h2>
            <p>In 2020, our founder experienced firsthand the frustration of finding the right specialist quickly. Long waiting times, confusing referral chains, and lack of transparent information inspired the creation of HealthCare+.</p>
            <p>We started with just 5 doctors and a handful of patients. Today, we've grown into a trusted platform connecting hundreds of patients with 50+ verified specialists across multiple cities.</p>
            <ul className="story-list">{["All doctors verified with license checks", "Real patient reviews and ratings", "Transparent fees — no hidden charges", "HIPAA-compliant data protection", "24/7 patient support helpline"].map((item) => <li className="story-list-item" key={item}><i className="fas fa-check-circle" /> {item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    <section className="values-section" aria-labelledby="valuesTitle">
      <div className="container">
        <div className="section-header reveal"><div className="section-badge"><i className="fas fa-star" /> Our Values</div><h2 className="section-title" id="valuesTitle">What We <span>Stand For</span></h2><p className="section-subtitle">These core principles guide every decision we make and every interaction we have.</p></div>
        <div className="values-grid">{values.map(([color, icon, title, description]) => <article className="value-card reveal" key={title}><div className={`value-icon ${color}`}><i className={icon} /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
      </div>
    </section>

    <section className="team-section" aria-labelledby="teamTitle">
      <div className="container">
        <div className="section-header reveal"><div className="section-badge"><i className="fas fa-users" /> Our Team</div><h2 className="section-title" id="teamTitle">The People <span>Behind HealthCare+</span></h2><p className="section-subtitle">A passionate team of technologists, healthcare professionals, and patient advocates.</p></div>
        <div className="team-grid">{team.map(([initials, name, role, description]) => <article className="team-card reveal" key={name}><div className="team-avatar" aria-hidden="true">{initials}</div><h3 className="team-name">{name}</h3><p className="team-role">{role}</p><p className="team-desc">{description}</p></article>)}</div>
      </div>
    </section>

    <section className="why-section" aria-labelledby="whyTitle">
      <div className="container">
        <div className="section-header reveal" style={{ color: "#fff" }}><div className="section-badge" style={{ background: "rgba(255,255,255,.1)", color: "#fff" }}><i className="fas fa-trophy" /> Why HealthCare+</div><h2 className="section-title" id="whyTitle" style={{ color: "#fff" }}>A simpler way to <span style={{ color: "#5eead4" }}>find care</span></h2></div>
        <div className="why-grid">{reasons.map(([icon, title, description]) => <article className="why-card reveal" key={title}><i className={icon} /><h4>{title}</h4><p>{description}</p></article>)}</div>
      </div>
    </section>

    <section className="about-cta">
      <div className="container">
        <div className="reveal"><div className="section-badge"><i className="fas fa-calendar-plus" /> Get Started</div><h2 className="section-title">Ready to Experience Better Healthcare?</h2><p className="section-subtitle">Explore our doctors and find a specialist for your appointment.</p><div className="about-cta-actions"><NavLink to="/doctors" className="btn btn-primary btn-lg btn-pulse"><i className="fas fa-search" /> Find a Doctor</NavLink><NavLink to="/contact" className="btn btn-outline btn-lg"><i className="fas fa-phone" /> Contact Us</NavLink></div></div>
      </div>
    </section>
  </>;
}
