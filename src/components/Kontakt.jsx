import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { DayPicker } from "react-day-picker";
import { de } from "date-fns/locale";
import "react-day-picker/style.css";
import { fadeUp, stagger, viewport } from "../utils/animations";

const EMAILJS_SERVICE =
  import.meta.env.VITE_EMAILJS_SERVICE || "service_b5s1o4r";
const EMAILJS_TEMPLATE =
  import.meta.env.VITE_EMAILJS_TEMPLATE || "template_fxi5j53";
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_KEY || "pMvYvsy9XX0St2gjU";

const INK = "#0e1f33";
const INK_SOFT = "#3a4a5e";
const NAVY = "#1f3a5f";
const SKY = "#7fb3d5";
const PAPER = "#f5f7f8";
const LINE = "rgba(14,31,51,0.10)";

function Icon({ name, size = 18, color = NAVY }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "phone":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24C17.53 15.37 18.73 15.57 20 15.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.6 10.8z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="1" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="16" y1="3" x2="16" y2="7" />
        </svg>
      );
    case "building":
      return (
        <svg {...p}>
          <rect x="4" y="3" width="16" height="18" />
          <line x1="9" y1="7" x2="9" y2="9" />
          <line x1="13" y1="7" x2="13" y2="9" />
          <line x1="9" y1="12" x2="9" y2="14" />
          <line x1="13" y1="12" x2="13" y2="14" />
          <rect x="10" y="17" width="4" height="4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" />
        </svg>
      );
    case "key":
      return (
        <svg {...p}>
          <circle cx="8" cy="14" r="4" />
          <line x1="11" y1="11" x2="20" y2="2" />
          <line x1="17" y1="5" x2="20" y2="8" />
          <line x1="14" y1="8" x2="17" y2="11" />
        </svg>
      );
    case "spray":
      return (
        <svg {...p}>
          <rect x="7" y="9" width="9" height="12" rx="1" />
          <path d="M9 9V5h5v4" />
          <path d="M14 5h4M14 3h4M14 7h4" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M4 12l5 5 11-12" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...p}>
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </svg>
      );
    default:
      return null;
  }
}

const objectTypes = [
  { id: "Büro", label: "Büro", icon: "building" },
  { id: "Arztpraxis", label: "Arztpraxis", icon: "shield" },
  { id: "Airbnb", label: "Airbnb", icon: "key" },
  { id: "Andere", label: "Andere", icon: "spray" },
];

function CalendarIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      stroke={NAVY} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="1"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <line x1="8" y1="3" x2="8" y2="7"/>
      <line x1="16" y1="3" x2="16" y2="7"/>
    </svg>
  );
}

function DatePickerField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const ref = useRef(null);

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const formatted = selected
    ? selected.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  const handleSelect = (date) => {
    setSelected(date);
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      onChange(`${d}.${m}.${y}`);
    } else {
      onChange("");
    }
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="form-input datepicker-btn"
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", width: "100%", textAlign: "left",
          color: selected ? INK : "#9aabbc",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        <span style={{ fontSize: 14 }}>{formatted ?? "Datum auswählen …"}</span>
        <CalendarIcon />
      </button>

      {open && (
        <div className="datepicker-popup" style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 200,
          background: PAPER,
          borderRadius: 18,
          boxShadow: "0 2px 8px rgba(14,31,51,0.06), 0 16px 48px rgba(14,31,51,0.14)",
          border: "1px solid rgba(14,31,51,0.08)",
          padding: "12px 8px 8px",
        }}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={de}
            weekStartsOn={1}
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          flexShrink: 0,
          background: "rgba(245,247,248,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 3px rgba(14,31,51,0.08)",
        }}
      >
        <Icon name={icon} size={18} color={NAVY} />
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(14,31,51,0.60)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{value}</div>
      </div>
    </div>
  );
}

