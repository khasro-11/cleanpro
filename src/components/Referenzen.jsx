import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'

const Stars = () => (
  <div className="flex items-center gap-1 mb-4">
    {Array(5).fill(0).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#d4a030">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
)

const testimonials = []

const logos = []

export default function Referenzen() {
  return (
    <section id="referenzen" className="py-16 md:py-24 lg:py-32 grain" style={{ background: 'linear-gradient(180deg, #edf8f9 0%, #f6fcfc 40%, #ffffff 70%, #f4fcfc 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          <motion.span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block" variants={fadeUp}>Nordiva Gebäudereinigung</motion.span>
          <motion.h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-950 tracking-tighter2 mb-4" variants={fadeUp}>
            Inhabergeführt aus Bönen
          </motion.h2>
          <motion.p className="text-teal-700/70 text-lg leading-relaxed2 max-w-xl mx-auto" variants={fadeUp}>
            Persönlicher Ansprechpartner, zuverlässige Arbeit, pünktliche Abrechnung — für Bönen und Umgebung.
          </motion.p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
          {testimonials.map(t => (
            <motion.div
              key={t.name}
              className="testimonial-card rounded-2xl p-7"
              style={t.dark ? { background: 'linear-gradient(145deg, #0d3a42, #19636e)', boxShadow: '0 8px 32px rgba(13,58,66,0.3)' } : {}}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 2px 8px rgba(13,58,66,0.08), 0 16px 48px rgba(13,58,66,0.15)' }}
              whileTap={{ y: 0, scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <Stars />
              <p className={`text-sm leading-relaxed2 mb-6 ${t.dark ? 'text-white/85' : 'text-teal-900'}`}>{t.quote}</p>
              <div className="flex items-center gap-3">
                <img src={`https://placehold.co/44x44/${t.color.replace('#','')}/ffffff?text=${t.avatar}`} className="w-11 h-11 rounded-full" alt={t.name} />
                <div>
                  <p className={`font-semibold text-sm ${t.dark ? 'text-white' : 'text-teal-950'}`}>{t.name}</p>
                  <p className={`text-xs ${t.dark ? 'text-white/50' : 'text-teal-600/70'}`}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Honest service promise */}
        <motion.div className="mt-16 pt-12 border-t border-teal-100" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={viewport}>
          <p className="text-center text-teal-600/50 text-sm font-medium tracking-wider uppercase mb-8">Kostenlose, unverbindliche Besichtigung vor Ort</p>
        </motion.div>
      </div>
    </section>
  )
}
