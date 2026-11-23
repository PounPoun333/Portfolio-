let uid = 0;

const C = {
  bg: "#0A0A0C",
  bg2: "#131318",
  white: "#F4F4F0",
  gray: "#9A9AA3",
  volt: "#00B4FF",
  lavender: "#E6E6FA",
};

function roughDefs(id, seed, scale) {
  return `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}"/></filter>`;
}

function enso() {
  const id = "r" + ++uid;
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>${roughDefs(id, 7, 16)}</defs>
  <rect width="800" height="600" fill="${C.bg}"/>
  <circle cx="400" cy="300" r="185" fill="none" stroke="${C.volt}" stroke-width="34" stroke-linecap="round" pathLength="100" stroke-dasharray="88 12" transform="rotate(-70 400 300)" filter="url(#${id})"/>
  <rect x="600" y="420" width="90" height="90" rx="6" fill="${C.lavender}"/>
</svg>`;
}

function hanko(kanji) {
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.bg}"/>
  <rect x="28" y="28" width="744" height="544" fill="none" stroke="${C.gray}" stroke-width="2" opacity="0.5"/>
  <text x="320" y="420" font-family="'DotGothic16',sans-serif" font-size="300" fill="${C.white}" text-anchor="middle">${kanji}</text>
  <rect x="545" y="365" width="150" height="150" rx="6" fill="${C.volt}"/>
  <text x="620" y="472" font-family="'DotGothic16',sans-serif" font-size="84" fill="${C.bg}" text-anchor="middle">剣</text>
</svg>`;
}

function web(label) {
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.bg}"/>
  <rect x="90" y="100" width="620" height="400" rx="10" fill="${C.bg2}" stroke="${C.gray}" stroke-width="3"/>
  <line x1="90" y1="156" x2="710" y2="156" stroke="${C.gray}" stroke-width="3"/>
  <circle cx="126" cy="128" r="9" fill="${C.volt}"/>
  <circle cx="156" cy="128" r="9" fill="${C.gray}"/>
  <circle cx="186" cy="128" r="9" fill="${C.white}"/>
  <rect x="230" y="112" width="420" height="32" rx="16" fill="#1C1C22"/>
  <text x="252" y="134" font-family="'Space Mono',monospace" font-size="18" fill="${C.volt}">${label}</text>
  <text x="165" y="420" font-family="'DotGothic16',sans-serif" font-size="150" fill="${C.lavender}">剣道</text>
  <line x1="470" y1="430" x2="665" y2="225" stroke="${C.volt}" stroke-width="16" stroke-linecap="round"/>
  <line x1="425" y1="455" x2="600" y2="280" stroke="${C.white}" stroke-width="7" stroke-linecap="round" opacity="0.6"/>
</svg>`;
}

function shinai() {
  const lines = [0, 1, 2, 3]
    .map((i) => {
      const x1 = 150 + i * 95;
      const x2 = 430 + i * 95;
      const stroke = i === 1 ? C.volt : C.lavender;
      const w = i === 1 ? 22 : 15;
      return `<line x1="${x1}" y1="520" x2="${x2}" y2="80" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${i === 1 ? 1 : 0.8}"/>`;
    })
    .join("");
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.bg}"/>
  ${lines}
  <rect x="620" y="70" width="90" height="90" rx="6" fill="${C.volt}"/>
</svg>`;
}

function barcode(text) {
  let bars = "";
  let x = 120;
  const widths = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 5, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2];
  widths.forEach((w, i) => {
    bars += `<rect x="${x}" y="180" width="${w * 3}" height="200" fill="${i % 4 === 3 ? C.volt : C.white}"/>`;
    x += w * 3 + 6;
  });
  return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="800" height="600" fill="${C.bg}"/>
  ${bars}
  <text x="400" y="460" font-family="'Space Mono',monospace" font-size="26" fill="${C.volt}" text-anchor="middle" letter-spacing="6">${text || "KAORI-PANZANI-2026"}</text>
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
  if (art === "barcode") return barcode(cover.text);
  return enso();
}
