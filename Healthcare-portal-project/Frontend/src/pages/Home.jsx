import { Fragment, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Specialties from "../components/Specialties";

function Counter({ target }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let current = 0;
      const increment = target / 112;
      const timer = setInterval(() => {
        current = Math.min(target, current + increment);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 16);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>0</span>;
}

export default function Home() {
  return <>
    <section className="hero-section" aria-labelledby="heroTitle"><div className="container"><div className="hero-inner">
      <div className="hero-text"><div className="hero-badge"><i className="fas fa-shield-heart" />Trusted by 500+ patients across India</div><h1 className="hero-title" id="heroTitle">Your Health,<br /><span>Our Priority</span></h1><p className="hero-desc">Connect with India's top-rated specialists. Book appointments instantly, manage your health records, and get the care you deserve — all in one place.</p>
      <div className="hero-actions"><NavLink to="/doctors" className="btn btn-white btn-lg btn-pulse"><i className="fas fa-search" /> Find a Doctor</NavLink><NavLink to="/appointment" className="btn btn-outline btn-lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}><i className="fas fa-calendar-plus" /> Book Appointment</NavLink></div><div className="hero-trust"><div className="trust-item"><i className="fas fa-check-circle" /> Verified Doctors</div><div className="trust-item"><i className="fas fa-clock" /> 24/7 Support</div><div className="trust-item"><i className="fas fa-lock" /> Secure &amp; Private</div></div></div>
      <div className="hero-illustration"><div className="hero-card-main"><div className="hero-med-icon">🏥</div><h3>World-Class Healthcare</h3><p>50+ specialist doctors across 5 departments</p></div><div className="hero-float hero-float-1"><div className="hero-float-icon">⭐</div><div><div className="hero-float-title">Top Rated</div><div className="hero-float-sub">4.9 / 5 rating</div></div></div><div className="hero-float hero-float-2"><div className="hero-float-icon">📅</div><div><div className="hero-float-title">Easy Booking</div><div className="hero-float-sub">Instant confirmation</div></div></div></div>
    </div></div></section>
    <section className="stats-section" aria-labelledby="statsTitle"><div className="container"><div className="stats-grid">
      {[["users","500","+" ,"Happy Patients"],["user-doctor","50","+" ,"Expert Doctors"],["stethoscope","20","+" ,"Specializations"]].map(([icon, target, suffix, label], i) => <div className={`stat-card reveal reveal-delay-${i}`} key={label}><div className="stat-icon"><i className={`fas fa-${icon}`} /></div><div className="stat-number"><Counter target={Number(target)} /><span className="stat-suffix">{suffix}</span></div><div className="stat-label">{label}</div></div>)}
      <div className="stat-card reveal reveal-delay-3"><div className="stat-icon"><i className="fas fa-headset" /></div><div className="stat-number">24<span className="stat-suffix">/7</span></div><div className="stat-label">Support Available</div></div>
    </div></div></section>
    <section className="about-section" aria-labelledby="aboutTitle"><div className="container"><div className="about-grid"><div className="about-image-wrap reveal"><div className="about-image-emoji">🩺</div><div className="about-badge-float"><div><div className="num">98%</div><div className="lbl">Patient Satisfaction</div></div><span style={{ fontSize: "1.5rem" }}>😊</span></div></div><div className="about-text reveal reveal-delay-1"><div className="section-badge"><i className="fas fa-heart-pulse" /> About HealthCare+</div><h2 className="section-title" id="aboutTitle">Bringing <span>Quality Healthcare</span> to Everyone</h2><p className="section-subtitle">We believe excellent healthcare should be accessible, affordable, and simple. Our platform connects patients with verified specialists, making every step — from discovery to booking — effortless.</p>
      <div className="about-features-grid">{[["🏆","Expert Doctors","Verified specialists across all major departments"],["⚡","Easy Booking","Book in under 2 minutes, instant confirmation"],["🔒","Secure & Private","Your data is encrypted and never shared"],["💬","24/7 Support","Round-the-clock helpdesk for your queries"]].map(([icon,title,desc]) => <div className="about-feature" key={title}><span className="about-feature-icon">{icon}</span><div><h4>{title}</h4><p>{desc}</p></div></div>)}</div><div className="mt-32"><NavLink to="/about" className="btn btn-primary"><i className="fas fa-arrow-right" /> Learn More</NavLink></div>
    </div></div></div></section>
    <Specialties />
    <section className="how-section" aria-labelledby="howTitle"><div className="container"><div className="section-header reveal"><div className="section-badge"><i className="fas fa-list-ol" /> How It Works</div><h2 className="section-title" id="howTitle">Get Care in <span>3 Simple Steps</span></h2><p className="section-subtitle">From finding the right doctor to your appointment — it all takes just minutes.</p></div><div className="steps-grid">
      {[["1","🔍","Search a Doctor","Browse our network of verified specialists. Filter by specialization, location, or availability."],["2","📅","Book an Appointment","Choose a convenient time slot, fill in your details, and confirm your booking in seconds."],["3","🏥","Visit Your Doctor","Arrive at your appointment with confidence. Get world-class care from your chosen specialist."]].map(([num,icon,title,desc],i) => <Fragment key={title}><div className="step-card reveal"><div className="step-num">{num}</div><div className="step-icon">{icon}</div><h3>{title}</h3><p>{desc}</p></div>{i < 2 && <div className="step-connector" aria-hidden="true"><i className="fas fa-chevron-right" /></div>}</Fragment>)}
    </div></div></section>
    <section className="cta-section" aria-labelledby="ctaTitle"><div className="container"><div className="cta-card reveal"><div className="cta-content"><div className="section-badge" style={{ background:"rgba(255,255,255,.12)",color:"#fff",marginBottom:16 }}><i className="fas fa-star" /> Start Today</div><h2 id="ctaTitle">Ready to Take Control of Your Health?</h2><p>Join thousands of patients who trust HealthCare+ for their medical needs. Book your first appointment today.</p><div className="cta-actions"><NavLink to="/doctors" className="btn btn-white btn-lg btn-pulse"><i className="fas fa-search" /> Browse Doctors</NavLink><NavLink to="/contact" className="btn btn-lg" style={{ background:"rgba(255,255,255,.1)",color:"#fff",border:"1.5px solid rgba(255,255,255,.3)" }}><i className="fas fa-phone" /> Contact Us</NavLink></div></div></div></div></section>
  </>;
}
