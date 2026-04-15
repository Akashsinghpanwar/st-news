import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { STORE } from "../data/storeData";

const details = [
  { icon: MapPin, title: "Address", text: STORE.address, extra: "Heart of Aberdeen's West End" },
  { icon: Clock, title: "Opening Hours", text: STORE.hours, badge: true },
  { icon: Phone, title: "Telephone", text: "Call us anytime", extra: "Pop in or give us a ring" },
  { icon: Mail, title: "Get In Touch", text: "We'd love to hear from you", extra: "Feedback always welcome" },
];

export default function Location() {
  return (
    <section id="location" style={{ padding: "var(--section-pad) 2rem", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ marginBottom: "3rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--neon-amber)", marginBottom: "1rem" }}>
          Visit Us
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, color: "var(--cream)", letterSpacing: "0.02em" }}>
          Find Your Way<br />To Us
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--silver)", maxWidth: 500, marginTop: "1rem", fontWeight: 300 }}>
          Perfectly located on Belmont Street in the heart of Aberdeen. Always open, always ready.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="location-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
        {/* Map */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ width: "100%", aspectRatio: "4/3", background: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <iframe
            src={`https://www.google.com/maps?q=${STORE.coordinates.lat},${STORE.coordinates.lng}&z=16&output=embed`}
            width="100%" height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(1) contrast(0.8) brightness(0.6)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="ST NEWS Location"
          />
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {details.map((detail, i) => {
            const Icon = detail.icon;
            return (
              <motion.div key={detail.title} className="location-detail-row"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div className="location-icon-box" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-amber)", flexShrink: 0 }}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.05em", marginBottom: "0.15rem", color: "var(--cream)" }}>
                    {detail.title}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--silver)", lineHeight: 1.5 }}>
                    {detail.text}
                  </p>
                  {detail.extra && <p style={{ fontSize: "0.75rem", color: "var(--silver)", opacity: 0.6, marginTop: "0.1rem" }}>{detail.extra}</p>}
                  {detail.badge && (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", color: "var(--neon-green)", padding: "0.4rem 0.8rem", marginTop: "0.4rem" }}>
                      <span style={{ width: 5, height: 5, background: "var(--neon-green)", borderRadius: "50%", animation: "pulse-dot 2s ease-in-out infinite", display: "inline-block" }} />
                      Open Now
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
