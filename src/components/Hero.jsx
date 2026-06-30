export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Privat- &amp; Gewerbekunden</span>
            <h1>
              Gebäudereinigung zu <span className="u">fairen</span> Konditionen.
            </h1>
            <p className="hero-sub">
              Inhabergeführte Reinigung für Büro, Treppenhaus, Fenster und
              Ferienwohnung — verlässliche Pflege, feste Termine und ein
              Ansprechpartner, der ans Telefon geht. Festpreis nach kostenloser
              Besichtigung.
            </p>
            <div className="hero-actions">
              <a href="#kostenvoranschlag" className="btn btn-green btn-lg">
                Kostenvoranschlag anfordern
              </a>
              <a href="tel:+4915510057038" className="tlink">
                oder einfach anrufen
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="15"
                  height="15"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <div className="hero-chips">
              <a href="#leistungen">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Büroreinigung
              </a>
              <a href="#leistungen">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Fenster &amp; Glas
              </a>
              <a href="#leistungen">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Treppenhaus
              </a>
              <a href="#leistungen">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Ferienwohnung
              </a>
            </div>
          </div>

          <div className="hero-media">
            <figure className="hero-photo" style={{ margin: 0 }}>
              <img
                src="/photos/fensterreinigung.png"
                alt="Fensterreinigung mit Abzieher in Bönen"
              />
            </figure>
            <div className="hero-badge">
              <div className="rev">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="22"
                  height="22"
                >
                  <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
              </div>
              <div>
                <b>5,0 / 5,0</b>
                <div className="stars">★★★★★</div>
                <p>Google-Bewertungen aus der Region</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
