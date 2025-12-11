const works = [
  {
    image: "assets/images/korabli-work-1.png",
    alt: "Графическая работа Заброшенные корабли — лист 1",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "1/9",
  },
  {
    image: "assets/images/korabli-work-2.png",
    alt: "Графическая работа Заброшенные корабли — лист 2",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "2/9",
  },
  {
    image: "assets/images/korabli-work-3.png",
    alt: "Графическая работа Заброшенные корабли — лист 3",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "3/9",
  },
  {
    image: "assets/images/korabli-work-4.png",
    alt: "Графическая работа Заброшенные корабли — лист 4",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "4/9",
  },
  {
    image: "assets/images/korabli-work-5.png",
    alt: "Графическая работа Заброшенные корабли — лист 5",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "5/9",
  },
  {
    image: "assets/images/korabli-work-6.png",
    alt: "Графическая работа Заброшенные корабли — лист 6",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "6/9",
  },
  {
    image: "assets/images/korabli-work-7.png",
    alt: "Графическая работа Заброшенные корабли — лист 7",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "7/9",
  },
  {
    image: "assets/images/korabli-work-8.png",
    alt: "Графическая работа Заброшенные корабли — лист 8",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "8/9",
  },
  {
    image: "assets/images/korabli-work-9.png",
    alt: "Графическая работа Заброшенные корабли — лист 9",
    title: "Заброшенные корабли",
    year: "2025",
    technique: "Графика",
    size: "40 × 60",
    sheet: "9/9",
  },
];

const imageEl = document.querySelector("[data-artwork-image]");
const navPrev = document.querySelector(".nav--prev");
const navNext = document.querySelector(".nav--next");
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

updateView(activeIndex);

