import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-in">
          <a href="#top" className="logo">
            <span className="mark">N</span>
            <b>Nordiva</b>
            <span>Gebäudereinigung</span>
          </a>
          <div className="nav-links">
            <a href="#leistungen">Leistungen</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#vorteile">Vorteile</a>
            <a href="#bewertungen">Bewertungen</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <a href="tel:+4915510057038" className="nav-tel">📞 0155 1005 7038</a>
            <a href="#kostenvoranschlag" className="btn btn-green" style={{ padding: '11px 20px' }}>Kostenvoranschlag</a>
            <div className="nav-burger" onClick={() => setOpen(true)}>
              <i /><i /><i />
            </div>
          </div>
        </div>
      </nav>

      <div className={`drawer${open ? ' open' : ''}`}>
        <button className="x" onClick={close}>&times;</button>
        <a href="#leistungen" onClick={close}>Leistungen</a>
        <a href="#ablauf" onClick={close}>Ablauf</a>
        <a href="#vorteile" onClick={close}>Vorteile</a>
        <a href="#bewertungen" onClick={close}>Bewertungen</a>
        <a href="#faq" onClick={close}>FAQ</a>
        <a href="tel:+4915510057038" style={{ color: 'var(--green-deep)', border: 0 }} onClick={close}>📞 0155 1005 7038</a>
        <a href="#kostenvoranschlag" className="btn btn-green" onClick={close}>Kostenvoranschlag anfordern</a>
      </div>
    </>
  )
}
