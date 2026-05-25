const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }
};

setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);

sections.forEach((section) => observer.observe(section));

const carousel = document.querySelector(".project-carousel");

if (carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dots button"));
  const previousButton = carousel.querySelector(".carousel-button.previous");
  const nextButton = carousel.querySelector(".carousel-button.next");
  const sidePreviews = {
    previous: carousel.querySelector(".carousel-side-preview.left"),
    next: carousel.querySelector(".carousel-side-preview.right"),
  };
  let activeIndex = 0;

  const updateSidePreview = (preview, slide) => {
    if (!preview || !slide) return;

    const label = slide.querySelector(".project-label")?.textContent ?? "Project";
    const title = slide.querySelector("h3")?.textContent ?? "";

    preview.querySelector("span").textContent = label;
    preview.querySelector("strong").textContent = title;
  };

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
    const nextIndex = (activeIndex + 1) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
      slide.classList.toggle("is-previous", slideIndex === previousIndex);
      slide.classList.toggle("is-next", slideIndex === nextIndex);
      slide.setAttribute("aria-hidden", slideIndex === activeIndex ? "false" : "true");
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });

    updateSidePreview(sidePreviews.previous, slides[previousIndex]);
    updateSidePreview(sidePreviews.next, slides[nextIndex]);
  };

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  showSlide(0);
}
