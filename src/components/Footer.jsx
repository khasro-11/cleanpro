export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="logo">
              <span className="mark">N</span>
              <b>Nordiva</b>
              <span>Gebäudereinigung</span>
            </a>
            <p className="foot-note">
              Inhabergeführte Gebäudereinigung aus Bönen. Noch Fragen? Rufen Sie einfach an — Sie sprechen direkt mit dem Inhaber, nicht mit einem Callcenter.
            </p>
          </div>

          <div className="foot-col">
            <h5>Leistungen</h5>
            <a href="#leistungen">Büro &amp; Gewerbe</a>
            <a href="#leistungen">Fenster &amp; Glas</a>
            <a href="#leistungen">Treppenhaus</a>
            <a href="#leistungen">Ferienwohnung</a>
          </div>

          <div className="foot-col">
            <h5>Unternehmen</h5>
            <a href="#vorteile">Vorteile</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#bewertungen">Bewertungen</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="foot-col">
            <h5>Städte</h5>
            <a href="/gebaeudereinigung-boenen/">Bönen</a>
            <a href="/gebaeudereinigung-hamm/">Hamm</a>
            <a href="/gebaeudereinigung-unna/">Unna</a>
            <a href="/gebaeudereinigung-kamen/">Kamen</a>
            <a href="/gebaeudereinigung-bergkamen/">Bergkamen</a>
            <a href="/gebaeudereinigung-luenen/">Lünen</a>
            <a href="/gebaeudereinigung-soest/">Soest</a>
            <a href="/gebaeudereinigung-dortmund/">Dortmund</a>
          </div>

          <div className="foot-col">
            <h5>Kontakt</h5>
            <a href="tel:+4915510057038">0155 1005 7038</a>
            <a href="mailto:info@nordiva-clean.de">info@nordiva-clean.de</a>
            <p>Bahnhofstraße 21<br />59199 Bönen</p>
            <p>Mo – Fr · 08 – 18 Uhr</p>
          </div>
        </div>

        <div className="foot-bottom">
          <p>© 2026 Nordiva Gebäudereinigung</p>
          <div className="foot-legal">
            <a href="/impressum.html">Impressum</a>
            <a href="/datenschutz.html">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
