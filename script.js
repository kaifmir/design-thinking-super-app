const TOTAL = 31;

const deck = document.getElementById("deck");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

totalEl.textContent = String(TOTAL);

const slides = [];

for (let i = 1; i <= TOTAL; i++) {
  const n = String(i).padStart(2, "0");
  const figure = document.createElement("figure");
  figure.className = "slide";
  figure.id = `slide-${i}`;
  figure.dataset.index = String(i);

  const img = document.createElement("img");
  img.src = `slides/slide-${n}.jpg`;
  img.alt = `Design Thinking Super App — slide ${i} of ${TOTAL}`;
  img.loading = i <= 2 ? "eager" : "lazy";
  img.decoding = "async";
  if (i === 1) img.fetchPriority = "high";

  figure.appendChild(img);
  deck.appendChild(figure);
  slides.push(figure);
}

let current = 1;

function setCurrent(index, { scroll = true } = {}) {
  current = Math.min(TOTAL, Math.max(1, index));
  currentEl.textContent = String(current);
  prevBtn.disabled = current <= 1;
  nextBtn.disabled = current >= TOTAL;

  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i + 1 === current);
  });

  if (scroll) {
    slides[current - 1].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

prevBtn.addEventListener("click", () => setCurrent(current - 1));
nextBtn.addEventListener("click", () => setCurrent(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea, select")) return;
  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
    e.preventDefault();
    setCurrent(current + 1);
  } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
    e.preventDefault();
    setCurrent(current - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    setCurrent(1);
  } else if (e.key === "End") {
    e.preventDefault();
    setCurrent(TOTAL);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const index = Number(visible.target.dataset.index);
    if (index && index !== current) {
      setCurrent(index, { scroll: false });
    }
  },
  { root: null, threshold: [0.55, 0.7] }
);

slides.forEach((slide) => observer.observe(slide));

const hash = Number(location.hash.replace(/\D/g, ""));
setCurrent(hash >= 1 && hash <= TOTAL ? hash : 1, { scroll: Boolean(hash) });

window.addEventListener("hashchange", () => {
  const next = Number(location.hash.replace(/\D/g, ""));
  if (next >= 1 && next <= TOTAL) setCurrent(next);
});