export default function Kontakt() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    telefon: "",
    flaeche: "",
    frequenz: "",
    starttermin: "",
    nachricht: "",
  });
  const [objekt, setObjekt] = useState("Büro");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          from_email: form.email,
          from_phone: form.telefon || "—",
          object_type: objekt,
          flaeche: form.flaeche || "—",
          frequenz: form.frequenz || "—",
          starttermin: form.starttermin || "—",
          message: form.nachricht || "—",
          submitted_at: new Date().toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        },
        EMAILJS_KEY,
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(err?.text || err?.message || "Fehler beim Senden");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kontakt" style={{ background: "#f5f7f8" }}>
      <div
        className="kontakt-outer"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}
      >
        <div
          className="kontakt-card"
          style={{ borderRadius: 28, background: SKY }}
        >
          {/* Heading */}
          <motion.div
            className="kontakt-heading"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: NAVY,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
              variants={fadeUp}
            >
              Kontakt
            </motion.div>
            <motion.h2
              style={{
                fontSize: "clamp(28px, 2.8vw, 44px)",
                fontWeight: 800,
                margin: "6px 0 0",
                letterSpacing: "-0.035em",
                color: INK,
                lineHeight: 1.0,
              }}
              variants={fadeUp}
              className="kontakt-h2"
            >
              Lassen Sie uns reden.
            </motion.h2>
            <motion.p
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                color: "rgba(14,31,51,0.75)",
                marginTop: 12,
                maxWidth: 380,
              }}
              variants={fadeUp}
              className="kontakt-subp"
            >
              60-Sekunden-Anfrage, kostenlose Besichtigung innerhalb von 48
              Stunden. Kein Vertrag, keine Verpflichtung.
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="kontakt-form"
            style={{
              background: PAPER,
              borderRadius: 20,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={viewport}
          >
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                className="kontakt-form-inner"
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {/* Object type selector */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: INK_SOFT,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Welches Objekt?
                  </div>
                  <div
                    className="object-tiles"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 6,
                    }}
                  >
                    {objectTypes.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        className="kontakt-tile"
                        onClick={() => setObjekt(o.id)}
                        style={{
                          padding: "8px 6px",
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          background: objekt === o.id ? INK : "transparent",
                          color: objekt === o.id ? PAPER : INK,
                          border: `1.5px solid ${objekt === o.id ? INK : LINE}`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          fontFamily: "Manrope, sans-serif",
                        }}
                      >
                        <Icon
                          name={o.icon}
                          size={18}
                          color={objekt === o.id ? SKY : NAVY}
                        />
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Qualifying fields: Fläche + Frequenz */}
                <div
                  className="qualify-row"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
                >
                  <div>
                    <label
                      htmlFor="flaeche"
                      style={{
                        display: "block", fontSize: 11, fontWeight: 700,
                        color: INK_SOFT, letterSpacing: "0.1em",
                        textTransform: "uppercase", marginBottom: 6,
                      }}
                    >
                      Objektgröße
                    </label>
                    <select
                      id="flaeche"
                      value={form.flaeche}
                      onChange={update}
                      className="form-input"
                      style={{ appearance: "none", cursor: "pointer" }}
                    >
                      <option value="">Bitte wählen …</option>
                      <option value="Unter 100 m²">Unter 100 m²</option>
                      <option value="100 – 250 m²">100 – 250 m²</option>
                      <option value="250 – 500 m²">250 – 500 m²</option>
                      <option value="Über 500 m²">Über 500 m²</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="frequenz"
                      style={{
                        display: "block", fontSize: 11, fontWeight: 700,
                        color: INK_SOFT, letterSpacing: "0.1em",
                        textTransform: "uppercase", marginBottom: 6,
                      }}
                    >
                      Frequenz
                    </label>
                    <select
                      id="frequenz"
                      value={form.frequenz}
                      onChange={update}
                      className="form-input"
                      style={{ appearance: "none", cursor: "pointer" }}
                    >
                      <option value="">Bitte wählen …</option>
                      <option value="Einmalig">Einmalig</option>
                      <option value="Wöchentlich">Wöchentlich</option>
                      <option value="2× pro Woche">2× pro Woche</option>
                      <option value="Täglich">Täglich</option>
                    </select>
                  </div>
                </div>

                {/* Wunsch-Starttermin */}
                <div>
                  <div
                    style={{
                      fontSize: 11, fontWeight: 700,
                      color: INK_SOFT, letterSpacing: "0.1em",
                      textTransform: "uppercase", marginBottom: 6,
                    }}
                  >
                    Wunsch-Starttermin (optional)
                  </div>
                  <DatePickerField
                    value={form.starttermin}
                    onChange={(val) => setForm((f) => ({ ...f, starttermin: val }))}
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: INK_SOFT,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Maria Holtz"
                    required
                    value={form.name}
                    onChange={update}
                    className="form-input"
                  />
                </div>

                {/* Email + Phone */}
                <div
                  className="email-phone-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 700,
                        color: INK_SOFT,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      E-Mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="m.holtz@beispiel.de"
                      required
                      value={form.email}
                      onChange={update}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefon"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 700,
                        color: INK_SOFT,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Telefon
                    </label>
                    <input
                      id="telefon"
                      type="tel"
                      placeholder="030 ·"
                      required
                      value={form.telefon}
                      onChange={update}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="nachricht"
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: INK_SOFT,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Worum geht's?
                  </label>
                  <textarea
                    id="nachricht"
                    rows={3}
                    placeholder="Kurz: Objekt, Größe, gewünschte Frequenz…"
                    value={form.nachricht}
                    onChange={update}
                    className="form-input"
                    style={{ resize: "none", minHeight: 60 }}
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    opacity: 0,
                  }}
                />

                {/* GDPR */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 12,
                    color: INK_SOFT,
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1.5px solid ${LINE}`,
                      background: INK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="check" size={12} color={PAPER} />
                  </div>
                  Ich stimme der{" "}
                  <u style={{ cursor: "pointer", marginLeft: 4 }}>
                    Datenschutzerklärung
                  </u>{" "}
                  zu.
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  className="kontakt-submit"
                  style={{
                    padding: "11px 16px",
                    marginTop: 4,
                    background: INK,
                    color: PAPER,
                    border: "none",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: sending ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    fontFamily: "Manrope, sans-serif",
                    opacity: sending ? 0.6 : 1,
                  }}
                  whileHover={sending ? {} : { scale: 1.02, y: -1 }}
                  whileTap={sending ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {sending ? (
                    "Wird gesendet…"
                  ) : (
                    <>
                      Festpreisangebot in 24h erhalten{" "}
                      <Icon name="arrow" size={16} color={PAPER} />
                    </>
                  )}
                </motion.button>

                {error && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "#ef4444",
                      textAlign: "center",
                    }}
                  >
                    Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
                  </p>
                )}

                <p
                  style={{ fontSize: 12, color: INK_SOFT, textAlign: "center" }}
                >
                  Antwort innerhalb von 4 Stunden — werktags.
                </p>
              </form>
            ) : (
              <motion.div
                style={{ textAlign: "center", padding: "32px 0" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: SKY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 16,
                    delay: 0.1,
                  }}
                >
                  <Icon name="check" size={24} color={INK} />
                </motion.div>
                <h4
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: INK,
                    marginBottom: 8,
                  }}
                >
                  Vielen Dank!
                </h4>
                <p style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.6 }}>
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb
                  von 4 Stunden.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="kontakt-info"
            style={{
              background: "rgba(14,31,51,0.10)",
              borderRadius: 16,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <ContactRow
              icon="phone"
              label="Telefon"
              value="+49 155 1005 7038"
            />
            <ContactRow
              icon="calendar"
              label="Sprechzeit"
              value="Mo–Fr · 08:00 – 18:00"
            />
            <ContactRow
              icon="building"
              label="Adresse"
              value="Bahnhofstraße 21, 59199 Bönen"
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Date Picker ── */
        .datepicker-btn { background: #f5f7f8; border: 1px solid rgba(14,31,51,0.10); border-radius: 10px; padding: 12px 14px; }
        .datepicker-popup { min-width: 300px; }
        .datepicker-popup .rdp-root {
          --rdp-accent-color: #1f3a5f;
          --rdp-accent-background-color: rgba(31,58,95,0.08);
          --rdp-day-font: 600 13px/1 'Manrope', sans-serif;
          --rdp-day_button-width: 36px;
          --rdp-day_button-height: 36px;
          --rdp-selected-border: none;
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
        }
        .datepicker-popup .rdp-month_caption { font-weight: 800; font-size: 14px; color: #0e1f33; padding-bottom: 8px; }
        .datepicker-popup .rdp-weekday { font-size: 11px; font-weight: 700; color: #3a4a5e; letter-spacing: 0.05em; text-transform: uppercase; }
        .datepicker-popup .rdp-day_button { border-radius: 8px; font-weight: 600; color: #0e1f33; }
        .datepicker-popup .rdp-day_button:hover:not([disabled]) { background: rgba(31,58,95,0.08); }
        .datepicker-popup .rdp-selected .rdp-day_button { background: #1f3a5f !important; color: #f5f7f8 !important; font-weight: 700; }
        .datepicker-popup .rdp-today .rdp-day_button { color: #1f3a5f; font-weight: 800; }
        .datepicker-popup .rdp-disabled .rdp-day_button { color: rgba(14,31,51,0.25); }
        .datepicker-popup .rdp-nav button { border-radius: 8px; color: #1f3a5f; }
        .datepicker-popup .rdp-nav button:hover { background: rgba(31,58,95,0.08); }

        /* Desktop: grid areas */
        @media (min-width: 768px) {
          .kontakt-outer { padding: 0 40px !important; }
          .kontakt-card {
            display: grid;
            grid-template-columns: 1fr 1.05fr;
            grid-template-rows: auto 1fr;
            grid-template-areas:
              "heading form"
              "info    form";
            column-gap: 40px;
            row-gap: 0;
            padding: 8px 40px;
          }
          .kontakt-heading { grid-area: heading; align-self: start; }
          .kontakt-form    { grid-area: form; }
          .kontakt-info    { grid-area: info; align-self: end; margin-top: 8px; }
          .kontakt-h2 { font-size: clamp(28px, 2.8vw, 44px) !important; }
          .kontakt-subp { font-size: 14px !important; }
          .object-tiles { grid-template-columns: repeat(4, 1fr) !important; }
        }

        /* Mobile: stack email/phone and qualify row vertically */
        @media (max-width: 520px) {
          .email-phone-row { grid-template-columns: 1fr !important; }
          .qualify-row { grid-template-columns: 1fr !important; }
        }

        /* Mobile: label spacing */
        @media (max-width: 767px) {
          .kontakt-form-inner label,
          .kontakt-form-inner > div > div:first-child {
            margin-bottom: 3px !important;
            font-size: 10px !important;
          }
        }

        /* Mobile: flex column with reordering */
        @media (max-width: 767px) {
          .kontakt-outer { padding: 0 8px !important; }
          .kontakt-card {
            display: flex;
            flex-direction: column;
            padding: 10px;
            gap: 6px;
            border-radius: 16px !important;
          }
          .kontakt-heading { order: 1; }
          .kontakt-form    { order: 2; padding: 10px !important; gap: 6px !important; border-radius: 14px !important; }
          .kontakt-info    { order: 3; padding: 10px !important; gap: 10px !important; border-radius: 12px !important; }
          .kontakt-h2 { font-size: 18px !important; margin-top: 4px !important; }
          .kontakt-subp { font-size: 11px !important; margin-top: 4px !important; line-height: 1.4 !important; }
          .object-tiles { grid-template-columns: repeat(4, 1fr) !important; gap: 4px !important; }
          .kontakt-tile { padding: 6px 4px !important; font-size: 10px !important; border-radius: 7px !important; gap: 3px !important; }
          .kontakt-form-inner { gap: 7px !important; }
          .kontakt-submit { padding: 9px 12px !important; font-size: 12px !important; margin-top: 0 !important; border-radius: 9px !important; }
          .form-input { padding: 7px 9px !important; font-size: 12px !important; border-radius: 8px !important; }
        }
      `}</style>
    </section>
  );
}
