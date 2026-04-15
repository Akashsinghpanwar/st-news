import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { PRODUCT_CATEGORIES, FEATURED_PRODUCTS } from "../data/storeData";

/* ─── Real product images (transparent PNGs) ─────────────── */
const PRODUCT_IMAGES = {
  1: "/images/reeses-cups.png",
  2: "/images/mountain-dew.png",
  3: "https://www.kindpng.com/picc/m/451-4518219_warheads-candy-hd-png-download.png",
  4: "https://www.kindpng.com/picc/m/568-5688853_jolly-rancher-hard-candy-png-download-transparent-jolly.png",
  5: "https://www.kindpng.com/picc/m/731-7319630_twizzler-candy-clipart-png-download-twizzlers-licorice-transparent.png",
  6: "/images/dr-pepper.png",
};

/* ─── Full-width photo banner ────────────────────────────── */
function PhotoBanner({ src, alt, label, heading, body, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9 }}
      style={{
        position: "relative", width: "100%",
        height: "clamp(220px, 35vw, 480px)",
        overflow: "hidden", borderRadius: 4, marginBottom: "4rem",
      }}
    >
      <motion.img
        src={src} alt={alt}
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: align === "left"
          ? "linear-gradient(90deg, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.45) 50%, rgba(10,10,15,0.15) 100%)"
          : "linear-gradient(180deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.88) 100%)",
      }} />
      <div style={{
        position: "absolute",
        ...(align === "left"
          ? { top: "50%", left: "clamp(1.5rem, 5vw, 4rem)", transform: "translateY(-50%)" }
          : { bottom: "clamp(1.5rem, 4vw, 3rem)", left: "clamp(1.5rem, 5vw, 4rem)" }),
        zIndex: 1, maxWidth: 420,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "var(--neon-amber)", marginBottom: "0.6rem",
          }}>{label}</div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
            lineHeight: 0.95, color: "var(--cream)",
            letterSpacing: "0.02em", marginBottom: "0.7rem",
          }}>{heading}</h3>
          <p style={{
            fontSize: "0.9rem", color: "rgba(232,228,221,0.75)",
            lineHeight: 1.65, fontWeight: 300,
          }}>{body}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Featured product card with real image ─────────────── */
function FeaturedCard({ product, index }) {
  const img = PRODUCT_IMAGES[product.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, borderColor: "rgba(255,182,39,0.2)" }}
      style={{
        background: "var(--charcoal)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 4, overflow: "hidden",
        flex: "1 1 200px", maxWidth: 260,
        cursor: "default",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Photo area */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        padding: "1.75rem 1.25rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        height: 170,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          style={{
            maxHeight: 130, maxWidth: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.55))",
            display: "block",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "1.1rem 1.25rem 1.4rem" }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.56rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--silver)", marginBottom: "0.3rem",
        }}>{product.brand}</div>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "1.35rem",
          letterSpacing: "0.03em", color: "var(--cream)", marginBottom: "0.25rem",
        }}>{product.name}</div>
        <div style={{
          fontSize: "0.8rem", color: "var(--silver)",
          lineHeight: 1.5, marginBottom: "0.75rem",
        }}>{product.tagline}</div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          letterSpacing: "0.08em", color: "var(--neon-amber)", fontWeight: 700,
        }}>{product.price}</div>
      </div>
    </motion.div>
  );
}

