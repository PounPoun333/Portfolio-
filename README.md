# Portfolio

Site portfolio statique en HTML/CSS/JS vanilla, sans étape de build. Pensé pour être hébergé gratuitement sur GitHub Pages.

## Lancer le site en local

```bash
cd portfolio
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000

## Modifier le contenu

Tout le contenu se trouve dans `assets/js/data.js` :

- `profile` : prénom, nom, rôle, bio, email, liens LinkedIn / Instagram
- `internship` : le stage chez Konst Creative Studio (poste, période, missions)
- `projects` : la liste des réalisations

### Ajouter un projet

Copier un bloc existant dans `projects` et changer les champs :

```js
{
  slug: "mon-affiche",            // identifiant unique, sans espaces
  title: "Affiche — festival",    // titre affiché
  category: "affiche",            // all, site, affiche, rs, video, stage
  year: "2025",
  status: "done",                 // "done" ou "in-progress" (badge « En cours »)
  role: "Création graphique",
  summary: "Une phrase d'accroche.",
  description: "Plusieurs lignes possibles\navec des retours à la ligne.",
  tags: ["Affiche", "Illustration"],
  cover: { type: "svg", art: "shinai" },   // visuel généré : enso, hanko, web, shinai
  // link: "https://...",                  // optionnel : bouton « Voir le projet en ligne »
},
```

### Ajouter ta photo de profil

1. Placer ta photo (carrée de préférence) dans `assets/img/` (ex. `assets/img/photo.jpg`)
2. Dans `data.js`, remplacer `photo: null` par :

```js
photo: { src: "assets/img/photo.jpg", alt: "Portrait de Kaori Panzani" },
```

Sans photo, un placeholder encadré s’affiche à la place.

### Ajouter une vraie image comme visuel de projet

1. Placer l'image dans `assets/img/` (ex. `assets/img/affiche-festival.jpg`)
2. Utiliser ce type de couverture :

```js
cover: { type: "image", src: "assets/img/affiche-festival.jpg", alt: "Affiche du festival", width: 1200, height: 1600 },
```

## Changer la direction artistique

- Couleurs : les variables en haut de `assets/css/style.css` (`:root`) : fond sombre `--bg`, accent bleu électrique `--volt`, section claire `--lavender`, texte `--white`
- Polices : le lien Google Fonts dans `index.html` + les variables `--font-*` dans `style.css` (titres pixel `Silkscreen`, texte `Space Grotesk`, méta `Space Mono`, accents japonais `DotGothic16`)
- Le nom, le texte du hero, la section À propos et le contact viennent de `data.js`

## Déployer sur GitHub Pages

1. Créer un dépôt sur GitHub (par exemple `portfolio`) et y pousser ce dossier à la racine
2. Dans le dépôt : Settings → Pages → Source « Deploy from a branch » → branche `main`, dossier `/ (root)` → Save
3. Le site sera disponible à l'adresse `https://<ton-compte>.github.io/portfolio/`
