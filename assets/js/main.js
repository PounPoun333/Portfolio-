import { profile, internship, categories, projects } from "./data.js";
import { coverHTML } from "./covers.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

const statusLabels = { done: "Terminé", "in-progress": "En cours" };
const catLabel = (id) => (categories.find((c) => c.id === id) || { label: id }).label;

const arrowSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;

function fillProfile() {
  document.title = `${profile.firstName} ${profile.lastName} — ${profile.role}`;
  $$("[data-profile]").forEach((el) => {
    const key = el.dataset.profile;
    if (key === "name") el.textContent = `${profile.firstName} ${profile.lastName}`;
    else if (key === "email") {
      el.textContent = profile.email;
      el.href = `mailto:${profile.email}`;
    } else if (key === "linkedin") el.href = profile.linkedin;
    else if (key === "instagram") el.href = profile.instagram;
    else if (profile[key] != null) el.textContent = profile[key];
  });
}

function fillInternship() {
  $$("[data-internship]").forEach((el) => {
    const key = el.dataset.internship;
    if (internship[key] != null) el.textContent = internship[key];
  });
  $("#missions").innerHTML = internship.missions.map((m) => `<li>${m}</li>`).join("");
}

function placeholderPhoto() {
  return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="600" height="600" fill="#131318"/>
  <rect x="24" y="24" width="552" height="552" fill="none" stroke="#00B4FF" stroke-width="2" opacity="0.7"/>
  <text x="300" y="330" font-family="'DotGothic16',sans-serif" font-size="150" fill="#F4F4F0" text-anchor="middle" opacity="0.85">写真</text>
  <text x="300" y="420" font-family="'Space Mono',monospace" font-size="22" fill="#00B4FF" text-anchor="middle" letter-spacing="4">photo.jpg</text>
</svg>`;
}

function fillExtras() {
  const frame = $("#photo-frame");
  if (profile.photo && profile.photo.src) {
    frame.innerHTML = `<img src="${profile.photo.src}" alt="${profile.photo.alt || ""}" width="600" height="600" loading="lazy">`;
  } else {
    frame.innerHTML = placeholderPhoto();
  }
  $("#skills").innerHTML = (profile.skills || []).map((s) => `<li>${s}</li>`).join("");
}

const params = new URLSearchParams(location.search);
let activeCat = categories.some((c) => c.id === params.get("cat")) ? params.get("cat") : "all";

const filtersEl = $("#filters");
const listEl = $("#project-list");
const emptyEl = $("#empty-state");
const countEl = $("#works-count");

function renderFilters() {
  filtersEl.innerHTML = "";
  categories.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = c.label;
    b.dataset.cat = c.id;
    b.setAttribute("aria-pressed", String(c.id === activeCat));
    b.addEventListener("click", () => setCat(c.id));
    filtersEl.appendChild(b);
  });
}

function setCat(cat) {
  activeCat = cat;
  const url = new URL(location.href);
  if (cat === "all") url.searchParams.delete("cat");
  else url.searchParams.set("cat", cat);
  history.replaceState(null, "", url);
  renderFilters();
  renderProjects();
}

const plural = new Intl.PluralRules("fr");

function renderProjects() {
  const visible = projects.filter((p) => activeCat === "all" || p.category === activeCat);
  listEl.innerHTML = "";
  visible.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "project-item";
    li.style.animationDelay = `${Math.min(i * 60, 300)}ms`;
    const a = document.createElement("a");
    a.className = "project-link";
    a.href = `#/projet/${p.slug}`;
    a.dataset.slug = p.slug;
    const badge = p.status === "in-progress" ? ` · <span class="badge">En cours</span>` : "";
    a.innerHTML = `
      <span class="p-index">${String(i + 1).padStart(2, "0")}</span>
      <span class="p-title">${p.title}</span>
      <span class="p-meta">${catLabel(p.category)} · ${p.year}${badge}</span>
      <span class="p-arrow">${arrowSVG}</span>`;
    li.appendChild(a);
    listEl.appendChild(li);
  });
  emptyEl.hidden = visible.length > 0;
  countEl.textContent = `${visible.length} réalisation${plural.select(visible.length) === "one" ? "" : "s"}`;
}

const dlg = $("#project-dialog");
let currentSlug = null;
let lastFocus = null;

function openProject(slug, push) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return;
  currentSlug = slug;
  $("#dialog-cover").innerHTML = coverHTML(p.cover);
  $("#dialog-meta").textContent = `${catLabel(p.category)} · ${p.year} · ${statusLabels[p.status] || p.status} · ${p.role}`;
  $("#dialog-title").textContent = p.title;
  $("#dialog-summary").textContent = p.summary || "";
  $("#dialog-desc").textContent = p.description || "";
  $("#dialog-tags").innerHTML = (p.tags || []).map((t) => `<li>${t}</li>`).join("");
  const link = $("#dialog-link");
  if (p.link) {
    link.hidden = false;
    link.href = p.link;
  } else {
    link.hidden = true;
  }
  if (push) history.pushState(null, "", `#/projet/${slug}`);
  if (!dlg.open) {
    lastFocus = document.activeElement;
    dlg.showModal();
  }
  $("#dialog-close").focus();
}

function closeProject() {
  if (dlg.open) dlg.close();
}

dlg.addEventListener("close", () => {
  currentSlug = null;
  if (location.hash.startsWith("#/projet/")) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  if (lastFocus && lastFocus.focus) lastFocus.focus();
});

$("#dialog-close").addEventListener("click", closeProject);

dlg.addEventListener("click", (e) => {
  const r = dlg.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
    closeProject();
  }
});

listEl.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-slug]");
  if (!a) return;
  e.preventDefault();
  openProject(a.dataset.slug, true);
});

function syncFromLocation() {
  const m = location.hash.match(/^#\/projet\/([\w-]+)/);
  if (m) openProject(m[1], false);
  else if (currentSlug) closeProject();
}

addEventListener("hashchange", syncFromLocation);
addEventListener("popstate", syncFromLocation);

const preview = $("#preview");
let raf = 0;
let mx = 0;
let my = 0;
let pw = 0;
let ph = 0;

if (finePointer) {
  listEl.addEventListener("pointerover", (e) => {
    const a = e.target.closest("a[data-slug]");
    if (!a) return;
    const p = projects.find((x) => x.slug === a.dataset.slug);
    if (!p) return;
    preview.innerHTML = coverHTML(p.cover);
    preview.classList.add("on");
    pw = preview.offsetWidth;
    ph = preview.offsetHeight;
  });
  listEl.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!raf) raf = requestAnimationFrame(placePreview);
  });
  listEl.addEventListener("pointerleave", () => preview.classList.remove("on"));
}

function placePreview() {
  raf = 0;
  const x = Math.min(mx + 28, innerWidth - pw - 16);
  const y = Math.min(my + 28, innerHeight - ph - 16);
  preview.style.transform = `translate3d(${Math.max(16, x)}px, ${Math.max(16, y)}px, 0)`;
}

function initReveal() {
  if (reducedMotion) return;
  const targets = $$("[data-reveal]");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

const header = $(".site-header");
addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", scrollY > 8);
  },
  { passive: true }
);

const yearText = new Intl.DateTimeFormat("fr-FR", { year: "numeric" }).format(new Date());
$("#year2").textContent = yearText;

fillProfile();
fillInternship();
fillExtras();
renderFilters();
renderProjects();
initReveal();
syncFromLocation();
