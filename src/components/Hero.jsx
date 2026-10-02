import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BackgroundRippleEffect } from "./BackgroundRippleEffect";

// Clean brand SVG icons
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.151-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.513 1.079 2.914 1.23 3.115c.15.201 2.124 3.243 5.146 4.549.719.311 1.28.497 1.717.636.723.23 1.381.197 1.901.12.58-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.277-.201-.578-.352z"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.17L2 22l4.982-1.408A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.626 0-3.136-.49-4.398-1.332l-.315-.21-3.262.922.923-3.195-.23-.338A8.17 8.17 0 0 1 3.8 12c0-4.528 3.672-8.2 8.2-8.2 4.528 0 8.2 3.672 8.2 8.2 0 4.528-3.672 8.2-8.2 8.2z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const HERO_SOCIALS = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/dewmika2002/",
    icon: FacebookIcon,
    ariaLabel: "Visit Dewmika on Facebook",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/dewxyz_2.1/",
    icon: InstagramIcon,
    ariaLabel: "Follow Dewmika on Instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dewmika",
    icon: LinkedinIcon,
    ariaLabel: "Connect with Dewmika on LinkedIn",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/94763107113",
    icon: WhatsappIcon,
    ariaLabel: "Message Dewmika on WhatsApp",
  },
  {
    name: "GitHub",
    url: "https://github.com/Dewmikzz",
    icon: GithubIcon,
    ariaLabel: "Explore Dewmika's GitHub repositories",
  },
  {
    name: "Email",
    url: "mailto:dewmika.my@gmail.com",
    icon: EmailIcon,
    ariaLabel: "Send an email to Dewmika",
  },
];

const BG_TYPING_PHRASES = [
  { outline: "DEWMIKA", solid: "ANUSARA" },
  { outline: "DEWX", solid: "CODE" },
  { outline: "SOFTWARE", solid: "ENGINEER" },
  { outline: "DEVOPS", solid: "ENGINEER" },
  { outline: "FULL STACK", solid: "DEVELOPER" },
  { outline: "UI / UX", solid: "DESIGNER" },
  { outline: "WEB", solid: "DEVELOPER" },
];

export const Hero = () => {
  const containerRef = useRef(null);

  // Typewriter effect state for background giant typography
  const [phraseIdx, setPhraseIdx] = useState(0);
  const currentPhrase = BG_TYPING_PHRASES[phraseIdx];
  const fullText = `${currentPhrase.outline} ${currentPhrase.solid}`;
  const [charCount, setCharCount] = useState(fullText.length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (charCount < fullText.length) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 85);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charCount > 0) {
        timer = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % BG_TYPING_PHRASES.length);
        }, 350);
      }
    }
    return () => clearTimeout(timer);
  }, [charCount, isDeleting, fullText.length]);

  const outlineLen = currentPhrase.outline.length;
  const outlineText = fullText.slice(0, Math.min(charCount, outlineLen));
  const solidText = charCount > outlineLen + 1 ? fullText.slice(outlineLen + 1, charCount) : "";
  const cursorAtOutline = charCount <= outlineLen;

  const handleScrollTo = (selector) => {
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.scrollTo(selector, { duration: 1.2, offset: -40 });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="ref-hero" ref={containerRef} aria-label="Hero Introduction">
      {/* ── 0. Interactive Framer Background Ripple Grid ── */}
      <BackgroundRippleEffect
        cellSize={56}
        borderColor="rgba(0, 0, 0, 0.065)"
        fillColor="rgba(248, 248, 248, 0.7)"
        shadowColor="rgba(0, 0, 0, 0.04)"
        opacity={50}
        hoverOpacity={90}
        animationDuration={220}
        animationDelay={40}
        showShadow={true}
        interactive={true}
        shapeType="square"
      />

      {/* ── 1. Top Navbar / Status Bar (Matches Reference Screenshot) ── */}
      <motion.div
        className="ref-hero__nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      >
        {/* Availability Pill */}
        <div className="ref-hero__status-pill">
          <span className="ref-hero__status-dot" aria-hidden="true" />
          <span className="ref-hero__status-text">
            <span className="ref-hero__status-long">Available for New Project</span>
            <span className="ref-hero__status-short">Available</span>
          </span>
        </div>

        {/* Center Nav Links with Counts */}
        <nav className="ref-hero__links" aria-label="Hero navigation">
          <a
            href="#work"
            className="ref-hero__link"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#work");
            }}
          >
            Work <span className="ref-hero__link-count">[05]</span>
          </a>
          <a
            href="#services"
            className="ref-hero__link"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#services");
            }}
          >
            Service <span className="ref-hero__link-count">[05]</span>
          </a>
          <a
            href="#experience"
            className="ref-hero__link"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#experience");
            }}
          >
            Experience <span className="ref-hero__link-count">[3y+]</span>
          </a>
          <a
            href="#contact"
            className="ref-hero__link"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#contact");
            }}
          >
            Contact
          </a>
        </nav>

        {/* Right CTA Button — direct WhatsApp with sample message */}
        <a
          href="https://wa.me/94763107113?text=Hi%20Dewmika%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20talk%20with%20you%20about%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="ref-hero__talk-btn"
          aria-label="Let's Talk on WhatsApp"
        >
          <span>Let's Talk</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </motion.div>

      {/* ── 2. Giant Typography Display: Typing Script (Outline + Solid) ── */}
      <motion.div
        className="ref-hero__giant-name"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        aria-label={fullText}
      >
        <span className="ref-hero__name-outline">
          {outlineText}
          {cursorAtOutline && <span className="ref-hero__cursor">|</span>}
        </span>
        {(solidText || !cursorAtOutline) && (
          <span className="ref-hero__name-solid">
            {solidText}
            {!cursorAtOutline && <span className="ref-hero__cursor">|</span>}
          </span>
        )}
      </motion.div>

      {/* ── 3. Central Portrait (Natural Color, Flush to Bottom) ── */}
      <div
        className="ref-hero__portrait-wrap"
        role="img"
        aria-label="Dewmika Anusara (DewX) portrait"
      >
        <motion.img
          src="/images/dew_portrait.png"
          alt="Dewmika Anusara"
          className="ref-hero__portrait-img"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
      </div>

      {/* ── 4. Bottom Row: Role & Bio (Left) + Social Pills (Right) ── */}
      <div className="ref-hero__bottom">
        {/* Left Info Column */}
        <motion.div
          className="ref-hero__bio-col"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
        >
          <h1 className="ref-hero__role-title">Full Stack Developer</h1>
          <p className="ref-hero__role-desc">
            Designing & engineering digital products that are clear, scalable, and conversion focused.
          </p>

          <a
            href="https://wa.me/94763107113?text=Hi%20Dewmika%2C%20I%27m%20interested%20in%20collaborating%20with%20you%20on%20an%20exciting%20project.%20Let%27s%20discuss%20details%21"
            target="_blank"
            rel="noopener noreferrer"
            className="ref-hero__collab-btn"
            aria-label="Let's collaborate on WhatsApp"
          >
            <span>Let's collaborate</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </motion.div>

        {/* Right Social Pills Column */}
        <motion.div
          className="ref-hero__socials-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.45 }}
          role="list"
          aria-label="Social profiles"
        >
          {HERO_SOCIALS.map((social) => {
            const Icon = social.icon;
            const isExternal = !social.url.startsWith("mailto:");
            return (
              <a
                key={social.name}
                href={social.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="ref-hero__social-pill"
                role="listitem"
                aria-label={social.ariaLabel}
                data-cursor="hover"
              >
                <Icon />
                <span>{social.name}</span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
