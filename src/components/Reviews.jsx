import { motion } from "framer-motion";
import { REVIEWS, RATING_BREAKDOWN, STORE } from "../data/storeData";

function StarIcon({ filled = true, size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "var(--star-gold)" : "none"}
      stroke="var(--star-gold)"
      strokeWidth={2}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Reviews() {
  const totalReviews = Object.values(RATING_BREAKDOWN).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <section
      id="reviews"
      style={{
        padding: "var(--section-pad) 2rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: "4rem" }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--neon-amber)",
            marginBottom: "1rem",
          }}
        >
          What People Say
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 0.95,
            color: "var(--cream)",
            letterSpacing: "0.02em",
          }}
        >
          Community
          <br />
          Approved
        </h2>
      </motion.div>

      {/* Rating overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          marginBottom: "4rem",
          flexWrap: "wrap",
        }}
        className="reviews-overview"
      >
        {/* Big score */}
        <div style={{ textAlign: "center" }} className="reviews-score">
          <div className="big-number"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6rem",
              lineHeight: 1,
              color: "var(--neon-amber)",
              textShadow: "0 0 40px rgba(255, 182, 39, 0.2)",
            }}
          >
            {STORE.rating}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--silver)",
              marginTop: "0.25rem",
            }}
          >
            OUT OF 5.0
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              marginTop: "0.75rem",
              justifyContent: "center",
            }}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <StarIcon key={s} filled={s <= Math.round(STORE.rating)} size={20} />
            ))}
          </div>
        </div>

        {/* Breakdown bars */}
        <div style={{ flex: 1, minWidth: 250 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--silver)",
                  width: 15,
                  textAlign: "right",
                }}
              >
                {star}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 4,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(RATING_BREAKDOWN[star] / totalReviews) * 100}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    height: "100%",
                    background: "var(--neon-amber)",
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--silver)",
                  width: 20,
                }}
              >
                {RATING_BREAKDOWN[star]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Review cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
        className="reviews-grid"
      >
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{
              y: -2,
              borderColor: "rgba(255, 182, 39, 0.15)",
            }}
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "1.5rem",
              className: "review-card",
              position: "relative",
              transition: "border-color 0.4s, transform 0.4s",
            }}
          >
            {/* Decorative quote */}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4rem",
                color: "var(--neon-amber)",
                opacity: 0.15,
                position: "absolute",
                top: "0.5rem",
                right: "1.5rem",
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              &ldquo;
            </span>

            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  background: "linear-gradient(135deg, var(--neon-amber), var(--neon-red))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--obsidian)",
                  borderRadius: 2,
                }}
              >
                {review.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  {review.author}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--silver)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {review.date}
                </div>
              </div>
            </div>

            {/* Stars */}
            <div
              style={{
                display: "flex",
                gap: 2,
                marginBottom: "0.75rem",
              }}
            >
              {Array.from({ length: 5 }).map((_, s) => (
                <StarIcon key={s} filled={s < review.rating} size={14} />
              ))}
            </div>

            {/* Text */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--bone)",
                lineHeight: 1.7,
              }}
            >
              {review.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
