import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'

const INK = '#0e1f33'
const INK_SOFT = '#3a4a5e'
const NAVY = '#1f3a5f'
const PAPER = '#f5f7f8'
const PAPER_WARM = '#eef2f5'
const LINE = 'rgba(14,31,51,0.10)'

function Icon({ name, size = 20, color = NAVY }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'shield':   return <svg {...p}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/></svg>
    case 'leaf':     return <svg {...p}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19c4-4 8-6 12-8"/></svg>
    case 'clock':    return <svg {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>
    case 'check':    return <svg {...p}><path d="M4 12l5 5 11-12"/></svg>
    case 'phone':    return <svg {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
    case 'star':     return <svg {...p} fill={color} stroke="none"><polygon points="12 3 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9"/></svg>
    default:         return null
  }
}

const features = [
  { icon: 'shield', t: 'Voll versichert',   s: 'Haftpflicht bis 5 Mio. €. Schäden? Wir regeln das.' },
  { icon: 'leaf',   t: 'Öko-Mittel',        s: 'Ohne Mikroplastik, mit EU-Ecolabel.' },
  { icon: 'check',  t: 'Festes Team',       s: 'Keine Subunternehmer, keine wechselnden Gesichter.' },
  { icon: 'phone',  t: 'Direktdraht',       s: 'Eine Nummer. Eine Person. Antwort in < 4h.' },
  { icon: 'star',   t: 'Inhabergeführt',    s: 'Direkt mit dem Inhaber — kein Callcenter, kein Zwischenhändler.' },
]

export default function Vorteile() {
  return (
    <section id="vorteile" style={{ background: PAPER }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 40px 40px' }} className="vorteile-container">

        <motion.div
          style={{ marginBottom: 28 }}
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          <motion.div
            style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            variants={fadeUp}
          >
            Warum wir
          </motion.div>
          <motion.h2
            className="vorteile-heading"
            style={{ fontSize: 'clamp(32px, 3vw, 44px)', fontWeight: 800, margin: '8px 0 0', letterSpacing: '-0.03em', color: INK }}
            variants={fadeUp}
          >
            Fünf Gründe, weniger zu kontrollieren.
          </motion.h2>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, gridAutoRows: '1fr' }}
          className="trust-grid"
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          {features.map(f => (
            <motion.div
              key={f.t}
              className="trust-tile"
              style={{
                background: PAPER_WARM, borderRadius: 20, padding: 24,
                display: 'flex', gap: 16,
              }}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 2px 4px rgba(14,31,51,0.05), 0 12px 32px rgba(14,31,51,0.08)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="trust-icon-box" style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: PAPER, border: `1px solid ${LINE}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={f.icon} size={20} color={NAVY} className="trust-icon-svg" />
              </div>
              <div>
                <div className="trust-title" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 6, color: INK }}>
                  {f.t}
                </div>
                <div className="trust-body" style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.5 }}>
                  {f.s}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .trust-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 767px) {
          .vorteile-container { padding: 32px 12px 0 !important; }
          .vorteile-heading { font-size: 28px !important; }
          .trust-grid { gap: 8px !important; }
          .trust-tile { padding: 14px !important; border-radius: 14px !important; }
          .trust-icon-box { width: 36px !important; height: 36px !important; border-radius: 10px !important; }
          .trust-title { font-size: 13px !important; margin-bottom: 4px !important; }
          .trust-body { font-size: 11px !important; }
        }
      `}</style>
    </section>
  )
}
