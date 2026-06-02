function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function Services() {
  return (
    <section id="leistungen">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Unsere Leistungen</span>
          <h2>Alles rund um Ihre Immobilie — aus einer Hand.</h2>
          <p>Bündeln Sie alle Reinigungs- und Pflegearbeiten bei einem Anbieter: eine Rechnung, eine Telefonnummer, dieselben Gesichter.</p>
        </div>
        <div className="svc-grid rv">
          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
                <path d="M9 9h.01M9 12h.01M9 15h.01" />
              </svg>
            </div>
            <h3>Büro &amp; Gewerbe</h3>
            <p>Wöchentlich oder täglich, mit festem Team und monatlichem Bericht. Festpreis-Paket nach kostenloser Besichtigung.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
              </svg>
            </div>
            <h3>Fenster &amp; Glas</h3>
            <p>Streifenfrei innen und außen, in jeder Höhe. Für Praxen, Ladenlokale und Privathaushalte.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 21h4v-4h4v-4h4V9h4V5" />
                <path d="M3 21V3" />
              </svg>
            </div>
            <h3>Treppenhaus &amp; Gebäude</h3>
            <p>Treppenhaus, Hof und Eingang — verlässlich, jede Woche. Monatspauschale für Verwaltungen und Eigentümer.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
              </svg>
            </div>
            <h3>Ferienwohnung &amp; Airbnb</h3>
            <p>Wechsel, Wäsche und Foto-Check — Turnover in rund 3 Stunden. Pauschalpreis pro Objekt.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M19 5l-7 7M14 4l6 6-9 9-6-6z" />
                <path d="M5 19l-2 2" />
              </svg>
            </div>
            <h3>Grund- &amp; Bauendreinigung</h3>
            <p>Nach Renovierung, Umbau oder Auszug: gründlich von oben bis unten, besenrein bis bezugsfertig.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 3v1M12 20v1M3 12H2M22 12h-1M5.636 5.636l-.707-.707M19.07 19.07l-.707-.707M5.636 18.364l-.707.707M19.07 4.93l-.707.707" />
                <circle cx="12" cy="12" r="4" />
                <path d="M5 17l14-10M5 7l14 10" />
              </svg>
            </div>
            <h3>PV- &amp; Solaranlagen</h3>
            <p>Professionelle Reinigung von Photovoltaik- und Solarthermie-Anlagen. Mehr Ertrag durch saubere Module — sicher und schonend.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>


          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 3h-1a4 4 0 0 0-4 4v1" />
                <path d="M12 3h1a4 4 0 0 1 4 4v1" />
                <path d="M5 8h14v13H5z" />
                <path d="M9 21v-6h6v6" />
                <path d="M12 11v2M12 14h.01" />
              </svg>
            </div>
            <h3>Praxisreinigung</h3>
            <p>Hygienische Reinigung für Arztpraxen, Zahnarztpraxen und Therapieräume nach RKI-Richtlinien. Diskret, pünktlich und zuverlässig.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 21h18M5 21V9l7-6 7 6v12" />
                <path d="M9 21v-5h6v5" />
                <circle cx="12" cy="11" r="1.5" />
              </svg>
            </div>
            <h3>KITA-Reinigung</h3>
            <p>Kindgerechte Hygiene für Kindergärten und Kitas — täglich, nach Infektionsschutzstandards. Erfahren im Umgang mit besonderen Anforderungen.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

          <div className="svc">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M2 7h20M6 3v4M18 3v4M6 12h.01M10 12h.01M14 12h.01" />
              </svg>
            </div>
            <h3>Fassadenreinigung</h3>
            <p>Schonende Reinigung von Fassaden, Außenwänden und Eingangsbereichen. Grünbelag, Verschmutzungen und Graffiti werden professionell entfernt.</p>
            <a href="#kostenvoranschlag" className="more">Anfragen <ArrowRight /></a>
          </div>

        </div>
      </div>
    </section>
  )
}
