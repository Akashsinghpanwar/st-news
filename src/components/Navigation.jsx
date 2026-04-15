import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE } from "../data/storeData";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: "#about", label: "About" },
    { href: "#products", label: "Products" },
    { href: "#reviews", label: "Reviews" },
    { href: "#location", label: "Find Us" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? "0.6rem 1.25rem" : "1rem 1.25rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "all 0.4s",
          background: scrolled || mobileOpen ? "rgba(10,10,15,0.95)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
          borderBottom: scrolled || mobileOpen ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <a href="#" style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.12em", color: "var(--neon-amber)", display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}>
          ST NEWS
          <span style={{ width: 7, height: 7, background: "var(--neon-green)", borderRadius: "50%", animation: "pulse-dot 2s ease-in-out infinite", boxShadow: "0 0 10px var(--neon-green)", display: "inline-block" }} />
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2rem", alignItems: "center", listStyle: "none" }}
          className="nav-desktop-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--silver)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--neon-amber)")} onMouseLeave={(e) => (e.target.style.color = "var(--silver)")}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", background: "var(--neon-green)", color: "var(--obsidian)", padding: "0.2rem 0.6rem", borderRadius: 2, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", animation: "glow-badge 3s ease-in-out infinite", display: "inline-block" }}>
              OPEN 24/7
            </span>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", flexDirection: "column", gap: 5, padding: "0.5rem", background: "none", border: "none", cursor: "pointer", zIndex: 200 }}
          aria-label="Menu"
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{ width: 22, height: 2, background: "var(--cream)", display: "block", transition: "all 0.3s" }} />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ width: 22, height: 2, background: "var(--cream)", display: "block", transition: "all 0.3s" }} />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{ width: 22, height: 2, background: "var(--cream)", display: "block", transition: "all 0.3s" }} />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 99,
              background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2rem",
            }}
          >
            {links.map((link, i) => (
              <motion.a key={link.href} href={link.href}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", letterSpacing: "0.08em", color: "var(--cream)", textDecoration: "none" }}>
                {link.label}
              </motion.a>
            ))}
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", background: "var(--neon-green)", color: "var(--obsidian)", padding: "0.4rem 1rem", borderRadius: 2, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              OPEN 24/7
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
