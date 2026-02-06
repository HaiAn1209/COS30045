const slides = document.querySelectorAll(".slide");
const prevZone = document.getElementById("prevZone");
const nextZone = document.getElementById("nextZone");
const dotsContainer = document.getElementById("progressDots");

let currentSlide = 0;

/* Create dots dynamically */
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("progress-dot");
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".progress-dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Hide zones at edges
  prevZone.style.display = index === 0 ? "none" : "flex";
  nextZone.style.display = index === slides.length - 1 ? "none" : "flex";
}

/* Click zones */
prevZone.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
});

nextZone.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
});

/* Keyboard navigation */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
  if (e.key === "ArrowLeft" && currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
});

/* Init */
showSlide(currentSlide);