// Language switcher logic
const enBtn = document.getElementById('lang-en');
const arBtn = document.getElementById('lang-ar');

function setLang(lang) {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
  });
  enBtn.classList.toggle('active', lang === 'en');
  arBtn.classList.toggle('active', lang === 'ar');
}

enBtn.addEventListener('click', () => setLang('en'));
arBtn.addEventListener('click', () => setLang('ar'));

// Default to English
setLang('en');

// --- Moved from index.html ---
document.addEventListener('DOMContentLoaded', function() {
  const headerNav = document.querySelector("nav.header-nav");
  const navTabs = headerNav.querySelector(".nav-tabs");
  const navLinks = headerNav.querySelectorAll("a");
  const navIndicator = headerNav.querySelector(".nav-indicator");

  function updateNavIndicator(targetLink) {
    const linkRect = targetLink.getBoundingClientRect();
    const navRect = navTabs.getBoundingClientRect();
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
  }

  // Set initial position
  const initialActiveLink = headerNav.querySelector(
    'a[href="#menu-section"]'
  );
  if (initialActiveLink) {
    updateNavIndicator(initialActiveLink);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      updateNavIndicator(e.target);
    });
    link.addEventListener("mouseenter", (e) => {
      updateNavIndicator(e.target);
    });
  });

  navTabs.addEventListener("mouseleave", () => {
    const activeSection = document.querySelector(".main-section-active");
    let activeLink = headerNav.querySelector("a.active");
    if (!activeLink) {
      // find from URL hash
      const currentHash = window.location.hash || "#menu-section";
      activeLink = headerNav.querySelector(`a[href="${currentHash}"]`);
    }
    if (activeLink) {
      updateNavIndicator(activeLink);
    }
  });

  // Update nav on scroll
  const sections = document.querySelectorAll('[id$="-section"]');
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeLink = headerNav.querySelector(`a[href="#${id}"]`);
          if (activeLink) {
            navLinks.forEach((l) => l.classList.remove("active"));
            activeLink.classList.add("active");
            updateNavIndicator(activeLink);
          }
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => scrollObserver.observe(section));

  // Main section tabs (Food, Beverages, etc.)
  const menuSectionTabs = document.querySelectorAll(".menu-section-tab");
  const menuSectionContents = document.querySelectorAll(
    ".menu-section-content"
  );

  menuSectionTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      menuSectionTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.dataset.target;
      menuSectionContents.forEach((content) => {
        if (content.id === targetId) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    });
  });

  // Category navigation with scrolling and scroll-spy
  function setupCategoryNav(navContainer) {
    const nav = navContainer.querySelector(".category-nav");
    const leftBtn = navContainer.querySelector(".scroll-btn.left");
    const rightBtn = navContainer.querySelector(".scroll-btn.right");
    const categoryTabs = navContainer.querySelectorAll(".category-tab");
    const contentContainer = navContainer.nextElementSibling;
    const categoryContents =
      contentContainer.querySelectorAll(".category-content");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const activeTab = navContainer.querySelector(
              `.category-tab[data-target="${id}"]`
            );
            categoryTabs.forEach((t) => t.classList.remove("active"));
            if (activeTab) {
              activeTab.classList.add("active");
              activeTab.scrollIntoView({
                behavior: "smooth",
                inline: "center",
              });
            }
          }
        });
      },
      { root: null, threshold: 0.1, rootMargin: "-50% 0px -50% 0px" }
    );

    categoryContents.forEach((content) => observer.observe(content));

    leftBtn.addEventListener("click", () => {
      nav.scrollLeft -= 200;
    });

    rightBtn.addEventListener("click", () => {
      nav.scrollLeft += 200;
    });

    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = tab.dataset.target;
        const targetElement = contentContainer.querySelector(
          `#${targetId}`
        );

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  document.querySelectorAll(".menu-section-content").forEach((section) => {
    const navContainer = section.querySelector(".category-nav-container");
    if (navContainer) {
      setupCategoryNav(navContainer);
    }
  });
});
