import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE =
  import.meta.env.VITE_EMAILJS_SERVICE || "service_b5s1o4r";
const EMAILJS_TEMPLATE =
  import.meta.env.VITE_EMAILJS_TEMPLATE || "template_fxi5j53";
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_KEY || "pMvYvsy9XX0St2gjU";

const SERVICES = [
  "Büroreinigung",
  "Fenster & Glas",
  "Treppenhaus",
  "Ferienwohnung",
  "Grundreinigung",
];
const FREQUENCIES = [
  "Einmalig",
  "Wöchentlich",
  "Mehrmals wöchentlich",
  "Täglich",
  "Monatlich",
  "Noch unklar",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export default function Kostenvoranschlag() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(["Büroreinigung"]);
  const [selectedFreq, setSelectedFreq] = useState("");
  const [form, setForm] = useState({
    name: "",
    tel: "",
    email: "",
    ort: "",
    nachricht: "",
    consent: false,
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const TOTAL = 3;

  const toggleService = (v) => {
    setSelectedServices((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  };

  const handleNext = async () => {
    if (step < TOTAL) {
      setStep((s) => s + 1);
      return;
    }
    // validate step 3
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.tel.trim()) e.tel = true;
    if (!form.consent) e.consent = true;
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email || "—",
          from_phone: form.tel,
          object_type: selectedServices.join(", ") || "—",
          frequenz: selectedFreq || "—",
          flaeche: form.ort || "—",
          starttermin: "—",
          message: form.nachricht || "—",
          submitted_at: new Date().toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        },
        EMAILJS_KEY,
      );
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kostenvoranschlag" className="quote">
      <div className="wrap">
        <div className="quote-grid">
          <div className="quote-aside rv">
            <span className="eyebrow">Kostenvoranschlag</span>
            <h2>In unter 2 Minuten zum Angebot.</h2>
            <p>
              Sagen Sie uns, was Sie brauchen — wir melden uns werktags
              innerhalb von 4 Stunden mit einem unverbindlichen Vorschlag.
            </p>
            <div className="qa-item">
              <div className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <div>
                <b>Kostenlos &amp; unverbindlich</b>
                <span>Kein Vertrag, keine Verpflichtung.</span>
              </div>
            </div>
            <div className="qa-item">
              <div className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <b>Antwort in &lt; 4 Stunden</b>
                <span>Werktags von 8 bis 18 Uhr.</span>
              </div>
            </div>
            <div
              className="qa-item"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <div className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <b>Direkt vor Ort</b>
                <span>
                  Bönen, Hamm, Unna, Kamen, Bergkamen, Lünen, Soest, Dortmund.
                </span>
              </div>
            </div>
          </div>

          <div id="formcard" className="formcard rv">
            {/* Steps bar */}
            <div className="steps-bar">
              {[1, 2, 3].map((n, i) => (
                <div
                  key={n}
                  className={`sb${step === n ? " active" : ""}${step > n ? " done" : ""}`}
                  style={{ flex: 1 }}
                >
                  <span className="dot">{n}</span>
                  <span className="lab">
                    {["Leistung", "Häufigkeit", "Kontakt"][i]}
                  </span>
                  {n < 3 && <span className="bar" />}
                </div>
              ))}
            </div>

            {!done ? (
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Step 1 */}
                <div
                  className={`panel${step === 1 ? " show" : ""}`}
                  data-panel="1"
                >
                  <h4>Welche Leistung brauchen Sie?</h4>
                  <p className="ph">Mehrfachauswahl möglich.</p>
                  <div className="opt-grid">
                    {SERVICES.map((v) => (
                      <div
                        key={v}
                        className={`opt${selectedServices.includes(v) ? " on" : ""}`}
                        onClick={() => toggleService(v)}
                      >
                        <span className="box">
                          <CheckIcon />
                        </span>
                        {v}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`panel${step === 2 ? " show" : ""}`}
                  data-panel="2"
                >
                  <h4>Wie oft brauchen Sie den Service?</h4>
                  <p className="ph">Bitte einmal auswählen.</p>
                  <div className="opt-grid">
                    {FREQUENCIES.map((v, i) => (
                      <div
                        key={v}
                        className={`opt radio${selectedFreq === v ? " on" : ""}`}
                        onClick={() => setSelectedFreq(v)}
                      >
                        <span className="box">
                          <CheckIcon />
                        </span>
                        {
                          [
                            "Einmalig",
                            "1× pro Woche",
                            "Mehrmals / Woche",
                            "Täglich",
                            "Monatlich",
                            "Noch unklar",
                          ][i]
                        }
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`panel${step === 3 ? " show" : ""}`}
                  data-panel="3"
                >
                  <h4>Wohin dürfen wir antworten?</h4>
                  <p className="ph">
                    Wir melden uns werktags in unter 4 Stunden.
                  </p>
                  <div className="row2">
                    <div className="field">
                      <label>
                        Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Vor- und Nachname"
                        value={form.name}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, name: e.target.value }));
                          setErrors((r) => ({ ...r, name: false }));
                        }}
                        style={errors.name ? { borderColor: "#d8543e" } : {}}
                      />
                    </div>
                    <div className="field">
                      <label>
                        Telefon <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="für den Rückruf"
                        value={form.tel}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, tel: e.target.value }));
                          setErrors((r) => ({ ...r, tel: false }));
                        }}
                        style={errors.tel ? { borderColor: "#d8543e" } : {}}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label>E-Mail</label>
                    <input
                      type="email"
                      placeholder="name@beispiel.de"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Objektstandort</label>
                    <input
                      type="text"
                      placeholder="z. B. Bönen, Bahnhofstraße"
                      value={form.ort}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, ort: e.target.value }))
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Ihre Nachricht</label>
                    <textarea
                      placeholder="Erzählen Sie kurz, worum es geht …"
                      value={form.nachricht}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, nachricht: e.target.value }))
                      }
                    />
                  </div>
                  <label
                    className="consent"
                    style={errors.consent ? { color: "#d8543e" } : {}}
                  >
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, consent: e.target.checked }));
                        setErrors((r) => ({ ...r, consent: false }));
                      }}
                    />
                    <span>
                      Ich habe die{" "}
                      <a
                        href="/datenschutz.html"
                        style={{ color: "var(--green-deep)", fontWeight: 700 }}
                      >
                        Datenschutzerklärung
                      </a>{" "}
                      zur Kenntnis genommen und akzeptiere sie.
                    </span>
                  </label>
                </div>

                <div className="panel-nav">
                  <button
                    className={`back${step > 1 ? " show" : ""}`}
                    onClick={() => setStep((s) => s - 1)}
                    type="button"
                  >
                    ← Zurück
                  </button>
                  <button
                    type="button"
                    className="btn btn-green"
                    onClick={handleNext}
                    disabled={sending}
                  >
                    {sending
                      ? "Wird gesendet…"
                      : step === TOTAL
                        ? "Anfrage absenden"
                        : "Weiter →"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="form-done show">
                <div className="check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4>Vielen Dank — angekommen!</h4>
                <p>
                  Ihre Anfrage ist bei uns eingegangen. Sie hören werktags
                  innerhalb von 4 Stunden persönlich von uns.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
