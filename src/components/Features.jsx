import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES } from "../data/storeData";
import { Clock, MapPin, Star, ShoppingBag } from "lucide-react";

const iconMap = { Clock, MapPin, Star, ShoppingBag };

const CARD_COLORS = ["#FFB627", "#00E5FF", "#39FF14", "#FF2D87"];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = iconMap[feature.icon];
  const color = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ background: "var(--slate)", y: -4 }}
      style={{
        background: "var(--charcoal)", padding: "2rem 1.75rem",
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "background 0.3s, transform 0.3s",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        initial={{ height: 0 }}
        whileHover={{ height: "100%" }}
        transition={{ duration: 0.45 }}
        style={{ position: "absolute", top: 0, left: 0, width: 3, background: color }}
      />

      {/* Glow orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: -30, right: -30, width: 120, height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: "blur(15px)", pointerEvents: "none",
        }}
      />

      <div className="icon-wrap" style={{
        width: 40, height: 40, display: "flex", alignItems: "center",
        justifyContent: "center", marginBottom: "1.25rem", color,
      }}>
        {Icon && (
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={24} strokeWidth={1.5} />
          </motion.div>
        )}
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "1.35rem",
        letterSpacing: "0.05em", marginBottom: "0.5rem", color: "var(--cream)",
      }}>
        {feature.title}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "var(--silver)", lineHeight: 1.6 }}>
        {feature.description}
      </p>

      {/* Corner accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: "absolute", bottom: 0, right: 0,
          width: 20, height: 20,
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />
    </motion.div>
  );
}

export default function Features() {
  return (
    <section style={{
      padding: "var(--section-pad) 0",
      background: "var(--charcoal)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
    }}>
      <div
        className="features-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          maxWidth: 1200, margin: "0 auto",
        }}
      >
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
