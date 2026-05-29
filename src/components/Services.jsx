import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'

const INK = '#0e1f33'
const INK_SOFT = '#3a4a5e'
const NAVY = '#1f3a5f'
const SKY = '#7fb3d5'
const PAPER = '#f5f7f8'
const PAPER_WARM = '#eef2f5'
const LINE = 'rgba(14,31,51,0.10)'

function Icon({ name, size = 24, color = INK }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'building': return <svg {...p}><rect x="4" y="3" width="16" height="18"/><line x1="9" y1="7" x2="9" y2="9"/><line x1="13" y1="7" x2="13" y2="9"/><line x1="9" y1="12" x2="9" y2="14"/><line x1="13" y1="12" x2="13" y2="14"/><rect x="10" y="17" width="4" height="4"/></svg>
    case 'window':   return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
    case 'key':      return <svg {...p}><circle cx="8" cy="14" r="4"/><line x1="11" y1="11" x2="20" y2="2"/><line x1="17" y1="5" x2="20" y2="8"/><line x1="14" y1="8" x2="17" y2="11"/></svg>
    case 'spray':    return <svg {...p}><rect x="7" y="9" width="9" height="12" rx="1"/><path d="M9 9V5h5v4"/><path d="M14 5h4M14 3h4M14 7h4"/></svg>
    default:         return null
  }
}

const TRUST_FOOTER = 'Festpreis nach kostenloser Besichtigung. Keine Überraschungen.'

const services = [
  {
    icon: 'building',
    title: 'Gewerbe',
    valueLabel: 'Festpreis-Monatspaket',
    body: 'Wöchentlich oder täglich. Festes Team. Monatsbericht inklusive.',
    dark: true,
  },
  {
    icon: 'window',
    title: 'Fenster',
    valueLabel: 'Streifenfrei. Garantiert.',
    body: 'Innen + außen, alle Höhen. Festpreis nach Besichtigung.',
    dark: false,
  },
  {
    icon: 'key',
    title: 'Airbnb',
    valueLabel: 'Turnover in 3 Stunden.',
    body: 'Wechsel, Wäsche, Foto-Check. Festpreisangebot auf Anfrage.',
    dark: false,
  },
  {
    icon: 'spray',
    title: 'Gebäude',
    valueLabel: 'Verlässlich. Wöchentlich.',
    body: 'Treppenhaus, Hof, Eingang. Monatspauschale.',
    dark: false,
  },
]

export default function Services() {
  return (
    <section id="leistungen" style={{ background: PAPER }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 40px' }} className="services-container">

        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}
          className="services-header"
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          <div>
            <motion.div style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: '0.12em', textTransform: 'uppercase' }} variants={fadeUp}>
              Leistungen
            </motion.div>
            <motion.h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, margin: '8px 0 0', letterSpacing: '-0.03em', color: INK }} variants={fadeUp}>
              Vier Bereiche. Ein Vertrag.
            </motion.h2>
          </div>
          <motion.p style={{ fontSize: 13, color: INK_SOFT, maxWidth: 320, lineHeight: 1.55, textAlign: 'right' }} variants={fadeUp} className="services-subtitle">
            Bündeln Sie alle Reinigungsarbeiten bei einem Anbieter — eine Rechnung, ein Ansprechpartner, eine Telefonnummer.
          </motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              className="service-card"
              style={{
                background: s.dark ? INK : PAPER_WARM,
                color: s.dark ? PAPER : INK,
                borderRadius: 20,
              }}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Icon */}
              <div className="service-icon-box" style={{
                borderRadius: 14,
                background: s.dark ? 'rgba(127,179,213,0.18)' : PAPER,
                border: s.dark ? 'none' : `1px solid ${LINE}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={s.icon} color={s.dark ? SKY : NAVY} className="service-icon-svg" />
              </div>

              {/* Content */}
              <div className="service-content">
                <div className="service-title" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>{s.title}</div>
                <div className="service-value-label" style={{
                  fontWeight: 700,
                  color: s.dark ? SKY : NAVY,
                  letterSpacing: '-0.01em',
                }}>
                  {s.valueLabel}
                </div>
                <div className="service-body" style={{ lineHeight: 1.5, color: s.dark ? 'rgba(245,247,248,0.7)' : INK_SOFT }}>
                  {s.body}
                </div>
              </div>

              {/* Desktop trust footer */}
              <div className="service-footer" style={{
                borderTop: `1px solid ${s.dark ? 'rgba(255,255,255,0.1)' : LINE}`,
                fontSize: 11,
                color: s.dark ? 'rgba(245,247,248,0.5)' : INK_SOFT,
                fontStyle: 'italic',
              }}>
                {TRUST_FOOTER}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Tablet: 2-column grid */
        @media (min-width: 768px) and (max-width: 1023px) {
          .services-container { padding: 24px 24px !important; }
          .services-subtitle { display: none !important; }
          .services-header { flex-direction: column; align-items: flex-start !important; }
          .services-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .service-card {
            padding: 24px;
            min-height: 240px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .service-icon-box { width: 48px; height: 48px; }
          .service-content { flex: 1; display: flex; flex-direction: column; gap: 6px; margin: 16px 0; }
          .service-title { font-size: 20px; margin-bottom: 2px; }
          .service-value-label { font-size: 14px; }
          .service-body { font-size: 13px; }
          .service-footer { padding-top: 14px; }
        }

        /* Desktop: 4-column grid */
        @media (min-width: 1024px) {
          .services-container { padding: 24px 40px !important; }
          .services-subtitle { display: block !important; }
          .services-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
          .service-card {
            padding: 28px;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .service-icon-box { width: 52px; height: 52px; }
          .service-icon-svg { width: 24px !important; height: 24px !important; }
          .service-content { flex: 1; display: flex; flex-direction: column; gap: 6px; margin: 20px 0; }
          .service-title { font-size: 24px; margin-bottom: 2px; }
          .service-value-label { font-size: 15px; }
          .service-body { font-size: 14px; }
          .service-footer { padding-top: 16px; }
        }

        /* Mobile: horizontal card, no footer */
        @media (max-width: 767px) {
          .services-container { padding: 32px 12px 0 !important; }
          .services-subtitle { display: none !important; }
          .services-header { flex-direction: column; align-items: flex-start !important; }
          .services-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .service-card {
            padding: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 16px;
          }
          .service-icon-box { width: 48px; height: 48px; border-radius: 12px !important; flex-shrink: 0; }
          .service-content { flex: 1; min-width: 0; }
          .service-title { font-size: 18px; margin-bottom: 2px; }
          .service-value-label { font-size: 12px; margin-bottom: 2px; }
          .service-body { font-size: 12px; }
          .service-footer { display: none !important; }
        }
      `}</style>
    </section>
  )
}
