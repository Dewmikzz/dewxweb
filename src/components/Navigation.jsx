import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Work",       href: "#work" },
  { label: "Services",   href: "#services" },
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack",      href: "#stack" },
  { label: "Contact",    href: "#contact" },
];

// Sections that have dark backgrounds (nav should use light text)
const DARK_SECTIONS = ["about", "experience", "contact"];

export const Navigation = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [isDark, setIsDark]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Determine if current section has dark background
      const checkSection = () => {
        for (const id of DARK_SECTIONS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setIsDark(true);
            return;
          }
        }
        setIsDark(false);
      };
      checkSection();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const navClass = [
    "nav",
    scrolled ? "nav--scrolled" : "nav--at-top",
    isDark ? "nav--dark" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            className={`nav nav--scrolled ${isDark ? "nav--dark" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="navigation"
            aria-label="Main navigation"
          >
            <a
              href="#"
              className="nav__logo"
              aria-label="DewX — Home"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              DEWX
            </a>

            <div className="nav__links" role="list">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav__link"
                  role="listitem"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="nav__availability" aria-label="Available for opportunities">
              <span className="nav__dot" aria-hidden="true" />
              <span>Available</span>
            </div>

            {/* Mobile hamburger */}
            <button
              className="nav__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{ color: isDark ? "var(--bg-ivory)" : "var(--text)" }}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.3 }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.3 }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.3 }} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="mobile-menu__nav">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="mobile-menu__link"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 60, opacity: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mobile-menu__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="nav__dot" aria-hidden="true" />
              <span style={{ fontSize: "0.82rem", color: "rgba(250,249,246,0.4)" }}>
                Available for opportunities
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
