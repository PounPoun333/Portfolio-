export const profile = {
  firstName: "Kaori",
  lastName: "Panzani",
  role: "Communication digitale & création multimédia",
  statusLine: "open to stage & missions",
  tagline:
    "Assistante en communication digitale et création multimédia pendant mon premier stage chez Konst Creative Studio. Ici, je rassemble ce que j’ai créé, et ce que je crée encore.",
  bio:
    "Étudiante en communication digitale et création multimédia, j’ai réalisé mon premier stage chez Konst Creative Studio, où j’ai créé des contenus pour les réseaux sociaux, des visuels et des vidéos. J’aime donner une vraie voix aux marques, avec des idées simples et bien exécutées.",
  email: "prenom.nom@email.com",
  linkedin: "https://www.linkedin.com/in/ton-profil",
  instagram: "https://www.instagram.com/ton.compte",
  photo: null,
  skills: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Figma", "Canva", "HTML / CSS"],
};

export const internship = {
  company: "Konst Creative Studio",
  role: "Assistante communication digitale & création multimédia",
  period: "2025",
  missions: [
    "Gestion des réseaux sociaux : création de posts et planning éditorial",
    "Création de visuels et d’affiches",
    "Montage vidéo, formats courts",
    "Community management et réponses aux commentaires",
  ],
};

export const categories = [
  { id: "all", label: "Tout" },
  { id: "site", label: "Sites web" },
  { id: "affiche", label: "Affiches" },
  { id: "rs", label: "Réseaux sociaux" },
  { id: "video", label: "Vidéo" },
  { id: "stage", label: "Stage & pro" },
];

export const projects = [
  {
    slug: "konst-creative-studio",
    title: "Stage — Konst Creative Studio",
    category: "stage",
    year: "2025",
    status: "done",
    role: "Assistante communication digitale & création multimédia",
    summary:
      "Mes premières réalisations professionnelles : réseaux sociaux, visuels et vidéos pour les clients du studio.",
    description:
      "Pendant ce stage, j’ai participé à la communication digitale du studio au quotidien. Remplace ce texte par tes réalisations concrètes (exemples ci-dessous).\n\nÀ compléter : ce que tu as fait, ce que tu as appris, un résultat chiffré si tu en as un.",
    tags: ["Réseaux sociaux", "Visuels", "Montage vidéo", "Community management"],
    cover: { type: "svg", art: "hanko", kanji: "創" },
  },
  {
    slug: "site-club-kendo",
    title: "Site du club de kendo",
    category: "site",
    year: "2025",
    status: "in-progress",
    role: "Design & développement",
    summary:
      "Le site vitrine de mon club de kendo : présentation du club, horaires des entraînements, galerie et actualités.",
    description:
      "Je réalise actuellement ce site en parallèle de mes cours. Il est encore en cours de réalisation, il arrivera ici dès qu’il sera en ligne.\n\nÀ compléter : les pages prévues, les technos utilisées, ta démarche.",
    tags: ["Web design", "Intégration", "En cours"],
    cover: { type: "svg", art: "web", label: "club-kendo.fr" },
  },
];
