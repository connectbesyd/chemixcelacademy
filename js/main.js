// Shared header, footer and WhatsApp button; enquiry form -> WhatsApp.
const WA_NUMBER = "917907074496"; // TODO: confirm with client
const PHONE_DISPLAY = "+91 79070 74496";
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const pages = [
  ["index.html", "Home"],
  ["about.html", "About Revanth"],
  ["courses.html", "Courses"],
  ["online.html", "Online Classes"],
  ["results.html", "Results"],
  ["gallery.html", "Gallery"],
  ["contact.html", "Contact"],
];

const current = location.pathname.split("/").pop() || "index.html";

const header = `
<header class="site"><div class="container nav">
  <a class="brand" href="index.html" aria-label="Chemixcel Academy home">Chemixcel Academy</a>
  <button class="menu-btn" aria-label="Toggle menu" aria-expanded="false">☰</button>
  <nav aria-label="Main"><ul>
    ${pages.map(([h, t]) => `<li><a href="${h}" class="${h === current ? "active" : ""}">${t}</a></li>`).join("")}
  </ul></nav>
</div></header>`;

const footer = `
<footer class="site"><div class="container">
  <div class="foot-grid">
    <div><h3>Chemixcel Academy</h3>
      <p>Excel in Chemistry. Expert coaching for Class 10, Plus One &amp; Plus Two — CBSE, ICSE &amp; State. Online and offline.</p></div>
    <div><h3>Pages</h3><ul>${pages.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
    <div><h3>Contact</h3><ul>
      <li>Thiruvizha, Cherthala,<br>Alappuzha – 688555</li>
      <li><a href="tel:+917907074496">${PHONE_DISPLAY}</a></li>
      <li><a href="${waLink("Hello Chemixcel Academy, I would like to enquire about chemistry classes.")}">Chat on WhatsApp</a></li>
    </ul></div>
  </div>
  <p class="copy">© ${new Date().getFullYear()} Chemixcel Academy. All rights reserved.</p>
</div></footer>
<a class="call-float" href="tel:+917907074496" aria-label="Call Chemixcel Academy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg></a>
<a class="wa-float" href="${waLink("Hello Chemixcel Academy, I would like to enquire about chemistry classes.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06C22.68 27.2 28 21.8 28 15.16 28 8.5 22.68 3 16.04 3zm0 21.9c-1.78 0-3.52-.48-5.04-1.38l-.36-.22-3.74.98 1-3.64-.24-.38a9.9 9.9 0 0 1-1.52-5.26c0-5.5 4.46-9.96 9.96-9.96 5.5 0 9.96 4.46 9.96 9.96 0 5.5-4.46 9.9-10.02 9.9zm5.46-7.44c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.8-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.7.62.72.22 1.36.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35z"/></svg>
</a>`;

document.body.insertAdjacentHTML("afterbegin", header);
document.body.insertAdjacentHTML("beforeend", footer);

const btn = document.querySelector(".menu-btn");
const nav = document.querySelector("header.site nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});

// Enquiry forms: no backend yet, so open WhatsApp with the details prefilled.
document.querySelectorAll("form.enquiry").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const msg =
      `New enquiry — Chemixcel Academy\n` +
      `Student: ${d.name}\nClass: ${d.cls}\nBoard: ${d.board}\nMode: ${d.mode}\nPhone: ${d.phone}` +
      (d.message ? `\nMessage: ${d.message}` : "");
    window.open(waLink(msg), "_blank", "noopener");
  });
});

// Pre-select class from ?class= on contact page.
const q = new URLSearchParams(location.search).get("class");
const sel = document.querySelector('select[name="cls"]');
if (q && sel) sel.value = q;
const m = new URLSearchParams(location.search).get("mode");
const modeSel = document.querySelector('select[name="mode"]');
if (m && modeSel) modeSel.value = m;

// ---- Premium layer: fonts, loader, scroll reveal, header shrink ----
document.head.insertAdjacentHTML("beforeend",
  `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
  `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap">`);

const loader = document.createElement("div");
loader.className = "loader";
loader.innerHTML = `<div class="word">chemixcel</div><div class="bar"></div>`;
document.body.appendChild(loader);
const hideLoader = () => setTimeout(() => loader.classList.add("done"), 450);
if (document.readyState === "complete") hideLoader(); else window.addEventListener("load", hideLoader);
setTimeout(() => loader.classList.add("done"), 3000); // never block the page

const hdr = document.querySelector("header.site");
addEventListener("scroll", () => hdr.classList.toggle("scrolled", scrollY > 30), { passive: true });

const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".card, .highlight, .section-head, .two-col > *, .gallery .ph, .portrait").forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// Feedback form -> WhatsApp (no backend yet)
document.querySelectorAll("form.feedback").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    window.open(waLink(`Feedback for Chemixcel Academy\nName: ${d.name}\nRelation: ${d.who}\nFeedback: ${d.feedback}`), "_blank", "noopener");
  });
});

