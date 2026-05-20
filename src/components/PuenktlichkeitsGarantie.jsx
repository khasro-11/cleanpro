import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../utils/animations'

const INK = '#0e1f33'
const NAVY = '#1f3a5f'
const SKY = '#7fb3d5'
const PAPER = '#f5f7f8'
const PAPER_WARM = '#eef2f5'
const LINE = 'rgba(14,31,51,0.10)'

function ClockIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={NAVY} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 16 14"/>
      <line x1="12" y1="3" x2="12" y2="1"/>
      <line x1="12" y1="23" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="1" y2="12"/>
      <line x1="23" y1="12" x2="21" y2="12"/>
    </svg>
  )
}

export default function PuenktlichkeitsGarantie() {
  return (
    <section style={{ background: PAPER }}>
      <div className="pg-outer" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px 32px' }}>
        <motion.div
          className="pg-card"
          style={{
            background: PAPER_WARM,
            border: `1.5px solid ${LINE}`,
            borderRadius: 20,
            padding: '36px 48px',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Icon */}
          <div
            className="pg-icon"
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: SKY,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ClockIcon size={34} />
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Pünktlichkeitsgarantie
            </div>
            <div className="pg-headline" style={{ fontWeight: 800, letterSpacing: '-0.025em', color: INK, lineHeight: 1.15 }}>
              Pünktlich auf ±10 Minuten —<br className="pg-br" />
              oder die Reinigung ist kostenlos.
            </div>
          </div>

          {/* CTA */}
          <a
            href="#kontakt"
            className="pg-cta"
            style={{
              background: INK,
              color: PAPER,
              padding: '14px 24px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Festpreis in 24h sichern
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .pg-outer { padding: 0 12px 24px !important; }
          .pg-card {
            flex-direction: column;
            align-items: flex-start !important;
            padding: 24px !important;
            gap: 20px !important;
          }
          .pg-icon { width: 56px !important; height: 56px !important; border-radius: 14px !important; }
          .pg-headline { font-size: 18px !important; }
          .pg-br { display: none; }
          .pg-cta { width: 100%; text-align: center; padding: 14px 0 !important; }
        }
        @media (min-width: 768px) {
          .pg-headline { font-size: clamp(20px, 2vw, 28px); }
        }
      `}</style>
    </section>
  )
}
