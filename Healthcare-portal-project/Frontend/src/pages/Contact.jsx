import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Contact() {
  const [form,setForm] = useState({ name:"",email:"",subject:"",message:"" });
  const [open,setOpen] = useState(null);
  const [sending,setSending] = useState(false);
  const [errors,setErrors] = useState({});
  const update = (event) => setForm({...form,[event.target.name]:event.target.value});
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Your name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.subject.trim().length < 2) next.subject = "Subject must be at least 2 characters.";
    if (form.message.trim().length < 20) next.message = "Message must be at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    setTimeout(() => { setSending(false); setForm({ name:"",email:"",subject:"",message:"" }); setErrors({}); alert("Message sent! We'll get back to you within 24 hours."); },1000);
  };
  const faqs = [
    ["How do I book an appointment?","Go to the Doctors page, browse or search for a specialist, and click \"Book Appointment.\" You'll be taken to the booking form where you can choose a date and time slot."],
    ["Are the doctors on HealthCare+ verified?","Yes. Every doctor listed undergoes medical license validation, credential checks, hospital affiliation verification, and background screening."],
    ["Can I cancel or reschedule my appointment?","Yes, you can cancel or reschedule up to 2 hours before your scheduled appointment. Contact support at +91 12345 67890."],
    ["Is my personal health data safe?","We follow strict data security practices. Personal and health information is encrypted and never sold or shared without consent."],
    ["What should I bring to my appointment?","Bring a valid photo ID, insurance card if applicable, previous reports, prescriptions, or test results. Arrive 15 minutes early."],
    ["Are online consultations available?","Telemedicine is actively being developed. For now, all appointments are in-person at the doctor's listed hospital or clinic."]
  ];
  return <>
    <section className="page-hero" aria-labelledby="pageHeroTitle"><div className="container"><div className="page-hero-content"><h1 id="pageHeroTitle">Get in Touch</h1><p>We're here to help — whether it's a question, feedback, or just a hello</p><nav className="breadcrumb" aria-label="Breadcrumb"><NavLink to="/">Home</NavLink><i className="fas fa-chevron-right" style={{fontSize:" .7rem"}}/><span>Contact</span></nav></div></div></section>
    <section className="contact-section"><div className="container"><div className="contact-grid"><div className="contact-form-card"><h2 className="contact-form-title"><i className="fas fa-envelope" /> Send Us a Message</h2><p className="contact-form-subtitle">Fill in the form below and we'll get back to you within 24 hours.</p><form noValidate onSubmit={submit}><div className="contact-form-grid">
      {[["name","text","Your Name","e.g. Priya Sharma","fa-user"],["email","email","Email Address","you@example.com","fa-envelope"]].map(([name,type,label,placeholder,icon]) => <div className="form-group" key={name}><label className="form-label" htmlFor={`contact${name}`}><i className={`fas ${icon}`} /> {label} <span className="required">*</span></label><input id={`contact${name}`} name={name} type={type} className={`form-input${errors[name]?" invalid":""}`} value={form[name]} onChange={update} placeholder={placeholder} />{errors[name]&&<span className="error-msg">{errors[name]}</span>}</div>)}
      <div className="form-group full"><label className="form-label" htmlFor="contactsubject"><i className="fas fa-tag" /> Subject <span className="required">*</span></label><input id="contactsubject" name="subject" className={`form-input${errors.subject?" invalid":""}`} value={form.subject} onChange={update} placeholder="e.g. Appointment query, Doctor availability…" />{errors.subject&&<span className="error-msg">{errors.subject}</span>}</div>
      <div className="form-group full"><label className="form-label" htmlFor="contactmessage"><i className="fas fa-comment" /> Your Message <span className="required">*</span></label><textarea id="contactmessage" name="message" className={`form-textarea contact-form-textarea${errors.message?" invalid":""}`} rows="6" value={form.message} onChange={update} placeholder="Tell us how we can help you…" />{errors.message&&<span className="error-msg">{errors.message}</span>}</div>
      <button type="submit" className="contact-submit" disabled={sending}><i className={sending?"fas fa-spinner fa-spin":"fas fa-paper-plane"} /> {sending?"Sending…":"Send Message"}</button>
    </div></form></div>
    <div className="contact-sidebar"><div className="contact-info-card"><h3 className="contact-info-title"><i className="fas fa-address-book" /> Contact Information</h3><div className="contact-info-list"><div className="contact-info-item"><div className="contact-info-icon"><i className="fas fa-phone" /></div><div><div className="contact-info-label">Phone</div><div className="contact-info-value"><a href="tel:+911234567890" style={{color:"inherit"}}>+91 12345 67890</a></div></div></div><div className="contact-info-item"><div className="contact-info-icon"><i className="fas fa-envelope" /></div><div><div className="contact-info-label">Email</div><div className="contact-info-value"><a href="mailto:info@healthcareplus.in" style={{color:"inherit"}}>info@healthcareplus.in</a></div></div></div><div className="contact-info-item"><div className="contact-info-icon"><i className="fas fa-location-dot" /></div><div><div className="contact-info-label">Address</div><div className="contact-info-value">Mumbai, Maharashtra, India</div></div></div></div></div></div></div></div></section>
    <section className="faq-section" aria-labelledby="faqTitle"><div className="container"><div className="section-header reveal"><div className="section-badge"><i className="fas fa-circle-question" /> FAQ</div><h2 className="section-title" id="faqTitle">Frequently Asked <span>Questions</span></h2></div><div className="faq-list" role="list">{faqs.map(([question,answer],index)=><div className={`faq-item${open===index?" open":""}`} role="listitem" key={question}><button type="button" className="faq-question" aria-expanded={open===index} onClick={()=>setOpen(open===index?null:index)}>{question}<i className="fas fa-chevron-down faq-icon" aria-hidden="true" /></button>{open===index&&<div className="faq-answer"><p>{answer}</p></div>}</div>)}</div></div></section>
  </>;
}
