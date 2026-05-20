import { motion } from "framer-motion";
import HeroAnimation from "./HeroAnimation";

const INK = "#0e1f33";
const INK_SOFT = "#3a4a5e";
const NAVY = "#1f3a5f";
const SKY = "#7fb3d5";
const PAPER = "#f5f7f8";
const PAPER_WARM = "#eef2f5";
const LINE = "rgba(14,31,51,0.10)";

function Icon({ name, size = 16, color = INK }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "arrow")
    return (
      <svg {...p}>
        <line x1="4" y1="12" x2="20" y2="12" />
        <polyline points="14 6 20 12 14 18" />
      </svg>
    );
  if (name === "phone")
    return (
      <svg {...p}>
        <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    );
  if (name === "star")
    return (
      <svg {...p} fill={color} stroke="none">
        <polygon points="12 3 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9" />
      </svg>
    );
  return null;
}

export default function Hero() {
  return (
    <section id="hero" style={{ background: PAPER }}>
      {/* ── DESKTOP bento grid (≥ 768px) ── */}
      <div className="hero-desktop" style={{ paddingTop: 96 }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "40px 40px 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: "110px",
              gap: 14,
            }}
          >
            {/* Hero copy — 7 cols × 4 rows */}
            <motion.div
              style={{
                gridColumn: "span 7",
                gridRow: "span 4",
                background: PAPER_WARM,
                borderRadius: 24,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: "#22c55e",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: INK_SOFT,
                    letterSpacing: "0.04em",
                  }}
                >
                  Diese Woche · 4 Termine frei
                </span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(48px, 5.5vw, 76px)",
                  lineHeight: 0.98,
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: "-0.035em",
                  color: INK,
                }}
              >
                Reinigung,
                <br />
                die Verwalter{" "}
                <span style={{ color: NAVY }}>weiter&shy;empfehlen.</span>
              </h1>
              <div>
                <p
                  style={{
                    fontSize: 16,
                    color: INK_SOFT,
                    lineHeight: 1.55,
                    maxWidth: 480,
                    margin: "0 0 24px 0",
                  }}
                >
                  Gewerbe · Fenster · Airbnb · Gebäude — ein Team, ein
                  Ansprechpartner, faire Preise. Bönen und Umgebung.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <motion.a
                    href="#kontakt"
                    style={{
                      background: INK,
                      color: PAPER,
                      padding: "14px 22px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    Angebot erhalten.{" "}
                    <Icon name="arrow" size={14} color={PAPER} />
                  </motion.a>
                  <a
                    href="tel:+4915510057038"
                    style={{
                      background: "transparent",
                      color: INK,
                      padding: "14px 22px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      border: `1px solid ${LINE}`,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Icon name="phone" size={14} color={INK} /> +49 155 1005
                    7038
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Animation — 5 cols × 4 rows */}
            <motion.div
              style={{
                gridColumn: "span 5",
                gridRow: "span 4",
                background: NAVY,
                borderRadius: 24,
                overflow: "hidden",
                position: "relative",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <HeroAnimation />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  background: "rgba(14,31,51,0.65)",
                  backdropFilter: "blur(8px)",
                  color: PAPER,
                  padding: "8px 14px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 99,
                    background: "#ff5b5b",
                    display: "block",
                  }}
                />
                REC · Live-Ergebnis
              </div>
            </motion.div>

            {/* Tile: Inhabergeführt */}
            <motion.div
              style={{
                gridColumn: "span 4",
                gridRow: "span 2",
                background: NAVY,
                color: PAPER,
                borderRadius: 20,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: SKY,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Inhabergeführt
              </div>
              <div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  Bönen
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(245,247,248,0.65)",
                    marginTop: 6,
                  }}
                >
                  Kreis Unna · persönlich vor Ort
                </div>
              </div>
            </motion.div>

            {/* Stat: <4h */}
            <motion.div
              style={{
                gridColumn: "span 4",
                gridRow: "span 2",
                background: SKY,
                color: INK,
                borderRadius: 20,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                Antwortzeit
              </div>
              <div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  &lt; 4h
                </div>
                <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>
                  Werktags zwischen 8–18 Uhr
                </div>
              </div>
            </motion.div>

            {/* Tile: Kostenlose Besichtigung */}
            <motion.div
              style={{
                gridColumn: "span 4",
                gridRow: "span 2",
                background: PAPER_WARM,
                borderRadius: 20,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: NAVY,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Persönlicher Service
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: INK,
                  }}
                >
                  Kostenlose Besichtigung & transparentes Festpreisangebot.
                </div>
                <div style={{ fontSize: 12, color: INK_SOFT, marginTop: 8 }}>
                  Inhabergeführt · Bönen & Umgebung
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MOBILE layout (< 768px) ── */}
      <div
        className="hero-mobile"
        style={{
          padding: "76px 12px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Copy block */}
        <motion.div
          style={{
            background: PAPER_WARM,
            borderRadius: 22,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                background: "#22c55e",
                display: "block",
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 600, color: INK_SOFT }}>
              Diese Woche · 4 Termine frei
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(26px, 8vw, 36px)",
              lineHeight: 1.05,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.035em",
              color: INK,
            }}
          >
            Reinigung,
            <br />
            die Verwalter <span style={{ color: NAVY }}>weiterempfehlen.</span>
          </h1>
          <p
            style={{
              fontSize: 14,
              color: INK_SOFT,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Gewerbe · Fenster · Airbnb · Gebäude — ein Team, ein
            Ansprechpartner, faire Preise.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a
              href="#kontakt"
              style={{
                background: INK,
                color: PAPER,
                padding: "14px 18px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Angebot erhalten <Icon name="arrow" size={14} color={PAPER} />
            </a>
            <a
              href="tel:+4915510057038"
              style={{
                background: "transparent",
                color: INK,
                padding: "14px 18px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                border: `1px solid ${LINE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icon name="phone" size={14} color={INK} /> +49 155 1005 7038
            </a>
          </div>
        </motion.div>

        {/* Animation block */}
        <motion.div
          style={{
            background: NAVY,
            borderRadius: 22,
            overflow: "hidden",
            position: "relative",
            aspectRatio: "4 / 5",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <HeroAnimation />
          </div>
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: "rgba(14,31,51,0.7)",
              backdropFilter: "blur(8px)",
              color: PAPER,
              padding: "6px 10px",
              borderRadius: 99,
              fontSize: 10,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 99,
                background: "#ff5b5b",
                display: "block",
              }}
            />
            REC · Live
          </div>
        </motion.div>

        {/* Stat tiles */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <motion.div
            style={{
              background: NAVY,
              color: PAPER,
              borderRadius: 18,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minHeight: 130,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              style={{
                fontSize: 10,
                color: SKY,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Inhabergeführt
            </div>
            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Bönen
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(245,247,248,0.7)",
                  marginTop: 4,
                }}
              >
                Kreis Unna
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{
              background: SKY,
              color: INK,
              borderRadius: 18,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minHeight: 130,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Antwortzeit
            </div>
            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                &lt; 4h
              </div>
              <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>
                Werktags
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service promise tile */}
        <motion.div
          style={{
            background: PAPER_WARM,
            borderRadius: 18,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Persönlicher Service
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: INK,
            }}
          >
            Kostenlose Besichtigung & transparentes Festpreisangebot.
          </div>
          <div style={{ fontSize: 11, color: INK_SOFT }}>
            Inhabergeführt · Bönen & Umgebung
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) { .hero-mobile { display: none !important; } }
        @media (max-width: 767px) { .hero-desktop { display: none !important; } }
      `}</style>
    </section>
  );
}
