const works = [
  {
    image: "assets/images/olhon-work-1.png",
    alt: "Живописная работа Ольхон — лист 1",
    title: "Ольхон",
    year: "2020",
    technique: "Темпера",
    size: "120 × 80",
    sheet: "1/4",
  },
  {
    image: "assets/images/olhon-work-2.png",
    alt: "Живописная работа Ольхон — лист 2",
    title: "Ольхон",
    year: "2020",
    technique: "Темпера",
    size: "120 × 80",
    sheet: "2/4",
  },
  {
    image: "assets/images/olhon-work-3.png",
    alt: "Живописная работа Ольхон — лист 3",
    title: "Ольхон",
    year: "2020",
    technique: "Темпера",
    size: "120 × 80",
    sheet: "3/4",
  },
  {
    image: "assets/images/olhon-work-4.png",
    alt: "Живописная работа Ольхон — лист 4",
    title: "Ольхон",
    year: "2020",
    technique: "Темпера",
    size: "120 × 80",
    sheet: "4/4",
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
  let startY = 0;
  let isSwiping = false;
  
  surface.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0]?.clientX ?? 0;
      startY = event.touches[0]?.clientY ?? 0;
      isSwiping = false;
    },
    { passive: true }
  );
  
  surface.addEventListener(
    "touchmove",
    (event) => {
      if (!startX) return;
      const currentX = event.touches[0]?.clientX ?? 0;
      const currentY = event.touches[0]?.clientY ?? 0;
      const deltaX = Math.abs(currentX - startX);
      const deltaY = Math.abs(currentY - startY);
      
      // Если горизонтальное движение больше вертикального, это свайп
      if (deltaX > deltaY && deltaX > 10) {
        isSwiping = true;
      }
    },
    { passive: true }
  );
  
  surface.addEventListener(
    "touchend",
    (event) => {
      if (!startX || !isSwiping) {
        startX = 0;
        startY = 0;
        return;
      }
      
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const deltaX = endX - startX;
      
      if (Math.abs(deltaX) >= 40) {
        if (deltaX < 0) {
          showNext();
        } else {
          showPrev();
        }
      }
      
      startX = 0;
      startY = 0;
      isSwiping = false;
    },
    { passive: true }
  );
}

attachSwipe(imageEl);

updateView(activeIndex);

