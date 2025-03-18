/**
* Template Name: eNno
* Template URL: https://bootstrapmade.com/enno-free-simple-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

  /**
   * Beginn Karusell
   */

const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let autoScrollInterval;

// Funktion zum Aktualisieren des Karussells
function updateCarousel() {
  const offset = -currentIndex * 25; // 25% pro Logo (4 Logos gleichzeitig)
  carousel.style.transform = `translateX(${offset}%)`;
}

// Automatisches Scrollen alle 3 Sekunden
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (currentIndex < carouselItems.length / 4 - 1) { // 4 Logos gleichzeitig
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 3000); // 3 Sekunden
}

// Starte das automatische Scrollen beim Laden der Seite
startAutoScroll();

// Dienst

document.addEventListener("DOMContentLoaded", function () {
  const serviceLinks = document.querySelectorAll(".services-list a");
  const serviceContents = document.querySelectorAll(".service-content");

  // Funktion zum Anzeigen des ausgewählten Dienstes
  function showService(serviceId) {
    // Verstecke alle Dienstleistungsdetails
    serviceContents.forEach((content) => (content.style.display = "none"));

    // Entferne die "active"-Klasse von allen Links
    serviceLinks.forEach((link) => link.classList.remove("active"));

    // Zeige den ausgewählten Dienst an
    const targetContent = document.getElementById(serviceId);
    if (targetContent) {
      targetContent.style.display = "block";
    }

    // Setze die "active"-Klasse auf den entsprechenden Link
    const targetLink = document.querySelector(`.services-list a[href="#${serviceId}"]`);
    if (targetLink) {
      targetLink.classList.add("active");
    }
  }

  // Event-Listener für die Links
  serviceLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Verhindert das Standardverhalten des Links (Scrollen)
      const serviceId = this.getAttribute("href").substring(1); // Entferne das "#" aus dem href
      showService(serviceId);

      // Aktualisiere den Anker in der URL ohne Scrollen
      history.replaceState(null, null, `#${serviceId}`);
    });
  });

  // Beim Laden der Seite den Dienst basierend auf dem Anker anzeigen
  const hash = window.location.hash.substring(1); // Entferne das "#" aus dem Anker
  if (hash) {
    showService(hash);
  } else {
    // Standardmäßig den ersten Dienst anzeigen
    showService(serviceLinks[0].getAttribute("href").substring(1));
  }
});


// ENDE Dienst