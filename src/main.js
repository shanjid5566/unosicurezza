const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
// Toggle menu on button click

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (mobileMenu.classList.contains("max-h-0")) {
    mobileMenu.classList.remove("max-h-0", "py-0");
    mobileMenu.classList.add("max-h-screen", "py-4");
    document.body.style.overflow = "hidden"; // scroll lock
  } else {
    mobileMenu.classList.add("max-h-0", "py-0");
    mobileMenu.classList.remove("max-h-screen", "py-4");
    document.body.style.overflow = ""; // unlock scroll
  }
});

// Click outside to close
window.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.add("max-h-0", "py-0");
    mobileMenu.classList.remove("max-h-screen", "py-4");
    document.body.style.overflow = "";
  }
});

//swiper js
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, // mobile
    spaceBetween: 20,
    loop: false,
    breakpoints: {
      768: {
        slidesPerView: 3, // tablet = desktop grid
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3, // desktop
        spaceBetween: 30,
      },
    },
    on: {
      slideChange: function () {
        updateDotsResponsive();
      },
    },
  });

  // --- Custom pagination ---
  const dotsContainer = document.querySelector(".custom-pagination");
  const cards = document.querySelectorAll(".swiper-slide");
  let dots = [];

  function getSlidesPerView() {
    if (window.innerWidth >= 768) return 3; // tablet & desktop
    return 1; // mobile
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const slidesPerView = getSlidesPerView();
    const totalSlides = Math.ceil(cards.length / slidesPerView);
    dots = [];

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add(
        "dot",
        "w-3",
        "h-3",
        "rounded-full",
        "bg-gray-300",
        "cursor-pointer"
      );
      if (i === 0) dot.classList.replace("bg-gray-300", "bg-green-500");

      dot.addEventListener("click", () =>
        swiper.slideTo(
          Math.min(i * slidesPerView, cards.length - slidesPerView)
        )
      );

      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  function updateDotsResponsive() {
    const slidesPerView = getSlidesPerView();
    const activeSlide = Math.floor(swiper.activeIndex / slidesPerView);

    dots.forEach((dot, idx) => {
      if (idx === activeSlide) {
        dot.classList.replace("bg-gray-300", "bg-green-500");
        dot.classList.add("w-12");
        dot.classList.remove("w-3");
      } else {
        dot.classList.replace("bg-green-500", "bg-gray-300");
        dot.classList.add("w-3");
        dot.classList.remove("w-12");
      }
    });
  }

  // Initial setup
  createDots();
  updateDotsResponsive();

  // Update dots on window resize
  window.addEventListener("resize", () => {
    createDots();
    updateDotsResponsive();
  });
});
