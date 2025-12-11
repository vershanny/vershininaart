const works = [
  {
    image: "assets/images/harmony-work-1.png",
    alt: "Графическая работа Гармония — лист 1",
    title: "Гармония",
    year: "2020",
    technique: "Графика",
    size: "30 × 40",
    sheet: "1/3",
  },
  {
    image: "assets/images/harmony-work-2.png",
    alt: "Графическая работа Гармония — лист 2",
    title: "Гармония",
    year: "2020",
    technique: "Графика",
    size: "30 × 40",
    sheet: "2/3",
  },
  {
    image: "assets/images/harmony-work-3.png",
    alt: "Графическая работа Гармония — лист 3",
    title: "Гармония",
    year: "2020",
    technique: "Графика",
    size: "30 × 40",
    sheet: "3/3",
  },
];

const imageEl = document.querySelector("[data-artwork-image]");
const navPrev = document.querySelector(".nav--prev");
const navNext = document.querySelector(".nav--next");
const stage = document.querySelector(".series__stage");
const infoFields = {
  title: document.querySelector('[data-meta="title"]'),
  year: document.querySelector('[data-meta="year"]'),
  technique: document.querySelector('[data-meta="technique"]'),
  size: document.querySelector('[data-meta="size"]'),
  sheet: document.querySelector('[data-meta="sheet"]'),
};

let activeIndex = 0;

function runAnimation(element) {
  if (!element) return;
  element.classList.remove("is-animating");
  void element.offsetWidth;
  element.classList.add("is-animating");
}

function updateView(index) {
  const current = works[index];
  if (!current || !imageEl) return;

  imageEl.src = current.image;
  imageEl.alt = current.alt;
  runAnimation(imageEl);

  Object.entries(infoFields).forEach(([key, element]) => {
    if (!element) return;
    element.textContent = current[key] || "";
  });
}

function showNext() {
  activeIndex = (activeIndex + 1) % works.length;
  updateView(activeIndex);
}

function showPrev() {
  activeIndex = (activeIndex - 1 + works.length) % works.length;
  updateView(activeIndex);
}

navNext?.addEventListener("click", showNext);
navPrev?.addEventListener("click", showPrev);

function attachSwipe(surface) {
  if (!surface || works.length <= 1) return;
  let startX = 0;
  surface.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0]?.clientX ?? 0;
    },
    { passive: true }
  );
  surface.addEventListener(
    "touchend",
    (event) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const deltaX = endX - startX;
      if (Math.abs(deltaX) < 40) return;
      if (deltaX < 0) {
        showNext();
      } else {
        showPrev();
      }
    },
    { passive: true }
  );
}

attachSwipe(stage || imageEl);

updateView(activeIndex);

