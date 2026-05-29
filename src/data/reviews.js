// TODO: echte Reviews einfügen — Texte aus Google Business Profile kopieren.
// WICHTIG: aggregateRating-Schema (in index.html) erst aktivieren, wenn:
//   1. Mindestens 3 Reviews hier stehen und auf der Seite sichtbar sind
//   2. ratingValue dem echten Google-Durchschnitt entspricht
//   3. reviewCount der echten Anzahl entspricht (du hast 14)
// Solange REVIEWS leer ist, wird weder Bewertungsanzahl noch Schema ausgegeben.

export const AGGREGATE = {
  ratingValue: "5.0", // TODO: echten Wert eintragen, z.B. "5.0"
  reviewCount: 14, // TODO: echte Anzahl eintragen, z.B. 14
};

export const REVIEWS = [
  // TODO: Echte Google-Bewertungen einfügen. Vorlage:
  // {
  //   name: 'Vorname N.',          // Nur Vorname + Anfangsbuchstabe (Datenschutz)
  //   role: 'Google-Bewertung',    // oder z.B. "Hausverwaltung, Bönen"
  //   quote: 'Bewertungstext...',  // wörtlich von Google kopieren
  //   stars: 5,
  //   photo: null,                 // optional: URL des öffentlichen Profilfotos
  // },
];
