  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
// Toggle menu on button click

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains("max-h-0")) {
      mobileMenu.classList.remove("max-h-0", "py-0");
      mobileMenu.classList.add("max-h-screen", "py-4");
      document.body.style.overflow = 'hidden'; // scroll lock
    } else {
      mobileMenu.classList.add("max-h-0", "py-0");
      mobileMenu.classList.remove("max-h-screen", "py-4");
      document.body.style.overflow = ''; // unlock scroll
    }
  });

  // Click outside to close
  window.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.add("max-h-0", "py-0");
      mobileMenu.classList.remove("max-h-screen", "py-4");
      document.body.style.overflow = '';
    }
  });
