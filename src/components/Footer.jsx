import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../utils/animations'
import { SkylineWordmark } from './logos'

const INK = '#0e1f33'
const INK_SOFT = '#3a4a5e'
const SKY = '#7fb3d5'
const PAPER = '#f5f7f8'

export default function Footer() {
  return (
    <footer style={{ background: PAPER }} className="site-footer">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px 40px' }} className="footer-inner">
        <div style={{ height: 1, background: 'rgba(14,31,51,0.08)', marginBottom: 32 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }} className="footer-row">
          <SkylineWordmark textColor={INK} accent={SKY} size={24} />
          <div style={{ fontSize: 13, color: INK_SOFT }}>
            © {new Date().getFullYear()} · <a href="/impressum.html" style={{ color: INK_SOFT, textDecoration: 'none' }}>Impressum</a> · <a href="/datenschutz.html" style={{ color: INK_SOFT, textDecoration: 'none' }}>Datenschutz</a> · <a href="#" style={{ color: INK_SOFT, textDecoration: 'none' }}>AGB</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-inner { padding: 0 20px 40px !important; }
          .footer-row { flex-direction: column; align-items: center !important; text-align: center; gap: 12px !important; }
        }
      `}</style>
    </footer>
  )
}
