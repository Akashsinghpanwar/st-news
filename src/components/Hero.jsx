import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { STORE } from "../data/storeData";

function CursorLight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 30 });
  const springY = useSpring(y, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const handleMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <motion.div className="hero-cursor-light" style={{ position: "fixed", left: springX, top: springY, width: 600, height: 600, marginLeft: -300, marginTop: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,182,39,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 9998, display: "none" }} />;
}

function FloatingProduct({ src, alt, x, y, delay = 0, rotation = 0, scale = 1 }) {
  return (
    <motion.div className="hero-floating-product"
      initial={{ opacity: 0, scale: 0, rotateY: -45 }}
      animate={{ opacity: [0, 1, 1, 0.9], scale: [0, scale, scale, scale * 0.95], rotateY: [0, 3, -3, 0], y: [0, -20, 0, -15, 0], x: [0, 5, -5, 0],
        filter: ["drop-shadow(0 0 0px rgba(255,182,39,0))", "drop-shadow(0 20px 40px rgba(255,182,39,0.3))", "drop-shadow(0 10px 30px rgba(255,182,39,0.2))", "drop-shadow(0 20px 40px rgba(255,182,39,0.3))"],
      }}
      transition={{ duration: 8, delay, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: `rotate(${rotation}deg)`, zIndex: 0, pointerEvents: "none", perspective: "1000px" }}
    >
      <img src={src} alt={alt} style={{ width: "auto", height: "clamp(180px, 25vw, 320px)", objectFit: "contain", filter: "brightness(1.1) contrast(1.05)" }} />
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const productY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const productY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const productY3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const title = "ST NEWS";

  return (
    <section ref={heroRef} id="about" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", padding: "2rem 1.25rem", overflow: "hidden" }}>
      <CursorLight />

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/store-front.png')", backgroundSize: "cover", backgroundPosition: "center 30%", opacity: 0.12, filter: "blur(2px)" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 25%, rgba(255,182,39,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(0,229,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,45,135,0.04) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.95) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,182,39,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,182,39,0.025) 1px, transparent 1px)", backgroundSize: "50px 50px", maskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)" }} />
      </div>

      {/* Floating products - desktop only via CSS class */}
      <motion.div className="hero-floating-product" style={{ position: "absolute", inset: 0, y: productY1 }}>
        <FloatingProduct src="/images/mountain-dew.png" alt="Mountain Dew" x={5} y={15} delay={0} rotation={-8} scale={0.9} />
      </motion.div>
      <motion.div className="hero-floating-product" style={{ position: "absolute", inset: 0, y: productY2 }}>
        <FloatingProduct src="/images/reeses-cups.png" alt="Reese's Cups" x={78} y={20} delay={1.5} rotation={5} scale={0.85} />
      </motion.div>
      <motion.div className="hero-floating-product" style={{ position: "absolute", inset: 0, y: productY3 }}>
        <FloatingProduct src="/images/dr-pepper.png" alt="Dr Pepper" x={82} y={55} delay={3} rotation={-3} scale={0.8} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ position: "relative", zIndex: 1, maxWidth: 900, width: "100%", y, opacity, scale }}>
        {/* Eyebrow */}
        <motion.div className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--neon-amber)", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="line" style={{ width: 30, height: 1, background: "var(--neon-amber)", display: "inline-block" }} />
          {STORE.address}
          <span className="line" style={{ width: 30, height: 1, background: "var(--neon-amber)", display: "inline-block" }} />
        </motion.div>

        {/* Title */}
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 18vw, 12rem)", lineHeight: 0.85, letterSpacing: "0.02em", color: "var(--cream)", marginBottom: "1.25rem", perspective: "1200px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.03em" }}>
          {title.split("").map((char, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 80, rotateX: -90, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", color: char === " " ? "transparent" : i < 2 ? "var(--neon-amber)" : "var(--cream)", textShadow: i < 2 ? "0 0 40px rgba(255,182,39,0.5)" : "none", transformStyle: "preserve-3d" }}>
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.35rem)", color: "var(--silver)", maxWidth: 480, margin: "0 auto 2rem", fontWeight: 300, lineHeight: 1.6, padding: "0 0.5rem" }}>
          {STORE.tagline}. Renowned for our incredible range of American sweets &amp; drinks, serving Aberdeen around the clock.
        </motion.p>

        {/* Stats */}
        <motion.div className="hero-stats"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
          style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
          {[
            { value: "4.8", unit: "/5", label: "Rating" },
            { value: "24", unit: "hr", label: "Open" },
            { value: "22", unit: "+", label: "Reviews" },
          ].map((stat, i) => (
            <motion.div key={stat.label} className="hero-stat-box"
              initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, cursor: "default" }}>
              <div className="value" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--cream)", lineHeight: 1 }}>
                {stat.value}<span className="unit" style={{ color: "var(--neon-amber)", fontSize: "1.2rem" }}>{stat.unit}</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--silver)", marginTop: "0.15rem" }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div className="hero-cta-wrap"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.5 }}
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a href="#products" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", background: "var(--neon-amber)", color: "var(--obsidian)", display: "inline-block", textDecoration: "none", borderRadius: 2, boxShadow: "0 4px 20px rgba(255,182,39,0.25)" }}>
            View Products
          </motion.a>
          <motion.a href="#location" whileHover={{ borderColor: "var(--neon-amber)", color: "var(--neon-amber)" }} whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", background: "transparent", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.08)", display: "inline-block", textDecoration: "none", borderRadius: 2 }}>
            Get Directions
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
        style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", zIndex: 1 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--silver)" }}>Scroll</span>
        <motion.div animate={{ height: [30, 15, 30], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, background: "linear-gradient(to bottom, var(--neon-amber), transparent)" }} />
      </motion.div>
    </section>
  );
}