/* ─── Category card with tilt ────────────────────────────── */
function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 30 });
  const springY = useSpring(my, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mx.set(0); my.set(0); }}
      style={{
        rotateX, rotateY, transformStyle: "preserve-3d",
        background: "var(--charcoal)",
        border: `1px solid ${hovered ? cat.color + "30" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 4, padding: "1.75rem 1.75rem 2rem",
        position: "relative", overflow: "hidden", cursor: "default",
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${cat.color}18`
          : "0 4px 20px rgba(0,0,0,0.15)",
        transition: "box-shadow 0.4s, border-color 0.4s",
      }}
    >
      {/* Top accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${cat.color}, transparent)`,
          transformOrigin: "left",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.5rem",
          letterSpacing: "0.04em", color: "var(--cream)", lineHeight: 1.1,
        }}>{cat.name}</h3>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.56rem",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: cat.color, opacity: 0.85,
          padding: "0.22rem 0.5rem",
          border: `1px solid ${cat.color}30`,
          borderRadius: 2, flexShrink: 0, marginLeft: "0.75rem",
        }}>
          {cat.items.length}+
        </div>
      </div>

      <p style={{ fontSize: "0.82rem", color: "var(--silver)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
        {cat.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem" }}>
        {cat.items.slice(0, 6).map((item) => (
          <span key={item} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.59rem", letterSpacing: "0.04em",
            padding: "0.2rem 0.55rem",
            background: hovered ? `${cat.color}0f` : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? cat.color + "28" : "rgba(255,255,255,0.06)"}`,
            color: hovered ? cat.color : "var(--bone)",
            borderRadius: 2,
            transition: "background 0.3s, border-color 0.3s, color 0.3s",
          }}>{item}</span>
        ))}
        {cat.items.length > 6 && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.59rem",
            padding: "0.2rem 0.55rem", color: "var(--silver)", opacity: 0.5,
          }}>+{cat.items.length - 6} more</span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function Products() {
  return (
    <section
      id="products"
      style={{
        padding: "var(--section-pad) clamp(1.25rem, 4vw, 3rem)",
        maxWidth: 1360, margin: "0 auto",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: "3rem" }}
      >
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--neon-amber)", marginBottom: "0.85rem",
        }}>
          Featured Imports
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          lineHeight: 0.93, color: "var(--cream)", letterSpacing: "0.02em",
        }}>
          American<br />Favourites
        </h2>
        <p style={{
          fontSize: "1rem", color: "var(--silver)",
          maxWidth: 480, marginTop: "1rem", fontWeight: 300, lineHeight: 1.7,
        }}>
          Directly imported from the USA — the biggest range of American candy and drinks in Aberdeen.
        </p>
      </motion.div>

      {/* ── Featured products — real photos, 6-up grid ── */}
      <div
        className="featured-grid"
        style={{
          display: "flex", flexWrap: "wrap",
          gap: "1.25rem", justifyContent: "flex-start",
          marginBottom: "5rem",
        }}
      >
        {FEATURED_PRODUCTS.map((p, i) => (
          <FeaturedCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* Candy wave banner */}
      <PhotoBanner
        src="/images/candy-wave.png"
        alt="American Candy Selection"
        label="Directly Imported"
        heading={"AMERICAN\nCANDY WAVE"}
        body="The biggest range of imported American sweets, drinks and snacks in Aberdeen. From Reese's to Warheads, we stock it all."
        align="left"
      />

      {/* Section header 2 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: "2rem" }}
      >
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--neon-amber)", marginBottom: "0.85rem",
        }}>
          What We Stock
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          lineHeight: 0.93, color: "var(--cream)", letterSpacing: "0.02em",
        }}>
          Everything You<br />Could Need
        </h2>
      </motion.div>

      {/* Category grid */}
      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem", marginBottom: "4rem",
        }}
      >
        {PRODUCT_CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>

      {/* Snack spread banner */}
      <PhotoBanner
        src="/images/snack-spread.png"
        alt="Snack Selection"
        label="Something for Everyone"
        heading={"SOMETHING\nFOR EVERYONE"}
        body="Crisps, chocolate, protein bars and more — all under one roof, any time of day or night."
        align="bottom"
      />

      <style>{`
        @media (max-width: 900px) {
          .featured-grid { justify-content: center !important; }
          .featured-grid > * { max-width: 240px !important; }
        }
        @media (max-width: 600px) {
          .featured-grid { gap: 0.85rem !important; }
          .featured-grid > * { flex: 1 1 140px !important; max-width: 180px !important; }
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
