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
  {
    name: 'Andirena Alhasan',
    role: 'Google-Bewertung',
    quote: 'Zufrieden.. ich kann es nur weiterempfehlen 👍🏼',
    stars: 5,
    photo: null,
  },
  {
    name: 'Torina Dezlar',
    role: 'Google-Bewertung',
    quote: 'Zuverlässig und sauber. Kann ich nur weiterempfehlen.',
    stars: 5,
    photo: null,
  },
  {
    name: 'Gule Hasso',
    role: 'Google-Bewertung',
    quote: 'Ich bin wirklich begeistert vom Service. Die Mitarbeiter waren freundlich, sorgfältig und haben hervorragende Arbeit geleistet. Alles war perfekt sauber und ordentlich. Vielen Dank für die tolle Arbeit – jederzeit gerne wieder!',
    stars: 5,
    photo: null,
  },
];
