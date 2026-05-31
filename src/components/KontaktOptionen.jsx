export default function KontaktOptionen() {
  return (
    <section id="kontakt">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Weitere Kontaktmöglichkeiten</span>
          <h2>Lieber direkt? Kein Problem.</h2>
          <p>
            Ob telefonisch, per E-Mail oder WhatsApp — Sie erreichen uns auf dem
            Weg, der Ihnen am liebsten ist.
          </p>
        </div>
        <div className="kopt-grid rv">
          <a href="tel:+4915510057038" className="kopt">
            <div className="ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
              </svg>
            </div>
            <b>Anrufen</b>
            <p>
              0155 1005 7038 — Mo–Fr, 8–18 Uhr. Sie sprechen direkt mit dem
              Inhaber.
            </p>
          </a>

          <a href="mailto:info@nordiva-clean.de" className="kopt">
            <div className="ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </div>
            <b>E-Mail</b>
            <p>
              info@nordiva-clean.de — schreiben Sie uns jederzeit, wir antworten
              zügig.
            </p>
          </a>

          <a href="#kostenvoranschlag" className="kopt">
            <div className="ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M8 7h8M8 11h8M8 15h5" />
              </svg>
            </div>
            <b>Rückruf buchen</b>
            <p>
              Lieber zurückrufen lassen? Hinterlassen Sie Ihre Nummer im
              Formular.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
