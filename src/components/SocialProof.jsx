import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'
import { AGGREGATE, REVIEWS } from '../data/reviews'

const INK = '#0e1f33'
const INK_SOFT = '#3a4a5e'
const NAVY = '#1f3a5f'
const SKY = '#7fb3d5'
const PAPER = '#f5f7f8'
const PAPER_WARM = '#eef2f5'
const LINE = 'rgba(14,31,51,0.10)'

function StarIcon({ filled = true, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? SKY : 'none'}
      stroke={SKY} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 3 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9"/>
    </svg>
  )
}

function Stars({ count = 5, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < count} size={size} />
      ))}
    </div>
  )
}

// TODO: Replace placeholder logos with real customer logos
const customerLogos = [null, null, null, null, null]

export default function SocialProof() {
  return (
    <section style={{ background: PAPER }}>
      <div className="sp-outer" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 40px 40px' }}>

        {/* Header */}
        <motion.div
          style={{ marginBottom: 36 }}
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          <motion.div style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: '0.12em', textTransform: 'uppercase' }} variants={fadeUp}>
            Referenzen
          </motion.div>
          <motion.h2 className="sp-headline" style={{ fontWeight: 800, margin: '8px 0 0', letterSpacing: '-0.03em', color: INK }} variants={fadeUp}>
            Was Bönen über uns sagt.
          </motion.h2>
        </motion.div>

        {/* Google rating bar — zeigt Wertung nur wenn echte Daten in src/data/reviews.js eingetragen */}
        <motion.div
          className="sp-rating-bar"
          style={{
            background: PAPER_WARM,
            border: `1px solid ${LINE}`,
            borderRadius: 16,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 28,
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {AGGREGATE.ratingValue !== null && (
            <>
              <div>
                <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.04em', color: INK, lineHeight: 1 }}>{AGGREGATE.ratingValue}</div>
                <Stars count={5} size={18} />
              </div>
              <div style={{ width: 1, height: 48, background: LINE }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Google-Bewertung</div>
                {AGGREGATE.reviewCount > 0 && (
                  <div style={{ fontSize: 13, color: INK_SOFT, marginTop: 2 }}>
                    {AGGREGATE.reviewCount} Bewertungen
                  </div>
                )}
              </div>
            </>
          )}
          <a
            href="https://share.google/ztBRJrasaE3DadbzZ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: AGGREGATE.ratingValue !== null ? 'auto' : '0',
              fontSize: 13,
              fontWeight: 700,
              color: NAVY,
              textDecoration: 'none',
              border: `1px solid ${LINE}`,
              padding: '8px 16px',
              borderRadius: 99,
            }}
          >
            Auf Google ansehen →
          </a>
        </motion.div>

        {/* Testimonial cards — nur sichtbar wenn REVIEWS in src/data/reviews.js befüllt */}
        {REVIEWS.length > 0 && (
          <motion.div
            className="sp-grid"
            style={{ display: 'grid', gap: 14 }}
            variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          >
            {REVIEWS.map((t, i) => (
              <motion.div
                key={i}
                style={{
                  background: i === 0 ? NAVY : PAPER_WARM,
                  color: i === 0 ? PAPER : INK,
                  borderRadius: 20,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
                variants={fadeUp}
              >
                <Stars count={t.stars} size={14} />
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                  color: i === 0 ? 'rgba(245,247,248,0.88)' : INK_SOFT,
                  fontStyle: 'italic',
                }}>
                  „{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${i === 0 ? 'rgba(255,255,255,0.12)' : LINE}`, paddingTop: 16 }}>
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      width={40}
                      height={40}
                      style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: i === 0 ? 'rgba(127,179,213,0.3)' : LINE,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800,
                      color: i === 0 ? SKY : NAVY,
                      flexShrink: 0,
                    }}>
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? PAPER : INK }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: i === 0 ? 'rgba(245,247,248,0.6)' : INK_SOFT, marginTop: 1 }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      <style>{`
        @media (max-width: 767px) {
          .sp-outer { padding: 24px 12px !important; }
          .sp-grid { grid-template-columns: 1fr !important; }
          .sp-headline { font-size: 28px !important; }
          .sp-rating-bar { flex-wrap: wrap; gap: 14px !important; padding: 16px !important; }
          .sp-rating-bar a { margin-left: 0 !important; }
          .sp-logos { gap: 10px !important; }
          .sp-logos > div { width: 100px !important; height: 44px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .sp-outer { padding: 24px 24px !important; }
          .sp-grid { grid-template-columns: 1fr 1fr !important; }
          .sp-grid > div:first-child { grid-column: span 2; }
          .sp-headline { font-size: 36px !important; }
        }
        @media (min-width: 1024px) {
          .sp-grid { grid-template-columns: repeat(3, 1fr); }
          .sp-headline { font-size: clamp(32px, 3vw, 44px); }
        }
      `}</style>
    </section>
  )
}
