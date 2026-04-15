import { motion } from "framer-motion";
import { STORE } from "../data/storeData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ padding: "2rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)", background: "var(--charcoal)" }}>
      <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.1em", color: "var(--neon-amber)" }}>
          ST NEWS
        </motion.div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", color: "var(--silver)", textTransform: "uppercase" }}>
          &copy; {year} {STORE.name} &mdash; {STORE.address}
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { href: "#about", label: "Home" },
            { href: "#products", label: "Products" },
            { href: "#reviews", label: "Reviews" },
            { href: "#location", label: "Find Us" },
          ].map((link) => (
            <a key={link.href} href={link.href}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--silver)", textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--neon-amber)")} onMouseLeave={(e) => (e.target.style.color = "var(--silver)")}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