// ---- Parallax layer: scroll depth, pointer depth, word-mask headings, tilt cards, progress bar ----
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Scroll progress bar
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  // Split section headings into masked words that slide up when revealed
  document.querySelectorAll(".section-head h2").forEach((h) => {
    const green = (h.dataset.green || "").split(",").map(Number);
    const words = h.textContent.trim().split(/\s+/);
    if (reduce) {
      h.innerHTML = words.map((w, i) => green.includes(i) ? `<span class="gtxt">${w}</span>` : w).join(" ");
      return;
    }
    h.innerHTML = words
      .map((w, i) => `<span class="w${green.includes(i) ? " gtxt" : ""}"><span style="transition-delay:${i * 70}ms">${w}</span></span>`).join(" ");
    h.classList.add("split");
  });
  const hio = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); hio.unobserve(e.target); }
  }), { threshold: 0.4 });
  document.querySelectorAll(".split").forEach((h) => hio.observe(h));

  if (reduce) return;

  // Depth layers. Uses the individual `translate` property so existing transforms keep working.
  const hero = document.querySelector("section.hero");
  const photo = document.querySelector("section.hero .hero-photo");
  const copy = document.querySelector("section.hero .hero-copy");
  const decos = [...document.querySelectorAll("section.hero .deco")];
  decos.forEach((d, i) => { d.dataset.depth = [0.35, 0.2, 0.5, 0.6, 0.3, 0.75, 0.45][i % 7]; });

  const cards = [...document.querySelectorAll(".card, .gallery .ph")];
  cards.forEach((c, i) => { c.dataset.speed = [0.04, 0.09, 0.06][i % 3]; });
  const portraits = [...document.querySelectorAll(".portrait")];

  let mx = 0, my = 0, tx = 0, ty = 0, ticking = false;

  const frame = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (hero && y < hero.offsetHeight + 200) {
      photo && (photo.style.translate = `${tx * -14}px ${y * 0.14 + ty * -10}px`);
      if (copy) {
        copy.style.translate = `${tx * 8}px ${y * -0.08 + ty * 6}px`;
        copy.style.opacity = Math.max(0, 1 - y / (hero.offsetHeight * 0.9));
      }
      decos.forEach((d) => {
        const k = +d.dataset.depth;
        d.style.translate = `${tx * 34 * k}px ${y * -0.3 * k + ty * 26 * k}px`;
      });
    }
    // Cards / gallery drift against scroll as they cross the viewport
    for (const el of cards.concat(portraits)) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const mid = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.translate = `0 ${mid * -(el.dataset.speed || 0.08) * 220}px`;
    }
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);

  // Pointer depth (desktop) with eased follow
  if (fine && hero) {
    addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
    (function ease() {
      tx += (mx - tx) * 0.07; ty += (my - ty) * 0.07;
      if (scrollY < hero.offsetHeight + 200) req();
      requestAnimationFrame(ease);
    })();

    // Magnetic 3D tilt on cards
    document.querySelectorAll(".card").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        c.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
        c.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
        c.classList.add("tilting");
      });
      c.addEventListener("pointerleave", () => {
        c.classList.remove("tilting");
        c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg");
      });
    });
  }
  req();
})();

// ---- Motion pack 2: entrance, counters, glow cursor, magnetic buttons, formulas, velocity marquee ----
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $$ = (s) => [...document.querySelectorAll(s)];

  // Count-up numbers in the stats strip ("6+", "1000+")
  $$(".stats strong").forEach((el) => {
    const m = el.textContent.trim().match(/^(\d+)(\+?)$/);
    if (!m || reduce) return;
    const end = +m[1], suf = m[2];
    el.textContent = "0" + suf;
    new IntersectionObserver((es, o) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      const t0 = performance.now(), dur = 1600;
      (function tick(t) {
        const p = Math.min(1, (t - t0) / dur), k = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * k) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }), { threshold: 0.6 }).observe(el);
  });

  // Stagger the stats items in
  const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); sio.unobserve(e.target); } }), { threshold: 0.3 });
  $$(".stats li").forEach((li, i) => { li.classList.add("reveal"); li.style.transitionDelay = `${i * 110}ms`; sio.observe(li); });

  // Floating chemical formulas drifting in the hero
  const hero = document.querySelector("section.hero");
  if (hero && !reduce) {
    ["H₂O", "CO₂", "NaCl", "C₆H₆", "NH₃", "CH₄", "H₂SO₄"].forEach((f, i) => {
      const s = document.createElement("span");
      s.className = "formula"; s.textContent = f; s.setAttribute("aria-hidden", "true");
      s.style.cssText = `left:${8 + ((i * 53) % 80)}%;top:${10 + ((i * 37) % 70)}%;animation-delay:${-i * 1.7}s;animation-duration:${9 + (i % 4) * 2}s;font-size:${.8 + (i % 3) * .25}rem`;
      hero.appendChild(s);
    });
  }

  // Magnetic buttons (desktop)
  if (fine && !reduce) {
    $$(".btn").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
      });
      b.addEventListener("pointerleave", () => { b.style.translate = ""; });
    });
  }

})();

