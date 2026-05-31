import { useState } from 'react'

const FAQS = [
  {
    q: 'Was umfasst die Gebäudereinigung genau?',
    a: 'Wir bieten Büro- und Gewerbereinigung, Fenster & Glas, Treppenhaus- und Gebäudereinigung, Ferienwohnungs-Service, Grund- und Bauendreinigung. Jede Leistung stimmen wir individuell auf Ihr Objekt ab — alles aus einer Hand.',
  },
  {
    q: 'Können die Leistungen individuell angepasst werden?',
    a: 'Absolut. Wir stellen für jedes Objekt ein passendes Paket zusammen — ob einmalig, wöchentlich oder täglich. Sie wählen, welche Leistungen Sie in welchem Umfang brauchen, wir setzen es zuverlässig um.',
  },
  {
    q: 'Wie schnell bekomme ich ein Angebot?',
    a: 'Nach einer kurzen, kostenlosen Besichtigung erhalten Sie Ihr Festpreisangebot innerhalb von 24 Stunden — schriftlich und ohne versteckte Kosten. Auf Ihre erste Anfrage antworten wir werktags in unter 4 Stunden.',
  },
  {
    q: 'Sind Sie versichert?',
    a: 'Ja. Wir sind über eine Betriebshaftpflicht bis 5 Mio. € abgesichert. Sollte bei einem Einsatz doch einmal etwas zu Schaden kommen, regeln wir das unbürokratisch.',
  },
  {
    q: 'In welchem Gebiet sind Sie tätig?',
    a: 'Wir arbeiten inhabergeführt aus Bönen heraus und sind im gesamten Kreis Unna kurzfristig vor Ort — unter anderem in Hamm, Kamen, Unna, Bergkamen und Umgebung.',
  },
]

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => {
    setOpenIdx(prev => prev === i ? null : i)
  }

  return (
    <section id="faq" className="proc">
      <div className="wrap">
        <div className="faq-grid">
          <div className="rv">
            <span className="eyebrow">Häufige Fragen</span>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '16px 0 12px', letterSpacing: '-.03em' }}>
              Alles, was Sie wissen müssen.
            </h2>
            <p style={{ color: 'var(--ink-soft)', margin: '0 0 22px' }}>
              Ihre Frage ist nicht dabei? Rufen Sie an — wir helfen sofort weiter.
            </p>
            <a href="tel:+4915510057038" className="btn btn-ghost">📞 0155 1005 7038</a>
          </div>

          <div className="faq-list rv">
            {FAQS.map((item, i) => {
              const isOpen = openIdx === i
              return (
                <div key={i} className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button className="faq-q" onClick={() => toggle(i)}>
                    {item.q}
                    <span className="pm"><PlusIcon /></span>
                  </button>
                  <div
                    className="faq-a"
                    style={{ maxHeight: isOpen ? '400px' : '0' }}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
