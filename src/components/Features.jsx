import { motion } from "framer-motion";
import { FEATURES } from "../data/storeData";
import { Clock, MapPin, Star, ShoppingBag } from "lucide-react";

const iconMap = { Clock, MapPin, Star, ShoppingBag };

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Features() {
  return (
    <section style={{ padding: "var(--section-pad) 0", background: "var(--charcoal)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", maxWidth: 1200, margin: "0 auto" }}>
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div key={feature.title} className="feature-card"
              custom={i} variants={cardVariants} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              whileHover={{ background: "var(--slate)" }}
              style={{ background: "var(--charcoal)", padding: "2rem 1.75rem", position: "relative", overflow: "hidden", cursor: "default" }}>
              <motion.div initial={{ height: 0 }} whileHover={{ height: "100%" }}
                transition={{ duration: 0.5 }} style={{ position: "absolute", top: 0, left: 0, width: 3, background: "var(--neon-amber)" }} />
              <div className="icon-wrap" style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", color: "var(--neon-amber)" }}>
                {Icon && <Icon size={24} strokeWidth={1.5} />}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "0.05em", marginBottom: "0.5rem", color: "var(--cream)" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--silver)", lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
