import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import { PRODUCT_CATEGORIES, FEATURED_PRODUCTS } from "../data/storeData";

// Cinematic product showcase with slow-motion reveal
function CinematicShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    { ...FEATURED_PRODUCTS[0], image: "/images/reeses-cups.png" },
    { ...FEATURED_PRODUCTS[1], image: "/images/mountain-dew.png" },
    { ...FEATURED_PRODUCTS[5], image: "/images/dr-pepper.png" },
  ];

  return (
    <div ref={ref} style={{ marginBottom: "5rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "var(--neon-amber)", marginBottom: "2.5rem",
          textAlign: "center", opacity: 0.8,
        }}
      >
        Featured Imports
      </motion.div>

      <div className="cinematic-showcase-wrap" style={{ display: "flex", gap: "2.5rem", justifyContent: "center", flexWrap: "wrap", alignItems: "flex-end" }}>
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 80, scale: 0.7, rotateY: -30 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.2,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -10,
              scale: 1.05,
              boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${p.color}33`,
            }}
            style={{
              width: "clamp(180px, 28vw, 260px)",
              className: "cinematic-product-card",
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6,
              padding: "1.5rem 1.5rem 1.8rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}
          >
            {/* Animated glow ring */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0px ${p.color}00`,
                  `0 0 30px ${p.color}22`,
                  `0 0 0px ${p.color}00`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: -1,
                borderRadius: 6,
                border: `1px solid ${p.color}00`,
                pointerEvents: "none",
              }}
            />

            {/* Product image with 3D float */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateY: [0, 5, -5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                marginBottom: "1rem",
                perspective: "800px",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "clamp(140px, 18vw, 200px)",
                  objectFit: "contain",
                  filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))",
                }}
              />
            </motion.div>

            {/* Product info */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: p.color, marginBottom: "0.4rem", opacity: 0.8, textTransform: "uppercase" }}>
              {p.brand}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.03em", color: "var(--cream)", marginBottom: "0.2rem" }}>
              {p.name}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--silver)", fontStyle: "italic", marginBottom: "0.4rem" }}>
              {p.tagline}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--neon-amber)", letterSpacing: "0.1em" }}>
              {p.price}
            </div>

            {/* Bottom light stripe */}
            <motion.div
              animate={{ opacity: [0, 1, 0], x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 3D Tilt product category card
function TiltCard({ cat, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? cat.color + "44" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 4,
        padding: "2rem",
        className: "product-tilt-card",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${cat.color}15`
          : "0 10px 40px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.5s, border-color 0.5s",
      }}
    >
      {/* Mouse-following glow */}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: 4, pointerEvents: "none", zIndex: 0,
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, ${cat.color}18 0%, transparent 60%)`
          ),
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Ambient orb */}
      <motion.div
        animate={hovered ? { x: [0, 15, -10, 0], y: [0, -10, 8, 0], scale: [1, 1.1, 0.95, 1] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: -20, right: -20, width: 150, height: 150, borderRadius: "50%",
          background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`,
          filter: "blur(20px)", pointerEvents: "none", zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Floating emoji */}
        <motion.div
          animate={hovered ? { y: [0, -12, 0], rotate: [0, 5, -3, 0], scale: [1, 1.15, 1] } : {}}
          transition={hovered ? { duration: 3, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" } : {}}
          style={{ fontSize: "2.5rem", marginBottom: "1.5rem", display: "inline-block",
            filter: hovered ? "drop-shadow(0 0 20px rgba(255,182,39,0.4))" : "none" }}
        >
          {cat.emoji}
        </motion.div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.05em", marginBottom: "0.5rem", color: "var(--cream)",
          textShadow: hovered ? `0 0 30px ${cat.color}55` : "none" }}>
          {cat.name}
        </h3>

        <p style={{ fontSize: "0.85rem", color: "var(--silver)", marginBottom: "1.5rem" }}>
          {cat.description}
        </p>

        {/* Product tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {cat.items.map((item, i) => (
            <motion.span
              key={item}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.05em",
                padding: "0.3rem 0.7rem",
                background: hovered ? `${cat.color}12` : "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered ? cat.color + "33" : "rgba(255,255,255,0.06)"}`,
                color: hovered ? cat.color : "var(--bone)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 30, height: 30, borderTop: `2px solid ${cat.color}`, borderLeft: `2px solid ${cat.color}`, opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 30, height: 30, borderBottom: `2px solid ${cat.color}`, borderRight: `2px solid ${cat.color}`, opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s" }} />

      {/* Bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
          transformOrigin: "left", opacity: hovered ? 1 : 0.5 }}
      />
    </motion.div>
  );
}

// Cinematic banner with candy wave image
function CinematicBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(200px, 30vw, 400px)",
        className: "candy-banner",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: "4rem",
        marginTop: "2rem",
      }}
    >
      <motion.img
        src="/images/candy-wave.png"
        alt="American Candy Selection"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.4) 40%, rgba(10,10,15,0.7) 100%)",
      }} />

      {/* Text overlay */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "3rem", zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "var(--neon-amber)", marginBottom: "0.75rem",
          }}>
            Directly Imported
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.95, color: "var(--cream)", letterSpacing: "0.02em", marginBottom: "0.75rem",
          }}>
            AMERICAN<br/>CANDY WAVE
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--silver)", maxWidth: 350, lineHeight: 1.6, fontWeight: 300 }}>
            The biggest range of imported American sweets, drinks and snacks in Aberdeen.
            From Reese&apos;s to Warheads, we stock it all.
          </p>
        </motion.div>
      </div>

      {/* Light sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,182,39,0.05) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

// Snack spread banner
function SnackSpreadBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(180px, 25vw, 300px)",
        className: "snack-banner",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: "3rem",
      }}
    >
      <motion.img
        src="/images/snack-spread.png"
        alt="Snack Selection"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.85) 100%)",
      }} />
      <div style={{ position: "absolute", bottom: "2rem", left: "2rem", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}>
          <h3 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "var(--cream)", letterSpacing: "0.03em",
          }}>
            SOMETHING FOR EVERYONE
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--silver)", marginTop: "0.25rem" }}>
            Crisps, chocolate, protein bars &amp; more — all under one roof
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section id="products" style={{ padding: "var(--section-pad) 2rem", position: "relative", maxWidth: 1400, margin: "0 auto" }}>
      {/* Decorative grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,182,39,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,182,39,0.015) 1px, transparent 1px)`,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ marginBottom: "3rem", position: "relative", zIndex: 1 }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--neon-amber)", marginBottom: "1rem" }}>
          What We Stock
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, color: "var(--cream)", letterSpacing: "0.02em" }}>
          Everything You<br/>Could Need
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--silver)", maxWidth: 500, marginTop: "1rem", fontWeight: 300 }}>
          From imported American favourites to everyday essentials — all under one roof, around the clock.
        </p>
      </motion.div>

      {/* Cinematic featured products with real images */}
      <CinematicShowcase />

      {/* Candy wave banner */}
      <CinematicBanner />

      {/* Products grid */}
      <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", position: "relative", zIndex: 1 }}>
        {PRODUCT_CATEGORIES.map((cat, i) => (
          <TiltCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>

      {/* Snack spread banner */}
      <SnackSpreadBanner />

      <style>{`
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
