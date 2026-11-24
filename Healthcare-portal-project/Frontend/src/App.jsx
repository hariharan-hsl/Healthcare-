import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Contact from "./pages/Contact";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("hc-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("hc-theme", theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => document.querySelector(".navbar")?.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobile = () => {
    setMobileOpen((open) => {
      document.body.style.overflow = open ? "" : "hidden";
      return !open;
    });
  };

  const nav = [
    ["/", "Home"],
    ["/doctors", "Doctors"],
    ["/appointment", "Appointment"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container"><div className="nav-inner">
          <NavLink to="/" className="nav-logo" aria-label="HealthCare+ Home"><div className="nav-logo-icon" aria-hidden="true">✚</div>HealthCare<span style={{ color: "#5eead4" }}>+</span></NavLink>
          <ul className="nav-links" role="list">{nav.map(([to, label]) => <li key={to}><NavLink to={to} className={({ isActive }) => isActive ? "active" : ""} end={to === "/"}>{label}</NavLink></li>)}</ul>
          <div className="nav-actions">
            <button className="theme-toggle" aria-label="Toggle dark/light theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><span className="theme-icon">{theme === "dark" ? "☀️" : "🌙"}</span></button>
            <NavLink to="/appointment" className="btn btn-primary btn-sm">Book Now</NavLink>
            <button id="hamburger" className={`hamburger${mobileOpen ? " open" : ""}`} aria-label="Open navigation menu" aria-expanded={mobileOpen} onClick={toggleMobile}><span /><span /><span /></button>
          </div>
        </div></div>
      </nav>
      <nav id="mobileNav" className={`mobile-nav${mobileOpen ? " open" : ""}`} aria-label="Mobile navigation">
        <NavLink to="/">🏠 Home</NavLink><NavLink to="/doctors">👨‍⚕️ Doctors</NavLink><NavLink to="/appointment">📅 Appointment</NavLink><NavLink to="/about">ℹ️ About</NavLink><NavLink to="/contact">📞 Contact</NavLink>
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer" role="contentinfo"><div className="container"><div className="footer-grid">
      <div className="footer-brand"><NavLink to="/" className="nav-logo"><div className="nav-logo-icon">✚</div>HealthCare<span style={{ color: "#5eead4" }}>+</span></NavLink><p>Connecting patients with the best healthcare professionals across India. Your health, our commitment.</p><div className="footer-social"><a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f" /></a><a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter" /></a><a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram" /></a><a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a></div></div>
      <div className="footer-col"><h4>Quick Links</h4><ul><li><NavLink to="/">Home</NavLink></li><li><NavLink to="/doctors">Find Doctors</NavLink></li><li><NavLink to="/appointment">Book Appointment</NavLink></li><li><NavLink to="/about">About Us</NavLink></li><li><NavLink to="/contact">Contact</NavLink></li></ul></div>
      <div className="footer-col"><h4>Specializations</h4><ul>{["Cardiology","Dentistry","Orthopedics","Neurology","Pediatrics"].map((item) => <li key={item}><NavLink to="/doctors">{item}</NavLink></li>)}</ul></div>
      <div className="footer-col"><h4>Contact Info</h4><ul><li><a href="tel:+911234567890">📞 +91 12345 67890</a></li><li><a href="mailto:info@healthcareplus.in">✉️ info@healthcareplus.in</a></li><li><a href="#">📍 Mumbai, Maharashtra</a></li><li><a href="#">🕐 Mon–Sat, 8am–8pm</a></li></ul></div>
    </div><div className="footer-bottom"><p>© 2025 HealthCare+. All rights reserved.</p><p>Made with ❤️ for better healthcare</p></div></div></footer>
  );
}

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = {
      "/": "HealthCare+ | Your Health, Our Priority",
      "/doctors": "Find Doctors | HealthCare+",
      "/appointment": "Book Appointment | HealthCare+",
      "/about": "About Us | HealthCare+",
      "/contact": "Contact Us | HealthCare+",
    };
    document.title = titles[location.pathname] || "HealthCare+";

    const elements = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);
  return <><Header /><main className="page-wrapper"><Routes><Route path="/" element={<Home />} /><Route path="/doctors" element={<Doctors />} /><Route path="/appointment" element={<Appointment />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /></Routes></main><Footer /></>;
}
