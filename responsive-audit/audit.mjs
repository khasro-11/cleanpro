import { chromium } from "playwright";
import { mkdirSync } from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const OUT = path.resolve("./responsive-audit");
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "375x812", width: 375, height: 812 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "844x390-landscape", width: 844, height: 390 },
];

// Sections to scroll-capture on the single-page app
const SECTIONS = [
  { name: "hero", selector: "#hero" },
  { name: "leistungen", selector: "#leistungen" },
  { name: "galerie", selector: "#galerie" },
  { name: "ablauf", selector: "#ablauf" },
  { name: "vorteile", selector: "#vorteile" },
  { name: "kontakt", selector: "#kontakt" },
  { name: "footer", selector: "footer" },
];

const findings = [];

function note(section, viewport, severity, description, fix) {
  findings.push({ section, viewport, severity, description, fix });
}

async function run() {
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Viewport: ${vp.name} ===`);
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    // Set mobile UA for small screens so touch events fire
    if (vp.width <= 430) {
      await page.setExtraHTTPHeaders({
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
      });
    }

    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(1200); // framer-motion settle

    // --- CHECK 1: viewport meta ---
    const viewportMeta = await page
      .$eval('meta[name="viewport"]', (el) => el.getAttribute("content"))
      .catch(() => null);
    if (!viewportMeta) {
      note(
        "global",
        vp.name,
        "critical",
        'Missing <meta name="viewport">!',
        'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to index.html',
      );
    }

    // --- CHECK 2: horizontal overflow ---
    const overflow = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    if (overflow) {
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      note(
        "global",
        vp.name,
        "critical",
        `Horizontal overflow detected: body.scrollWidth=${scrollWidth}px, viewport=${innerWidth}px (overflow: ${scrollWidth - innerWidth}px)`,
        "Find elements with fixed pixel widths wider than viewport; add overflow-x:hidden to body if needed.",
      );
    }

    // Full-page screenshot
    await page.screenshot({
      path: `${OUT}/full_${vp.name}.png`,
      fullPage: true,
    });
    console.log(`  Full screenshot saved`);

    // --- Section-level screenshots ---
    for (const sec of SECTIONS) {
      const el = await page.$(sec.selector);
      if (!el) continue;
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await el
        .screenshot({ path: `${OUT}/section_${sec.name}_${vp.name}.png` })
        .catch(() => {});
    }

    // --- CHECK 3: Nav hamburger logic ---
    const hamburger = await page.$(".nav-hamburger");
    const hamburgerVisible = hamburger ? await hamburger.isVisible() : false;
    const desktopLinks = await page.$("nav .hidden");
    const desktopLinksVisible = desktopLinks
      ? await desktopLinks.isVisible()
      : false;

    if (vp.width < 768) {
      if (!hamburgerVisible) {
        note(
          "nav",
          vp.name,
          "critical",
          "Hamburger button not visible on mobile",
          "Check @media (max-width:767px) for .nav-hamburger",
        );
      }
      // Test burger open/close
      if (hamburger) {
        await hamburger.click();
        await page.waitForTimeout(400);
        const mobileMenu = await page.$(".nav-mobile-menu");
        const menuOpen = mobileMenu ? await mobileMenu.isVisible() : false;
        if (!menuOpen) {
          note(
            "nav",
            vp.name,
            "high",
            "Mobile menu does not open when hamburger is clicked",
            "Verify AnimatePresence + open state in Nav.jsx",
          );
        } else {
          console.log(`  Mobile menu opens OK`);
          // Screenshot open menu
          await page.screenshot({ path: `${OUT}/nav_open_${vp.name}.png` });
          // Close it
          await hamburger.click();
          await page.waitForTimeout(400);
          const menuClosed = mobileMenu
            ? !(await mobileMenu.isVisible())
            : true;
          if (!menuClosed) {
            note(
              "nav",
              vp.name,
              "medium",
              "Mobile menu does not close after second hamburger click",
              "Check toggle logic in Nav.jsx",
            );
          }
        }
      }
    } else {
      if (hamburgerVisible) {
        note(
          "nav",
          vp.name,
          "high",
          "Hamburger visible at desktop viewport — should be hidden on md+",
          "Check .nav-hamburger display:none @media (min-width:768px)",
        );
      }
    }

    // --- CHECK 4: touch targets ---
    const smallTargets = await page.evaluate(() => {
      const MIN = 44;
      const results = [];
      const clickables = document.querySelectorAll(
        'a, button, [role="button"]',
      );
      for (const el of clickables) {
        if (!el.offsetParent) continue; // invisible
        const r = el.getBoundingClientRect();
        if ((r.width < MIN || r.height < MIN) && r.width > 0) {
          results.push({
            tag: el.tagName,
            text: (el.textContent || "").trim().slice(0, 40),
            w: Math.round(r.width),
            h: Math.round(r.height),
            class: el.className.toString().slice(0, 60),
          });
        }
      }
      return results;
    });
    if (smallTargets.length > 0 && vp.width <= 768) {
      for (const t of smallTargets) {
        note(
          "touch",
          vp.name,
          "medium",
          `Touch target too small: <${t.tag}> "${t.text}" = ${t.w}×${t.h}px (min 44×44px)`,
          "Increase padding/min-height on small buttons and links for mobile",
        );
      }
    }

    // --- CHECK 5: font sizes on mobile ---
    if (vp.width <= 430) {
      const tinyText = await page.evaluate(() => {
        const MIN_SIZE = 10;
        const results = [];
        const textEls = document.querySelectorAll(
          "p, span, div, label, li, a, h1, h2, h3, h4, h5, h6",
        );
        for (const el of textEls) {
          if (!el.offsetParent || !el.textContent.trim()) continue;
          const size = parseFloat(window.getComputedStyle(el).fontSize);
          if (size < MIN_SIZE && el.getBoundingClientRect().width > 0) {
            results.push({
              tag: el.tagName,
              size,
              text: el.textContent.trim().slice(0, 30),
            });
          }
        }
        return results.slice(0, 10);
      });
      if (tinyText.length > 0) {
        for (const t of tinyText) {
          note(
            "typography",
            vp.name,
            "medium",
            `Font size too small: <${t.tag}> "${t.text}" = ${t.size}px (below 10px threshold)`,
            "Increase minimum font size on mobile to at least 11px",
          );
        }
      }
    }

    // --- CHECK 6: images overflow ---
    const imgOverflow = await page.evaluate(() => {
      const results = [];
      for (const img of document.querySelectorAll("img")) {
        const r = img.getBoundingClientRect();
        if (r.width > window.innerWidth) {
          results.push({ src: img.src.slice(-40), w: Math.round(r.width) });
        }
      }
      return results;
    });
    if (imgOverflow.length > 0) {
      for (const img of imgOverflow) {
        note(
          "images",
          vp.name,
          "critical",
          `Image wider than viewport: ${img.src} = ${img.w}px`,
          "Add max-width:100% and object-fit:cover to images",
        );
      }
    }

    // --- CHECK 7: fixed-px widths causing overflow ---
    const fixedPxOverflow = await page.evaluate(() => {
      const results = [];
      const all = document.querySelectorAll("*");
      for (const el of all) {
        const s = window.getComputedStyle(el);
        const w = s.width;
        const left = el.getBoundingClientRect().left;
        const right = el.getBoundingClientRect().right;
        if (
          right > window.innerWidth + 2 &&
          el.getBoundingClientRect().width > 0
        ) {
          results.push({
            tag: el.tagName,
            cls: el.className?.toString().slice(0, 60),
            w: Math.round(el.getBoundingClientRect().width),
            right: Math.round(right),
          });
        }
      }
      return results.slice(0, 8);
    });
    if (fixedPxOverflow.length > 0) {
      for (const el of fixedPxOverflow) {
        note(
          "layout",
          vp.name,
          "critical",
          `Element extends beyond viewport right edge: <${el.tag}> class="${el.cls}" right=${el.right}px (viewport=${vp.width}px)`,
          "Replace fixed pixel widths with max-width, %, or responsive units",
        );
      }
    }

    // --- CHECK 8: form field stacking on mobile ---
    if (vp.width <= 520) {
      const emailPhoneRow = await page.$(".email-phone-row");
      if (emailPhoneRow) {
        const cols = await page.evaluate((el) => {
          return window.getComputedStyle(el).gridTemplateColumns;
        }, emailPhoneRow);
        if (!cols.includes("1fr") || cols.split(" ").length > 1) {
          // Check if both children are stacked or side-by-side
          const children = await emailPhoneRow.$$(":scope > div");
          if (children.length === 2) {
            const r1 = await children[0].boundingBox();
            const r2 = await children[1].boundingBox();
            if (r1 && r2 && Math.abs(r1.y - r2.y) < 10) {
              note(
                "kontakt",
                vp.name,
                "medium",
                "Email/phone fields are side-by-side at 520px or below — may be too narrow for comfortable input",
                "In Kontakt.jsx @media (max-width:520px) the .email-phone-row should be 1fr — verify the CSS is applying correctly",
              );
            }
          }
        }
      }
    }

    // --- CHECK 9: sticky nav overlap on sections ---
    const heroSection = await page.$("#hero");
    if (heroSection) {
      const heroTop = await heroSection.evaluate(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
      const nav = await page.$("nav");
      if (nav) {
        const navHeight = await nav.evaluate(
          (el) => el.getBoundingClientRect().height,
        );
        // Hero has paddingTop on desktop/mobile - check it's enough
        const heroStyle = await page.evaluate(() => {
          const hero = document.querySelector(
            "#hero .hero-desktop, #hero .hero-mobile",
          );
          return hero ? window.getComputedStyle(hero).paddingTop : null;
        });
        if (heroStyle) {
          const pt = parseInt(heroStyle);
          if (pt < navHeight) {
            note(
              "hero",
              vp.name,
              "medium",
              `Hero section padding-top (${pt}px) may be less than nav height (~${Math.round(navHeight)}px) — content could be hidden under fixed nav`,
              "Increase hero paddingTop to at least match nav height",
            );
          }
        }
      }
    }

    await page.close();
  }

  // --- LANDSCAPE SPECIFIC: also check 844x390 more carefully ---
  console.log("\n=== Extra landscape checks ===");
  const page2 = await browser.newPage();
  await page2.setViewportSize({ width: 844, height: 390 });
  await page2.goto(BASE_URL, { waitUntil: "networkidle" });
  await page2.waitForTimeout(1200);

  // Check hero on landscape — the hero-mobile triggers at <768px but landscape phone is 844px wide!
  const heroDesktopVisible = await page2.evaluate(() => {
    const d = document.querySelector(".hero-desktop");
    return d ? window.getComputedStyle(d).display !== "none" : false;
  });
  const heroMobileVisible = await page2.evaluate(() => {
    const m = document.querySelector(".hero-mobile");
    return m ? window.getComputedStyle(m).display !== "none" : false;
  });
  console.log(
    `  Landscape 844x390: hero-desktop visible=${heroDesktopVisible}, hero-mobile visible=${heroMobileVisible}`,
  );

  if (!heroDesktopVisible && !heroMobileVisible) {
    note(
      "hero",
      "844x390-landscape",
      "critical",
      "Neither hero-desktop nor hero-mobile is visible in landscape mode",
      "Check display logic; at 844px width hero-desktop should show",
    );
  }

  const heroOverflow = await page2.evaluate(
    () => document.body.scrollWidth > window.innerWidth,
  );
  if (heroOverflow) {
    note(
      "hero",
      "844x390-landscape",
      "high",
      `Horizontal overflow in landscape mode: scrollWidth=${document.body.scrollWidth}px`,
      "Check hero bento grid at intermediate widths",
    );
  }

  await page2.screenshot({
    path: `${OUT}/full_844x390-landscape.png`,
    fullPage: false,
  });
  await page2.close();

  await browser.close();

  // --- OUTPUT REPORT ---
  const report = generateReport(findings);
  const fs = await import("fs");
  fs.writeFileSync(`${OUT}/REPORT.md`, report, "utf-8");
  console.log(`\nReport written to responsive-audit/REPORT.md`);
  console.log(`Total findings: ${findings.length}`);
}

function generateReport(findings) {
  const critical = findings.filter((f) => f.severity === "critical");
  const high = findings.filter((f) => f.severity === "high");
  const medium = findings.filter((f) => f.severity === "medium");
  const low = findings.filter((f) => f.severity === "low");

  const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
      const k = item[key];
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    }, {});
  };

  let md = `# Responsive Design Audit — Nordiva Gebäudereinigung
**Datum:** ${new Date().toISOString().split("T")[0]}
**Tech-Stack:** React 18 · Vite · Tailwind CSS (via CDN) · Framer Motion · EmailJS
**Seiten:** Single-Page Application — alle Sektionen auf einer URL (/)
**Getestete Viewports:** 320×568, 375×812, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080, 844×390 (Querformat)
**Tool:** Playwright 1.60 (Chromium)

---

## Übersicht

| Schweregrad | Anzahl |
|-------------|--------|
| 🔴 Kritisch  | ${critical.length} |
| 🟠 Hoch      | ${high.length} |
| 🟡 Mittel    | ${medium.length} |
| 🟢 Gering    | ${low.length} |
| **Gesamt**  | **${findings.length}** |

---

## 🔴 Kritische Probleme

`;

  if (critical.length === 0) {
    md += "_Keine kritischen Probleme gefunden._\n\n";
  } else {
    for (const f of critical) {
      md += `### [${f.section}] @ ${f.viewport}\n**Problem:** ${f.description}\n**Lösung:** ${f.fix}\n\n`;
    }
  }

  md += `## 🟠 Hohe Priorität\n\n`;
  if (high.length === 0) {
    md += "_Keine hohen Prioritäten._\n\n";
  } else {
    for (const f of high) {
      md += `### [${f.section}] @ ${f.viewport}\n**Problem:** ${f.description}\n**Lösung:** ${f.fix}\n\n`;
    }
  }

  md += `## 🟡 Mittlere Priorität\n\n`;
  if (medium.length === 0) {
    md += "_Keine mittleren Prioritäten._\n\n";
  } else {
    for (const f of medium) {
      md += `### [${f.section}] @ ${f.viewport}\n**Problem:** ${f.description}\n**Lösung:** ${f.fix}\n\n`;
    }
  }

  md += `---\n\n## Manuelle Code-Analyse: Zusätzliche Befunde\n\n`;

  md += `### 1. Nav — Desktop-Links immer ausgeblendet (Bug)\n`;
  md += `**Seite/Viewport:** Alle Viewports ≥ 768 px\n`;
  md += `**Schweregrad:** 🔴 Kritisch\n`;
  md += `**Beschreibung:** In \`Nav.jsx\` ist die Desktop-Link-Leiste mit \`style={{ display: 'none' }}\` inline hart codiert. Das \`className="hidden md:flex"\` würde über Tailwind \`display:flex\` setzen, aber die \`style={{}}\`-Eigenschaft überschreibt dies mit höherer Spezifität. Das \`@media (min-width: 768px) { nav .hidden { display: flex !important; } }\` in der \`<style>\`-Regel greift wegen der Inline-Spezifität nicht zuverlässig in allen Browsern, weil Inline-Style-Overrides ohne zusätzliches \`!important\` ignoriert werden — hier klappt es zufällig nur weil das \`!important\` im \`<style>\`-Tag vorhanden ist. Das Design ist fragil.\n`;
  md += `**Datei:** \`src/components/Nav.jsx\` Zeile 43\n`;
  md += `**Lösung:** Entferne \`style={{ display: 'none' }}\` von der Desktop-Link-Div oder verwende nur CSS-Klassen ohne widersprüchliche Inline-Styles.\n\n`;

  md += `### 2. Hero — Zwei separate Layouts (mobile/desktop) mit hartem Switch\n`;
  md += `**Seite/Viewport:** Alle\n`;
  md += `**Schweregrad:** 🟡 Mittel\n`;
  md += `**Beschreibung:** Hero rendert zwei völlig separate DOM-Bäume (\`.hero-desktop\` und \`.hero-mobile\`) und blendet den jeweils anderen per CSS aus. Dadurch werden beide DOM-Bäume immer gerendert (doppelter Speicher, doppelte Animationen). Bei Breakpoint 767 px/768 px gibt es keinen Übergangsbereich — dies könnte bei genau 767/768 px zu Flackern führen.\n`;
  md += `**Datei:** \`src/components/Hero.jsx\` — Bottom \`<style>\` Block\n`;
  md += `**Lösung:** Erwäge ein einziges responsives Layout mit CSS-Grid und clamp()-Werten statt zwei DOM-Bäumen. Kurzfristig: kein Handlungsbedarf, solange keine Animationsperformance-Probleme auftreten.\n\n`;

  md += `### 3. Services — Kein Breakpoint zwischen 768 px und 1023 px für 2-Spalten-Grid\n`;
  md += `**Seite/Viewport:** 768 × 1024 (Tablet)\n`;
  md += `**Schweregrad:** 🟡 Mittel\n`;
  md += `**Beschreibung:** Das Services-Grid hat drei Breakpoints: <768 (1 Spalte), 768–1023 (2 Spalten), ≥1024 (4 Spalten). Bei 768 px ergibt das 2-Spalten-Grid mit 4 Karten zwei Zeilen, was gut aussieht. Zwischen 900 px und 1023 px bleiben es 2 Spalten, was ok aber suboptimal ist (viel Leerraum).\n`;
  md += `**Datei:** \`src/components/Services.jsx\` — \`<style>\` Block Zeile ~130\n`;
  md += `**Lösung:** Optional: Füge einen 3-Spalten-Breakpoint bei ~900 px ein.\n\n`;

  md += `### 4. Kontakt-Formular — Objekt-Kacheln 2×2 auf mobil\n`;
  md += `**Seite/Viewport:** 320×568, 375×812\n`;
  md += `**Schweregrad:** 🟡 Mittel\n`;
  md += `**Beschreibung:** Die Objekt-Typ-Kacheln werden auf Mobilgeräten in einem 2×2-Grid angezeigt (gridTemplateColumns: 'repeat(2, 1fr)'). Bei 320 px Viewport kann das eng werden (~145 px pro Kachel), und der Tap-Bereich der Kacheln mit Icon + Text ist möglicherweise knapp unter 44 px.\n`;
  md += `**Datei:** \`src/components/Kontakt.jsx\` — \`<style>\` @media (max-width: 767px)\n`;
  md += `**Lösung:** Mindesthöhe der Kacheln auf 48 px setzen; alternativ 1×4-Grid auf 320 px verwenden.\n\n`;

  md += `### 5. Vorteile-Grid — Breakpoint-Lücke zwischen 768 px und 900 px\n`;
  md += `**Seite/Viewport:** 768×1024 (Tablet hochkant)\n`;
  md += `**Schweregrad:** 🟡 Mittel\n`;
  md += `**Beschreibung:** Der Vorteile-Grid schaltet bei ≤900 px auf 2 Spalten und bei ≤767 px auf mobile Styles. Bei 768 px–900 px gilt das 2-Spalten-Grid ohne mobile Kompaktierung. Die Trust-Tiles sind 24 px gepadded und sehen bei 768 px gut aus, aber es ist eine Lücke ohne Media Query zwischen ≤767 (mobile) und ≤900 (medium).\n`;
  md += `**Datei:** \`src/components/Vorteile.jsx\` — \`<style>\`\n`;
  md += `**Lösung:** Definiere explizit @media (min-width: 768px) and (max-width: 900px) für konsistentes Padding.\n\n`;

  md += `### 6. StickyMobileCTA — Nicht im Audit erfasst, muss manuell geprüft werden\n`;
  md += `**Seite/Viewport:** Mobil\n`;
  md += `**Schweregrad:** 🟠 Hoch\n`;
  md += `**Beschreibung:** Die Komponente \`StickyMobileCTA.jsx\` existiert im Projekt aber wird in \`App.jsx\` nicht importiert und damit nicht gerendert. Unklar ob das beabsichtigt ist oder vergessen wurde.\n`;
  md += `**Datei:** \`src/components/StickyMobileCTA.jsx\`, \`src/App.jsx\`\n`;
  md += `**Lösung:** Prüfen ob StickyMobileCTA verwendet werden soll. Falls ja, in App.jsx einbinden.\n\n`;

  md += `### 7. Referenzen-Sektion — leer, Tailwind-Klassen statt Custom-CSS\n`;
  md += `**Seite/Viewport:** Alle\n`;
  md += `**Schweregrad:** 🟢 Gering\n`;
  md += `**Beschreibung:** Die Referenzen-Komponente nutzt Tailwind-Klassen (z.B. teal-600, sm:grid-cols-2) aber das übrige Design nutzt ausschließlich Inline-Styles mit Custom-Farben. Die testimonials[] und logos[] Arrays sind leer — die Sektion zeigt nur einen Titel und einen Untertitel.\n`;
  md += `**Datei:** \`src/components/Referenzen.jsx\`\n`;
  md += `**Lösung:** Entweder befüllen oder die Sektion bis zur Befüllung ausblenden, da sie aktuell einen unvollständigen Eindruck macht.\n\n`;

  md += `### 8. Galerie — galerie-quote Bild-Overlay könnte bei sehr kleinen Screens Texte verdecken\n`;
  md += `**Seite/Viewport:** 320×568\n`;
  md += `**Schweregrad:** 🟡 Mittel\n`;
  md += `**Beschreibung:** Das Quote-Tile in der Galerie zeigt ein Hintergrundbild mit Gradient-Overlay und Text. Bei 320 px ist das Tile im 1-Spalten-Grid sehr schmal und der Quote-Text "Dieselben Gesichter, jede Woche." (18 px) könnte umbrechen und den Container strecken.\n`;
  md += `**Datei:** \`src/components/Galerie.jsx\` — .galerie-quote @media (max-width: 767px)\n`;
  md += `**Lösung:** Setze min-height auf die Quote-Box oder verkleinere den Font auf 320 px explizit.\n\n`;

  md += `### 9. Footer — padding-left/right auf mobil fehlt\n`;
  md += `**Seite/Viewport:** 320×568, 375×812\n`;
  md += `**Schweregrad:** 🟢 Gering\n`;
  md += `**Beschreibung:** Footer hat @media (max-width: 767px) { .footer-inner { padding: 0 20px 40px !important; } }. Das top-padding ist 0, was bedeutet der Divider-Strich direkt am Beginn des Footers ist bündig an der obigen Sektion ohne Abstand.\n`;
  md += `**Datei:** \`src/components/Footer.jsx\` — \`<style>\`\n`;
  md += `**Lösung:** Füge padding-top: 24px im mobilen Footer hinzu.\n\n`;

  md += `### 10. index.html / Vite-Output — meta viewport prüfen\n`;
  md += `**Seite/Viewport:** Alle\n`;
  md += `**Schweregrad:** 🔴 Kritisch (wenn fehlend)\n`;
  md += `**Beschreibung:** Das Playwright-Audit prüft ob \`<meta name="viewport">\` im gerenderten DOM vorhanden ist. Dies muss in index.html definiert sein.\n`;
  md += `**Datei:** \`index.html\`\n`;
  md += `**Lösung:** Sicherstellen dass \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` in index.html vorhanden ist.\n\n`;

  md += `---\n\n## Gesamteinschätzung\n\n`;
  md += `Das Responsive Design ist **grundsätzlich durchdacht** — es gibt separate Mobile/Desktop-Layouts für Hero, durchdachte Media Queries in den meisten Komponenten, und ein funktionierendes Burger-Menü. Die größten Probleme sind:\n\n`;
  md += `1. **Strukturelles Problem im Nav:** Inline-Style \`display:none\` vs. CSS-!important-Override ist fragil und schwer wartbar.\n`;
  md += `2. **Lücken in den Breakpoints:** Zwischen 768–900 px (Vorteile) und 900–1023 px (Services) gibt es Bereiche ohne expliziten Media-Query-Schutz.\n`;
  md += `3. **StickyMobileCTA** wird nicht gerendert — möglicherweise vergessen.\n`;
  md += `4. **Referenzen-Sektion** ist leer und sieht unfertig aus.\n\n`;
  md += `Wenn horizontales Scrolling oder Overflow-Probleme vom Playwright-Lauf gemeldet werden, haben diese höchste Priorität.\n\n`;

  md += `---\n\n## Priorisierte To-do-Liste\n\n`;
  md += `### 🔴 Sofort (Kritisch)\n`;
  md += `- [ ] \`index.html\`: Viewport Meta-Tag verifizieren\n`;
  md += `- [ ] \`Nav.jsx:43\`: Inline-Style \`display:none\` auf Desktop-Links entfernen oder mit !important CSS korrekt überschreiben\n`;
  md += `- [ ] Horizontales Scrollen beheben falls vom Playwright-Lauf gemeldet\n\n`;
  md += `### 🟠 Hoch (Diese Woche)\n`;
  md += `- [ ] \`App.jsx\`: Klären ob StickyMobileCTA eingebunden werden soll\n`;
  md += `- [ ] \`Referenzen.jsx\`: Sektion befüllen oder vorübergehend ausblenden\n\n`;
  md += `### 🟡 Mittel (Nächstes Sprint)\n`;
  md += `- [ ] \`Services.jsx\`: Optionaler 3-Spalten-Breakpoint bei ~900 px\n`;
  md += `- [ ] \`Vorteile.jsx\`: Expliziter Breakpoint-Block für 768–900 px\n`;
  md += `- [ ] \`Kontakt.jsx\`: Objekt-Kacheln Mindesthöhe auf 48 px setzen\n`;
  md += `- [ ] \`Galerie.jsx\`: Quote-Tile bei 320 px explizit testen und ggf. Fontgröße reduzieren\n\n`;
  md += `### 🟢 Gering (Backlog)\n`;
  md += `- [ ] \`Footer.jsx\`: padding-top: 24px auf Mobil hinzufügen\n`;
  md += `- [ ] \`Hero.jsx\`: Langfristig auf ein einziges responsives Layout refaktorieren\n`;

  return md;
}

run().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
