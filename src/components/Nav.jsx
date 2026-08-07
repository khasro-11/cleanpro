import { useState, useEffect } from "react";
import PhoneIcon from "./PhoneIcon";
// Nav component with scroll detection and drawer menu for mobile view. It includes links to different sections of the page and a phone contact button. The drawer can be opened and closed, and smooth scrolling is implemented for navigation links.
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const closeAndScrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
      if (el.classList.contains("rv")) el.classList.add("in");
      el.querySelectorAll(".rv").forEach((rv) => rv.classList.add("in"));
    }, 350);
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-in">
          <a href="#top" className="logo">
            <img
              src="/brand/favicon.svg"
              alt=""
              className="mark"
              width="34"
              height="34"
            />
            <b>Nordiva</b>
            <span>Gebäudereinigung</span>
          </a>
          <div className="nav-links">
            <a href="#leistungen">Leistungen</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#vorteile">Vorteile</a>
            <a href="#bewertungen">Bewertungen</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <a href="tel:+4915510057038" className="nav-tel">
              <PhoneIcon size={16} />
              0155 1005 7038
            </a>
            <a
              href="#kostenvoranschlag"
              className="btn btn-green"
              style={{ padding: "11px 20px" }}
            >
              Kostenvoranschlag
            </a>
            <div className="nav-burger" onClick={() => setOpen(true)}>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </nav>

      <div className={`drawer${open ? " open" : ""}`}>
        <button className="x" onClick={close}>
          &times;
        </button>
        <a href="#leistungen" onClick={close}>
          Leistungen
        </a>
        <a href="#ablauf" onClick={close}>
          Ablauf
        </a>
        <a href="#vorteile" onClick={close}>
          Vorteile
        </a>
        <a href="#bewertungen" onClick={close}>
          Bewertungen
        </a>
        <a href="#faq" onClick={close}>
          FAQ
        </a>
        <a
          href="tel:+4915510057038"
          style={{
            color: "var(--green-deep)",
            border: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={close}
        >
          <PhoneIcon size={20} />
          0155 1005 7038
        </a>
        <button
          className="btn btn-green"
          style={{ border: 0, cursor: "pointer", textAlign: "center" }}
          onClick={() => closeAndScrollTo("formcard")}
        >
          Kostenvoranschlag anfordern
        </button>
      </div>
    </>
  );
}
