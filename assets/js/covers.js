let uid = 0;

const C = {
  paper: "#F4EFE4",
  paper2: "#EAE3D2",
  ink: "#171310",
  soft: "#6B6353",
  indigo: "#24344F",
  verm: "#D63A1E",
};

function roughDefs(id, seed, scale) {
  return `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}"/></filter>`;
}

function enso() {
  const id = "r" + ++uid;
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>${roughDefs(id, 7, 18)}</defs>
  <rect width="800" height="600" fill="${C.paper}"/>
  <circle cx="400" cy="300" r="185" fill="none" stroke="${C.verm}" stroke-width="36" stroke-linecap="round" pathLength="100" stroke-dasharray="88 12" transform="rotate(-70 400 300)" filter="url(#${id})"/>
</svg>`;
}

function hanko(kanji) {
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.paper}"/>
  <rect x="28" y="28" width="744" height="544" fill="none" stroke="${C.indigo}" stroke-width="3" opacity="0.55"/>
  <text x="320" y="415" font-family="'Shippori Mincho B1',serif" font-weight="800" font-size="300" fill="${C.ink}" text-anchor="middle">${kanji}</text>
  <rect x="545" y="365" width="150" height="150" rx="10" fill="${C.verm}"/>
  <text x="620" y="472" font-family="'Shippori Mincho B1',serif" font-weight="800" font-size="84" fill="${C.paper}" text-anchor="middle">剣</text>
</svg>`;
}

function web(label) {
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.paper}"/>
  <rect x="90" y="100" width="620" height="400" rx="14" fill="#FBF8F0" stroke="${C.ink}" stroke-width="4"/>
  <line x1="90" y1="156" x2="710" y2="156" stroke="${C.ink}" stroke-width="4"/>
  <circle cx="126" cy="128" r="9" fill="${C.ink}"/>
  <circle cx="156" cy="128" r="9" fill="${C.soft}"/>
  <circle cx="186" cy="128" r="9" fill="${C.verm}"/>
  <rect x="230" y="112" width="420" height="32" rx="16" fill="${C.paper2}"/>
  <text x="252" y="134" font-family="'Space Grotesk',sans-serif" font-size="18" fill="${C.soft}">${label}</text>
  <text x="165" y="415" font-family="'Shippori Mincho B1',serif" font-weight="800" font-size="150" fill="${C.indigo}">剣道</text>
  <line x1="470" y1="430" x2="665" y2="225" stroke="${C.verm}" stroke-width="16" stroke-linecap="round"/>
  <line x1="425" y1="455" x2="600" y2="280" stroke="${C.indigo}" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
</svg>`;
}

function shinai() {
  const lines = [0, 1, 2, 3]
    .map((i) => {
      const x1 = 150 + i * 95;
      const x2 = 430 + i * 95;
      const stroke = i === 1 ? C.verm : C.indigo;
      const w = i === 1 ? 22 : 16;
      return `<line x1="${x1}" y1="520" x2="${x2}" y2="80" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${i === 1 ? 1 : 0.85}"/>`;
    })
    .join("");
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.paper}"/>
  ${lines}
  <rect x="620" y="70" width="90" height="90" rx="8" fill="${C.verm}"/>
</svg>`;
}

export function coverHTML(cover) {
  if (!cover) return "";
  if (cover.type === "image") {
    return `<img src="${cover.src}" alt="${cover.alt || ""}" width="${cover.width || 800}" height="${cover.height || 600}" loading="lazy">`;
  }
  const art = cover.art || "enso";
  if (art === "hanko") return hanko(cover.kanji || "創");
  if (art === "web") return web(cover.label || "mon-site.fr");
  if (art === "shinai") return shinai();
  return enso();
}
