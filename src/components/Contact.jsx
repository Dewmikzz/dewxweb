import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

// WhatsApp brand SVG icon
const WhatsappIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.151-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.513 1.079 2.914 1.23 3.115c.15.201 2.124 3.243 5.146 4.549.719.311 1.28.497 1.717.636.723.23 1.381.197 1.901.12.58-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.277-.201-.578-.352z"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.17L2 22l4.982-1.408A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.626 0-3.136-.49-4.398-1.332l-.315-.21-3.262.922.923-3.195-.23-.338A8.17 8.17 0 0 1 3.8 12c0-4.528 3.672-8.2 8.2-8.2 4.528 0 8.2 3.672 8.2 8.2 0 4.528-3.672 8.2-8.2 8.2z"/>
  </svg>
);

const SERVICE_OPTIONS = [
  "Full Stack Web App",
  "SaaS Platform",
  "AI Voice / AIRA",
  "DevOps & Cloud",
  "Other Project",
];

export const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full Stack Web App",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({ ...prev, service }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please write a short project description or message.");
      return;
    }

    setError("");
    setSubmitted(true);

    const lines = [
      "👋 *New Project Inquiry via dew.pshycolab.com*",
      "",
      `👤 *Name:* ${formData.name.trim()}`,
      formData.email.trim() ? `📧 *Contact:* ${formData.email.trim()}` : null,
      formData.service ? `💼 *Interest:* ${formData.service}` : null,
      "",
      "📝 *Project Details / Message:*",
      formData.message.trim(),
    ].filter(Boolean);

    const messageText = lines.join("\n");
    const whatsappUrl = `https://wa.me/94763107113?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in a new tab
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 250);

    // Auto-dismiss confirmation after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section contact"
      aria-label="Contact section"
    >
      <div className="container">
        <motion.div
          className="contact__inner"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Section label */}
          <span className="section-label">08 · Contact</span>

          {/* Heading — word-by-word clip reveal */}
          <div className="contact__headline">
            <div style={{ overflow: "hidden" }}>
              <motion.div
                className="contact__heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              >
                LET'S BUILD
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                className="contact__heading contact__heading--outline"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                SOMETHING
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                className="contact__heading"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              >
                USEFUL.
              </motion.div>
            </div>
          </div>

          <p className="contact__subhead">
            Have a project in mind or need an experienced engineer? Fill in the details below to start a direct WhatsApp conversation.
          </p>

          {/* ── Contact Form Card (Submits directly to WhatsApp) ── */}
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.75 }}
          >
            {/* Header info badge */}
            <div className="contact-form__header">
              <div className="contact-form__badge">
                <span className="contact-form__pulse-dot" aria-hidden="true" />
                <span>DIRECT WHATSAPP DISPATCH</span>
              </div>
              <a
                href="https://wa.me/94763107113"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-form__phone-link"
                title="Direct WhatsApp link"
              >
                <WhatsappIcon size={15} />
                <span>+94 76 310 7113</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Row 1: Name & Contact/Email */}
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name" className="contact-form__label">
                    Your Name <span className="contact-form__required">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Dewmika or Company Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-form__input"
                    data-cursor="hover"
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-email" className="contact-form__label">
                    Email / Phone (Optional)
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="text"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-form__input"
                    data-cursor="hover"
                  />
                </div>
              </div>

              {/* Service Selection Pills */}
              <div className="contact-form__field" style={{ marginTop: "1.25rem" }}>
                <label className="contact-form__label">Project Interest</label>
                <div className="contact-form__services" role="radiogroup" aria-label="Project interest options">
                  {SERVICE_OPTIONS.map((item) => {
                    const isSelected = formData.service === item;
                    return (
                      <button
                        type="button"
                        key={item}
                        role="radio"
                        aria-checked={isSelected}
                        className={`contact-form__service-btn ${isSelected ? "contact-form__service-btn--active" : ""}`}
                        onClick={() => handleServiceSelect(item)}
                        data-cursor="hover"
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Message Textarea */}
              <div className="contact-form__field" style={{ marginTop: "1.25rem" }}>
                <label htmlFor="contact-message" className="contact-form__label">
                  Project Brief or Message <span className="contact-form__required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, deliverables, or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-form__textarea"
                  data-cursor="hover"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="contact-form__error" role="alert">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Notification */}
              {submitted && (
                <div className="contact-form__success" role="status">
                  <CheckCircle2 size={18} />
                  <span>Details formatted! Launching WhatsApp chat now...</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="contact-form__action-row">
                <button
                  type="submit"
                  className="contact-form__submit-btn"
                  data-cursor="hover"
                  aria-label="Send inquiry on WhatsApp"
                >
                  <WhatsappIcon size={20} />
                  <span>Send Message via WhatsApp</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="contact-form__footer-note">
                <span>Direct link opens WhatsApp with your pre-filled inquiry ready to send.</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

