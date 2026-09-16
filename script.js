const TOTAL = 31;

const deck = document.getElementById("deck");

for (let i = 1; i <= TOTAL; i++) {
  const n = String(i).padStart(2, "0");

  const img = document.createElement("img");
  img.className = "panel";
  img.src = `slides/slide-${n}.jpg`;
  img.alt = `Design Thinking Super App — section ${i} of ${TOTAL}`;
  img.width = 2400;
  img.height = 1350;
  img.loading = i <= 2 ? "eager" : "lazy";
  img.decoding = "async";
  if (i === 1) img.fetchPriority = "high";

  deck.appendChild(img);
}
