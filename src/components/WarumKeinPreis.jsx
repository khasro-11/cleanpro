import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'

const INK = '#0e1f33'
const INK_SOFT = '#3a4a5e'
const NAVY = '#1f3a5f'
const SKY = '#7fb3d5'
const PAPER = '#f5f7f8'
const PAPER_WARM = '#eef2f5'

const paragraphs = [
  {
    n: '01',
    text: 'Weil jedes Objekt anders ist. Eine Zahnarztpraxis braucht andere Hygiene als ein Büro, eine Airbnb mit 80 m² andere Kalkulation als ein Studio.',
  },
  {
    n: '02',
    text: 'Weil Festpreise nur dann fair sind, wenn wir das Objekt gesehen haben. Wir kalkulieren nach Besichtigung — und dann ist der Preis bindend.',
  },
  {
    n: '03',
    text: 'Weil Sie in 24 Stunden ein schriftliches Angebot haben. Kein Vertrag, keine Verpflichtung. Erst dann entscheiden Sie.',
  },
]

export default function WarumKeinPreis() {
  return (
    <section style={{ background: PAPER }}>
      <div className="wkp-outer" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 40px 40px' }}>
        <motion.div
          className="wkp-card"
          style={{
            background: NAVY,
            borderRadius: 24,
            padding: '56px 64px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Left: headline */}
          <motion.div variants={fadeUp}>
            <div style={{ fontSize: 12, fontWeight: 700, color: SKY, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
              Transparenz
            </div>
            <h2 className="wkp-headline" style={{ fontWeight: 800, letterSpacing: '-0.03em', color: '#f5f7f8', lineHeight: 1.05, margin: 0 }}>
              Warum kein Preis auf der Webseite?
            </h2>
            <div style={{ marginTop: 32 }}>
              <a
                href="#kontakt"
                style={{
                  display: 'inline-block',
                  background: SKY,
                  color: '#0e1f33',
                  padding: '14px 24px',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                Festpreis in 24h sichern
              </a>
            </div>
          </motion.div>

          {/* Right: paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {paragraphs.map((p) => (
              <motion.div
                key={p.n}
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
                variants={fadeUp}
              >
                <span style={{
                  fontSize: 12, fontWeight: 800, color: SKY,
                  letterSpacing: '0.08em', flexShrink: 0,
                  paddingTop: 3,
                }}>
                  {p.n}
                </span>
                <p style={{
                  fontSize: 16, lineHeight: 1.65,
                  color: 'rgba(245,247,248,0.82)',
                  margin: 0,
                }}>
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .wkp-outer { padding: 24px 12px !important; }
          .wkp-card {
            grid-template-columns: 1fr !important;
            padding: 32px 24px !important;
            gap: 32px !important;
          }
          .wkp-headline { font-size: 28px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .wkp-outer { padding: 24px 24px !important; }
          .wkp-card { padding: 40px 40px !important; gap: 40px !important; }
          .wkp-headline { font-size: 32px !important; }
        }
        @media (min-width: 1024px) {
          .wkp-headline { font-size: clamp(32px, 3vw, 44px); }
        }
      `}</style>
    </section>
  )
}
