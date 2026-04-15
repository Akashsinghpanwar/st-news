import { motion } from "framer-motion";
import { FEATURES } from "../data/storeData";
import { Clock, MapPin, Star, ShoppingBag } from "lucide-react";

const iconMap = { Clock, MapPin, Star, ShoppingBag };

export default function Features() {
  return (
    <section style={{
      padding: "0",
      background: "var(--charcoal)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div
        className="features-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          maxWidth: 1200, margin: "0 auto",
          gap: "0",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ background: "rgba(255,255,255,0.035)" }}
              style={{
                background: "var(--charcoal)",
                padding: "2rem 1.75rem",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                borderRight: i < FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "background 0.3s",
              }}
            >
              {/* Top accent — grows on hover */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, var(--neon-amber), transparent)",
                  transformOrigin: "left",
                }}
              />

              <div className="icon-wrap" style={{
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem", color: "var(--neon-amber)",
              }}>
                {Icon && <Icon size={22} strokeWidth={1.5} />}
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "1.3rem",
                letterSpacing: "0.05em", marginBottom: "0.45rem",
                color: "var(--cream)",
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: "0.83rem", color: "var(--silver)", lineHeight: 1.65,
              }}>
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .feature-card { border-right: none !important; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
