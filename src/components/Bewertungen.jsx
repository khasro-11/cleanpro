function GoogleLogo() {
  return (
    <svg className="g" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-2 3.2-4.9 3.2-7.8z" />
      <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M6 14.4a6.6 6.6 0 0 1 0-4.2V7.4H2.3a11 11 0 0 0 0 9.8L6 14.4z" />
      <path fill="#EA4335" d="M12 5.6c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 12 1 11 11 0 0 0 2.3 7.4L6 10.2c.9-2.5 3.2-4.6 6-4.6z" />
    </svg>
  )
}

export default function Bewertungen() {
  return (
    <section id="bewertungen" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Bewertungen</span>
          <h2>Kundenzufriedenheit ist für uns das A und O.</h2>
          <p>Echte Stimmen von Hausverwaltungen, Praxen und Gastgebern aus Bönen und Umgebung.</p>
        </div>
        <div className="rev-grid rv">
          <div className="rev-card">
            <div className="stars">★★★★★</div>
            <p>„Zufrieden.. ich kann es nur weiterempfehlen 👍🏼"</p>
            <div className="rev-foot">
              <div className="av">A</div>
              <div><b>Andirena Alhasan</b><span>Google-Bewertung</span></div>
              <GoogleLogo />
            </div>
          </div>

          <div className="rev-card">
            <div className="stars">★★★★★</div>
            <p>„Zuverlässig und sauber. Kann ich nur weiterempfehlen."</p>
            <div className="rev-foot">
              <div className="av">T</div>
              <div><b>Torina Dezlar</b><span>Google-Bewertung</span></div>
              <GoogleLogo />
            </div>
          </div>

          <div className="rev-card">
            <div className="stars">★★★★★</div>
            <p>„Ich bin wirklich begeistert vom Service. Die Mitarbeiter waren freundlich, sorgfältig und haben hervorragende Arbeit geleistet. Alles war perfekt sauber und ordentlich. Vielen Dank für die tolle Arbeit – jederzeit gerne wieder!"</p>
            <div className="rev-foot">
              <div className="av">G</div>
              <div><b>Gule Hasso</b><span>Google-Bewertung</span></div>
              <GoogleLogo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
