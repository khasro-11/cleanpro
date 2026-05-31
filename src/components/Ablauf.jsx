export default function Ablauf() {
  return (
    <section id="ablauf" className="proc">
      <div className="wrap">
        <div className="sec-head center rv">
          <span className="eyebrow" style={{ margin: '0 auto' }}>So einfach geht's</span>
          <h2>In vier Schritten zum sauberen Objekt.</h2>
          <p>Kein langes Hin und Her. Vom ersten Anruf bis zum festen Team vergehen oft nur wenige Tage.</p>
        </div>
        <div className="proc-grid rv">
          <div className="proc-step">
            <div className="pic">
              <span className="pn">1</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M9 5h6M9 5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2" />
                <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            </div>
            <h4>Bedarf nennen</h4>
            <p>Sagen Sie uns kurz, welches Objekt und welche Leistungen Sie brauchen — online oder am Telefon.</p>
          </div>

          <div className="proc-step">
            <div className="pic">
              <span className="pn">2</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <h4>Kostenlos besichtigen</h4>
            <p>Wir kommen unverbindlich vorbei, schauen uns alles an und besprechen Ihre Wünsche vor Ort.</p>
          </div>

          <div className="proc-step">
            <div className="pic">
              <span className="pn">3</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M14 3v5h5" />
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M9 14l2 2 4-4" />
              </svg>
            </div>
            <h4>Festpreis erhalten</h4>
            <p>Innerhalb von 24 Stunden bekommen Sie ein transparentes Angebot — schriftlich, ohne versteckte Kosten.</p>
          </div>

          <div className="proc-step">
            <div className="pic">
              <span className="pn">4</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 13l4 4L19 7" />
                <path d="M3 21c2-1 4-1 6 0M15 4c2-1 4-1 6 0" />
              </svg>
            </div>
            <h4>Team startet</h4>
            <p>Festes Team, feste Termine, monatlicher Foto-Bericht. Sie lehnen sich zurück, wir kümmern uns.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
