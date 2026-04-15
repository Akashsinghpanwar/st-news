import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STORE } from "../data/storeData";

const PRODUCTS = [
  { src: "/images/reeses-cups.png",   alt: "Reese's Cups",  delay: 0.2  },
  { src: "/images/mountain-dew.png",  alt: "Mountain Dew",  delay: 0.35 },
  { src: "/images/dr-pepper.png",     alt: "Dr Pepper",     delay: 0.5  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const bgY     = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="about"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 clamp(1.25rem, 5vw, 5rem)",
      }}
    >
      {/* ── Background photo ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, y: bgY,
          backgroundImage: "url('/images/store-front.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          willChange: "transform",
        }}
      />
      {/* Gradient veil */}
      <div style={{
        position: "absolute", inset: 0,
        background:
          "linear-gradient(105deg, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.88) 45%, rgba(10,10,15,0.45) 75%, rgba(10,10,15,0.25) 100%)",
      }} />
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(to top, var(--obsidian) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Layout ── */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1280, width: "100%", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
        className="hero-grid"
      >
        {/* ── Left: text ── */}
        <motion.div style={{ y: textY, opacity }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              marginBottom: "1.75rem",
            }}
          >
            <span style={{
              width: 24, height: 1,
              background: "var(--neon-amber)", display: "inline-block",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--neon-amber)",
            }}>
              {STORE.address}
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(4.5rem, 12vw, 9rem)",
                lineHeight: 0.88,
                letterSpacing: "0.02em",
                color: "var(--cream)",
              }}
            >
              <span style={{ color: "var(--neon-amber)" }}>ST</span>{" "}
              NEWS
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              color: "var(--silver)",
              maxWidth: 440,
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: "2.5rem",
            }}
          >
            Aberdeen's favourite convenience store — open&nbsp;24&nbsp;hours,
            365&nbsp;days&nbsp;a&nbsp;year. Specialists in American imports
            and everyday essentials.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{
              display: "flex", gap: "0", marginBottom: "2.75rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { value: "4.8", label: "Google Rating" },
              { value: "24/7", label: "Always Open" },
              { value: "22+", label: "Reviews" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                style={{
                  flex: 1,
                  padding: "1rem 0",
                  paddingLeft: i > 0 ? "1.5rem" : 0,
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  paddingRight: "1.5rem",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: "var(--cream)", lineHeight: 1,
                  marginBottom: "0.2rem",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--silver)",
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            className="hero-cta-wrap"
          >
            <motion.a
              href="#products"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.9rem 2.2rem",
                background: "var(--neon-amber)", color: "var(--obsidian)",
                textDecoration: "none", borderRadius: 2,
                boxShadow: "0 4px 24px rgba(255,182,39,0.22)",
                display: "inline-block",
              }}
            >
              See Products
            </motion.a>
            <motion.a
              href="#location"
              whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.3)", color: "var(--cream)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.9rem 2.2rem",
                background: "transparent", color: "var(--silver)",
                border: "1px solid rgba(255,255,255,0.14)",
                textDecoration: "none", borderRadius: 2,
                display: "inline-block",
                transition: "border-color 0.25s, color 0.25s",
              }}
            >
              Get Directions
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: product photos ── */}
        <div
          className="hero-product-stack"
          style={{
            position: "relative",
            height: "clamp(360px, 55vh, 580px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: p.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, zIndex: 10 }}
              style={{
                position: "absolute",
                left: `${[10, 32, 54][i]}%`,
                top: `${[5, 20, 8][i]}%`,
                zIndex: 3 - i,
                cursor: "default",
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.65))",
              }}
            >
              <img
                src={p.src}
                alt={p.alt}
                style={{
                  height: `clamp(${[220, 200, 180][i]}px, ${[32, 29, 26][i]}vw, ${[300, 270, 240][i]}px)`,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </motion.div>
          ))}

          {/* Soft ambient glow behind photos */}
          <div style={{
            position: "absolute", inset: 0,
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(255,182,39,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.5rem", zIndex: 3,
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.5rem",
          letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--silver)",
          opacity: 0.6,
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1, height: 28,
            background: "linear-gradient(to bottom, var(--neon-amber), transparent)",
            transformOrigin: "top",
          }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding-top: 7rem !important;
          }
          .hero-product-stack {
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
