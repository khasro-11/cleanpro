import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'

const INK = '#0e1f33'
const INK_SOFT = '#3a4a5e'
const NAVY = '#1f3a5f'
const NAVY_DEEP = '#162c48'
const SKY = '#7fb3d5'
const PAPER = '#f5f7f8'

export default function Galerie() {
  return (
    <section id="galerie" style={{ background: PAPER }}>
      <div className="galerie-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 40px' }}>

        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}
          className="galerie-header"
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          <div>
            <motion.div
              style={{ fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: '0.12em', textTransform: 'uppercase' }}
              variants={fadeUp}
            >
              Im Einsatz
            </motion.div>
            <motion.h2
              style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, margin: '8px 0 0', letterSpacing: '-0.03em', color: INK }}
              variants={fadeUp}
            >
              Das Team. Die Arbeit. Echt.
            </motion.h2>
          </div>
          <motion.p
            className="galerie-subtitle"
            style={{ fontSize: 13, color: INK_SOFT, maxWidth: 320, lineHeight: 1.55, textAlign: 'right' }}
            variants={fadeUp}
          >
            Keine Stock-Fotos — das sind unsere Mitarbeiter bei der täglichen Arbeit in Objekten.
          </motion.p>
        </motion.div>

        <motion.div
          className="galerie-grid"
          variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
        >
          {/* Left: large fensterreinigung photo */}
          <motion.div
            className="galerie-main"
            style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: INK }}
            variants={fadeUp}
          >
            <img
              src="/photos/fensterreinigung.png"
              alt="Nordiva Clean – Fensterreinigung Bönen"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', top: 20, left: 20,
              background: 'rgba(14,31,51,0.70)', backdropFilter: 'blur(8px)',
              color: PAPER, padding: '8px 14px', borderRadius: 99,
              fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
              letterSpacing: '0.04em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: SKY, flexShrink: 0 }} />
              FENSTERREINIGUNG
            </div>
          </motion.div>

          {/* Right column: stairwell photo + pull-quote tile */}
          <div className="galerie-right">
            <motion.div
              className="galerie-stairwell"
              style={{ background: INK }}
              variants={fadeUp}
            >
              <img
                src="/photos/saugen.png"
                alt="Nordiva Clean – Gebäudereinigung & Teppichreinigung Bönen"
                loading="lazy"
                decoding="async"
              />
              <div style={{
                position: 'absolute', top: 20, left: 20,
                background: 'rgba(14,31,51,0.70)', backdropFilter: 'blur(8px)',
                color: PAPER, padding: '8px 14px', borderRadius: 99,
                fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
                letterSpacing: '0.04em',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: SKY, flexShrink: 0 }} />
                GEBÄUDEREINIGUNG
              </div>
            </motion.div>

            <motion.div
              className="galerie-quote"
              style={{
                position: 'relative', borderRadius: 24, padding: 28, overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}
              variants={fadeUp}
            >
              <img
                src="/photos/treppenhaus-team.png"
                alt="Nordiva Clean Reinigungsteam – Treppenhausreinigung Bönen"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,31,51,0.75) 40%, rgba(14,31,51,0.25) 100%)' }} />
              <div style={{ position: 'relative', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Festes Team
              </div>
              <div style={{ position: 'relative' }}>
                <div className="galerie-quote-text" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25, color: '#ffffff' }}>
                  „Dieselben Gesichter, jede Woche."
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Desktop */
        @media (min-width: 1024px) {
          .galerie-container { padding: 24px 40px !important; }
          .galerie-subtitle { display: block !important; }
          .galerie-header { flex-direction: row; align-items: flex-end !important; }
          .galerie-grid {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 14px;
            align-items: stretch;
          }
          .galerie-main { aspect-ratio: 4 / 5; }
          .galerie-right {
            display: grid;
            grid-template-rows: 1.4fr 1fr;
            gap: 14px;
          }
          .galerie-stairwell { position: relative; border-radius: 24px; overflow: hidden; }
          .galerie-stairwell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
          .galerie-container { padding: 24px 24px !important; }
          .galerie-subtitle { display: none !important; }
          .galerie-header { flex-direction: column; align-items: flex-start !important; }
          .galerie-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .galerie-main { aspect-ratio: 4 / 5; }
          .galerie-right {
            display: grid;
            grid-template-rows: auto auto;
            gap: 14px;
          }
          .galerie-stairwell { aspect-ratio: 1 / 1; position: relative; border-radius: 24px; overflow: hidden; }
          .galerie-stairwell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .galerie-container { padding: 32px 12px 0 !important; }
          .galerie-subtitle { display: none !important; }
          .galerie-header { flex-direction: column; align-items: flex-start !important; }
          .galerie-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .galerie-main { aspect-ratio: 3 / 4; }
          .galerie-right {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .galerie-stairwell { aspect-ratio: 4 / 3; position: relative; border-radius: 20px; overflow: hidden; }
          .galerie-stairwell img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .galerie-main { border-radius: 20px !important; }
          .galerie-quote { border-radius: 20px !important; padding: 22px !important; }
          .galerie-quote-text { font-size: 18px !important; }
        }
      `}</style>
    </section>
  )
}
