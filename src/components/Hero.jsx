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
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color, strokeWidth: 1.6,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  if (name === "arrow") return <svg {...p}><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>;
  if (name === "phone") return <svg {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
  return null;
}

export default function Hero() {
  return (
    <section id="hero" style={{ background: PAPER }}>
      <div className="hero-outer">
        <div className="hero-grid">

          {/* ── Copy ── */}
          <motion.div
            className="hero-copy"
            style={{
              background: PAPER_WARM, borderRadius: 24, padding: 40,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              position: "relative", overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="hero-h1"
              style={{
                fontSize: "clamp(32px, 5.5vw, 76px)",
                lineHeight: 0.98, fontWeight: 800,
                margin: 0, letterSpacing: "-0.035em", color: INK,
              }}
            >
              Reinigung,<br />
              die Verwalter{" "}
              <span style={{ color: NAVY }}>weiter&shy;empfehlen.</span>
            </h1>
            <div>
              <p
                className="hero-sub"
                style={{
                  fontSize: 16, color: INK_SOFT, lineHeight: 1.55,
                  maxWidth: 480, margin: "0 0 24px 0",
                }}
              >
                Gewerbe · Fenster · Airbnb · Gebäude — ein Team, ein
                Ansprechpartner, Festpreis in 24h. Bönen und Umgebung.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <motion.a
                  href="#kontakt"
                  className="hero-cta-primary"
                  style={{
                    background: INK, color: PAPER,
                    padding: "14px 22px", borderRadius: 999,
                    fontWeight: 600, fontSize: 14, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  Festpreis in 24h sichern{" "}
                  <Icon name="arrow" size={14} color={PAPER} />
                </motion.a>
                <a
                  href="tel:+4915510057038"
                  style={{
                    background: "transparent", color: INK,
                    padding: "14px 22px", borderRadius: 999,
                    fontWeight: 600, fontSize: 14, textDecoration: "none",
                    border: `1px solid ${LINE}`,
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  <Icon name="phone" size={14} color={INK} /> +49 155 1005 7038
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Animation ── */}
          <motion.div
            className="hero-animation"
            style={{
              background: NAVY, borderRadius: 24,
              overflow: "hidden", position: "relative",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              <HeroAnimation />
            </div>
            <div
              style={{
                position: "absolute", top: 20, left: 20,
                background: "rgba(14,31,51,0.65)", backdropFilter: "blur(8px)",
                color: PAPER, padding: "8px 14px", borderRadius: 99,
                fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "#ff5b5b", display: "block" }} />
              REC · Live-Ergebnis
            </div>
          </motion.div>

          {/* ── Stat: Inhabergeführt ── */}
          <motion.div
            className="hero-stat-a"
            style={{
              background: NAVY, color: PAPER, borderRadius: 20, padding: 24,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontSize: 12, color: SKY, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Inhabergeführt
            </div>
            <div>
              <div className="hero-stat-num" style={{ fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                Bönen
              </div>
              <div style={{ fontSize: 13, color: "rgba(245,247,248,0.65)", marginTop: 6 }}>
                Kreis Unna · persönlich vor Ort
              </div>
            </div>
          </motion.div>

          {/* ── Stat: Antwortzeit ── */}
          <motion.div
            className="hero-stat-b"
            style={{
              background: SKY, color: INK, borderRadius: 20, padding: 24,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7 }}>
              Antwortzeit
            </div>
            <div>
              <div className="hero-stat-num" style={{ fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                &lt; 4h
              </div>
              <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>
                Werktags zwischen 8–18 Uhr
              </div>
            </div>
          </motion.div>

          {/* ── Promise tile ── */}
          <motion.div
            className="hero-promise"
            style={{
              background: PAPER_WARM, borderRadius: 20, padding: 24,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Persönlicher Service
            </div>
            <div>
              <div className="hero-promise-text" style={{ fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em", color: INK }}>
                Kostenlose Besichtigung & transparentes Festpreisangebot.
              </div>
              <div style={{ fontSize: 12, color: INK_SOFT, marginTop: 8 }}>
                Inhabergeführt · Bönen & Umgebung
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        /* ── Shared ── */
        .hero-outer {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 40px 24px;
          padding-top: 136px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 110px;
          gap: 14px;
        }
        .hero-copy      { grid-column: span 7; grid-row: span 4; }
        .hero-animation { grid-column: span 5; grid-row: span 4; }
        .hero-stat-a    { grid-column: span 4; grid-row: span 2; }
        .hero-stat-b    { grid-column: span 4; grid-row: span 2; }
        .hero-promise   { grid-column: span 4; grid-row: span 2; }
        .hero-stat-num  { font-size: 56px; }
        .hero-promise-text { font-size: 18px; }

        /* ── Tablet (768px – 1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-outer { padding: 120px 24px 24px; }
          .hero-grid { grid-auto-rows: 100px; gap: 12px; }
          .hero-stat-num { font-size: 42px; }
        }

        /* ── Mobile (<768px): 2-col grid ── */
        @media (max-width: 767px) {
          .hero-outer { padding: 84px 12px 20px; }
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: auto;
            gap: 10px;
          }
          .hero-copy      { grid-column: span 2; padding: 24px !important; gap: 18px; flex-direction: column; justify-content: flex-start !important; }
          .hero-h1        { font-size: clamp(26px, 8vw, 36px) !important; line-height: 1.05 !important; }
          .hero-sub       { font-size: 14px !important; margin-bottom: 16px !important; }
          .hero-cta-primary { padding: 14px 18px !important; border-radius: 14px !important; }
          .hero-animation { grid-column: span 2; aspect-ratio: 4 / 5; min-height: 0; }
          .hero-stat-a    { grid-column: span 1; min-height: 130px; }
          .hero-stat-b    { grid-column: span 1; min-height: 130px; }
          .hero-promise   { grid-column: span 2; }
          .hero-stat-num  { font-size: 38px; }
          .hero-promise-text { font-size: 15px; }
        }
      `}</style>
    </section>
  );
}
