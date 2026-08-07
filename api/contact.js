import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "info@nordiva-clean.de";
const FROM_EMAIL = "Nordiva Clean Website <kontakt@nordiva-clean.de>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const stripNewlines = (v) => String(v).replace(/[\r\n]+/g, " ").trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, services, frequency, location, message } =
    req.body || {};

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  const safeName = stripNewlines(name).slice(0, 200);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Neue Anfrage von ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Telefon: ${stripNewlines(phone).slice(0, 100)}`,
        `E-Mail: ${email}`,
        `Leistung: ${services || "—"}`,
        `Häufigkeit: ${frequency || "—"}`,
        `Objektstandort: ${location || "—"}`,
        "",
        "Nachricht:",
        message || "—",
      ].join("\n"),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(502).json({ error: "Failed to send" });
  }
}
