"use strict";

function setBackgroundImages() {
  var elements = document.querySelectorAll("[data-bg-src]");
  if (elements?.length > 0) {
    elements.forEach(function (element) {
      var src = element.getAttribute("data-bg-src");
      element.style.backgroundImage = "url(" + src + ")";
      element.classList.add("background-image");
      element.removeAttribute("data-bg-src");
    });
  }
}
function odometerCounter() {
  $(".counter-item").each(function () {
    var $counterItem = $(this);
    $counterItem.isInViewport(function (status) {
      if (status === "entered") {
        $counterItem.find(".odometer").each(function () {
          var el = this;
          el.innerHTML = el.getAttribute("data-odometer-final");
        });
      }
    });
  });
}

const brandSliderOptions = {
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 1,
  },
  effect: "slide",
  navigation: false,
  slidesPerView: 2,
  spaceBetween: 20,
  breakpoints: {
    // When the viewport width is 480px or more
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // When the viewport width is 768px or more
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    // When the viewport width is 1024px or more
    1024: {
      slidesPerView: 5,
      spaceBetween: 85,
    },
  },
};
const quoteSliderOptions = {
  loop: true,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".quote__pagination",
    clickable: true,
  },
  speed: 1000,
};

const heroOneSliderOptions = {
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  effect: "slide",
  navigation: false,
  slidesPerView: "auto",
  spaceBetween: 20,
  breakpoints: {
    1200: {
      spaceBetween: 40,
    },
  },
};
const instagram2SliderOptions = {
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  effect: "slide",
  navigation: false,
  slidesPerView: "auto",
};
const testimonialSliderOptions = {
  loop: true,
  spaceBetween: 40,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".testimonial__pagination",
    clickable: true,
  },
  speed: 1000,
};
const testimonial2SliderOptions = {
  loop: true,
  spaceBetween: 40,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  navigation: {
    nextEl: ".testimonial2__navigation .testimonial2-next",
    prevEl: ".testimonial2__navigation .testimonial2-prev",
  },
  speed: 1000,

  on: {
    slideChange: function () {
      const isNext = this.activeIndex > this.previousIndex;
      initTestimonialNavActiveToggle(isNext ? "right" : "left");
    },
  },
};

// Function to initialize active class toggle based on direction
function initTestimonialNavActiveToggle(direction = "right") {
  const nextBtn = document.querySelector(
    ".testimonial2__navigation .testimonial2-next"
  );
  const prevBtn = document.querySelector(
    ".testimonial2__navigation .testimonial2-prev"
  );

  if (!nextBtn || !prevBtn) return;

  const setActiveNav = (direction) => {
    nextBtn.classList.toggle("active", direction === "right");
    prevBtn.classList.toggle("active", direction === "left");
  };

  // Set active class on initial load (based on direction)
  setActiveNav(direction);

  // Add event listeners for button clicks and update the active class
  nextBtn.addEventListener("click", () => setActiveNav("right"));
  prevBtn.addEventListener("click", () => setActiveNav("left"));
}

function initializeVideoPlayers(videoSelector, playBtnSelector) {
  const videos = document.querySelectorAll(videoSelector);
  const playBtns = document.querySelectorAll(playBtnSelector);

  videos.forEach((video, index) => {
    const playBtn = playBtns[index];
    if (video && playBtn) {
      video.pause();

      playBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          playBtn.classList.add("disabled");
          video.classList.add("pointer");
        } else {
          video.pause();
          playBtn.classList.remove("disabled");
          video.classList.remove("pointer");
        }
      });

      video.addEventListener("click", () => {
        console.log("clicked");
        if (playBtn.classList.contains("disabled")) {
          video.pause();
          playBtn.classList.remove("disabled");
          video.classList.remove("pointer");
        }
      });
    }
  });
}

function initializeSwiper(containerSelector, options) {
  // Check if the container exists
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }

  if (options.pagination) {
    options.pagination = {
      el:
        options.pagination === true
          ? `${containerSelector} .swiper-pagination`
          : options.pagination.el,
      clickable: true,
    };

    const paginationEl = document.querySelector(options.pagination.el);
    if (!paginationEl) {
      console.error("Pagination element not found");
      return;
    }
  } else {
    delete options.pagination;
  }

  if (options.navigation) {
    options.navigation = {
      nextEl:
        options.navigation === true
          ? `${containerSelector} .swiper-button-next`
          : options.navigation.nextEl,
      prevEl:
        options.navigation === true
          ? `${containerSelector} .swiper-button-prev`
          : options.navigation.prevEl,
    };
  } else {
    delete options.navigation;
  }
  return new Swiper(containerSelector, options);
}

function setHoverActiveClass(
  listenerSelector,
  targetSelector,
  activeClass = "active"
) {
  if (
    typeof listenerSelector !== "string" ||
    typeof targetSelector !== "string"
  ) {
    return;
  }

  const listeners = document.querySelectorAll(listenerSelector);

  if (listeners.length === 0) {
    return;
  }

  let currentActiveItem = listeners[0].querySelector(targetSelector); // Initially set the first target as active
  if (!currentActiveItem) {
    currentActiveItem = listeners[0]; // If targetSelector doesn't exist, apply active class on the listener itself
  }
  currentActiveItem.classList.add(activeClass); // Add active class to the first target initially

  listeners.forEach((listener) => {
    const targetElement = listener.querySelector(targetSelector) || listener; // If target doesn't exist, use listener itself

    listener.addEventListener("mouseenter", function () {
      // If there's a previously active item and it's not the current one, remove its 'active' class
      if (currentActiveItem && currentActiveItem !== targetElement) {
        currentActiveItem.classList.remove(activeClass);
      }

      // Add the 'active' class to the current hovered target element
      targetElement.classList.add(activeClass);

      // Update the currentActiveItem to the newly hovered target element
      currentActiveItem = targetElement;
    });

    // Optionally: Do nothing on mouseleave (or you can choose to remove the active class)
    listener.addEventListener("mouseleave", function () {
      // Keep the active class on the last hovered item
      // (no need to remove it on mouseleave if you want it to stay active until another hover happens)
    });
  });
}

function initMagnificPopup() {
  // Verify jQuery and Magnific Popup are loaded
  if (typeof jQuery === "undefined") {
    return;
  }

  if (typeof $.fn.magnificPopup === "undefined") {
    return;
  }

  // Initialize Magnific Popup
  $(".thumb-info").each(function () {
    $(this).magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Loading image...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
    });
  });
  $(".portfolio-box").each(function () {
    $(this).magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Loading image...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [1, 2],
      },
    });
  });

  $(".service2-video").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });
}

function updateSkills() {
  const skillCounts = document.querySelectorAll(".skill-box .skill-count");

  skillCounts.forEach((countEl) => {
    const count = countEl.getAttribute("data-skill-count");

    if (count) {
      // Set text content
      countEl.textContent = `${count}%`;

      // Set width of skill-progress
      const progressEl = countEl.closest(".skill-progress");
      if (progressEl) {
        progressEl.style.width = `${count}%`;
      }
    }
  });
}

// var gridfilter = $(".work-masonry__items");
// if (gridfilter.length) {
//   $(".work-masonry__items").imagesLoaded(function () {
//     $(".masonry-active").on("click", "button", function () {
//       var filterValue = $(this).attr("data-filter");
//       $grid.isotope({
//         filter: filterValue,
//       });
//     });
//     var $grid = $(".work-masonry__items").isotope({
//       itemSelector: ".masonry-item",
//       percentPosition: true,
//       masonry: {
//         columnWidth: ".masonry-item",
//       },
//     });
//   });
// }

// $(".work-masonry__filter button").on("click", function (event) {
//   event.preventDefault();
//   if (!$(this).hasClass("active")) {
//     $(this).addClass("active").siblings(".active").removeClass("active");
//   }
// });

const initMasonryFilter = () => {
  if (typeof imagesLoaded !== "function") {
    return;
  }
  if (typeof Isotope === "undefined") {
    return;
  }

  const gridElem = document.querySelector(".work-masonry__items");
  if (!gridElem) {
    return;
  }

  imagesLoaded(gridElem, function () {
    const iso = new Isotope(gridElem, {
      itemSelector: ".masonry-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".masonry-item",
      },
    });

    const filterContainer = document.querySelector(".masonry-active");
    if (filterContainer) {
      filterContainer.addEventListener("click", function (e) {
        if (e.target && e.target.tagName === "BUTTON") {
          const filterValue = e.target.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });
        }
      });
    }

    const filterButtons = document.querySelectorAll(
      ".work-masonry__filter button"
    );
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        if (!this.classList.contains("active")) {
          const activeButton = this.parentElement.querySelector(".active");
          if (activeButton) activeButton.classList.remove("active");
          this.classList.add("active");
        }
      });
    });
  });
};

function popupSearchBox(
  searchBoxSelector,
  searchOpenSelector,
  searchCloseSelector,
  toggleClass
) {
  const searchBox = document.querySelector(searchBoxSelector);
  const searchOpen = document.querySelector(searchOpenSelector);
  const searchClose = document.querySelector(searchCloseSelector);

  if (!searchBox || !searchOpen || !searchClose) {
    console.warn("popupSearchBox: One or more elements not found.");
    return;
  }

  searchOpen.addEventListener("click", function (e) {
    e.preventDefault();
    searchBox.classList.add(toggleClass);
  });

  searchBox.addEventListener("click", function (e) {
    e.stopPropagation();
    searchBox.classList.remove(toggleClass);
  });

  const form = searchBox.querySelector("form");
  if (form) {
    form.addEventListener("click", function (e) {
      e.stopPropagation();
      searchBox.classList.add(toggleClass);
    });
  }

  searchClose.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    searchBox.classList.remove(toggleClass);
  });
}

/**************************************
 ***** 05. Data Navbar Stick *****
 **************************************/
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navbar = document.querySelector("#navbars");

gsap.timeline({
  scrollTrigger: {
    trigger: navbar,
    start: "top+=250",
    end: "+=1",
    toggleActions: "play reverse play reverse",
    scrub: false,
    onEnter: () => navbar.classList.add("sticky-active"),
    onLeaveBack: () => navbar.classList.remove("sticky-active"),
  },
});

$.fn.vsmobilemenu = function (options) {
  var opt = $.extend(
    {
      menuToggleBtn: ".vs-menu-toggle",
      bodyToggleClass: "vs-body-visible",
      subMenuClass: "vs-submenu",
      subMenuParent: "vs-item-has-children",
      subMenuParentToggle: "vs-active",
      meanExpandClass: "vs-mean-expand",
      appendElement: '<span class="vs-mean-expand"></span>',
      subMenuToggleClass: "vs-open",
      toggleSpeed: 400,
    },
    options
  );

  return this.each(function () {
    var menu = $(this); // Select menu

    // Menu Show & Hide
    function menuToggle() {
      menu.toggleClass(opt.bodyToggleClass);

      // collapse submenu on menu hide or show
      var subMenu = "." + opt.subMenuClass;
      $(subMenu).each(function () {
        if ($(this).hasClass(opt.subMenuToggleClass)) {
          $(this).removeClass(opt.subMenuToggleClass);
          $(this).css("display", "none");
          $(this).parent().removeClass(opt.subMenuParentToggle);
        }
      });
    }

    // Class Set Up for every submenu
    menu.find("li").each(function () {
      var submenu = $(this).find("ul");
      submenu.addClass(opt.subMenuClass);
      submenu.css("display", "none");
      submenu.parent().addClass(opt.subMenuParent);
      submenu.prev("a").append(opt.appendElement);
      submenu.next("a").append(opt.appendElement);
    });

    // Toggle Submenu
    function toggleDropDown($element) {
      if ($($element).next("ul").length > 0) {
        $($element).parent().toggleClass(opt.subMenuParentToggle);
        $($element).next("ul").slideToggle(opt.toggleSpeed);
        $($element).next("ul").toggleClass(opt.subMenuToggleClass);
      } else if ($($element).prev("ul").length > 0) {
        $($element).parent().toggleClass(opt.subMenuParentToggle);
        $($element).prev("ul").slideToggle(opt.toggleSpeed);
        $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
      }
    }

    // Submenu toggle Button
    var expandToggler = "." + opt.meanExpandClass;
    $(expandToggler).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        toggleDropDown($(this).parent());
      });
    });

    // Menu Show & Hide On Toggle Btn click
    $(opt.menuToggleBtn).each(function () {
      $(this).on("click", function () {
        menuToggle();
      });
    });

    // Hide Menu On out side click
    menu.on("click", function (e) {
      e.stopPropagation();
      menuToggle();
    });

    // Stop Hide full menu on menu click
    menu.find("div").on("click", function (e) {
      e.stopPropagation();
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeVideoPlayers(".video-player", ".play-btn");
  initializeSwiper(".brandSlider", brandSliderOptions);
  initializeSwiper(".quote__slider", quoteSliderOptions);
  initializeSwiper(".hero-one__slider", heroOneSliderOptions);
  initializeSwiper(".instagram2__slider", instagram2SliderOptions);
  initializeSwiper(".testimonial__slider", testimonialSliderOptions);
  initializeSwiper(".testimonial2__slider", testimonial2SliderOptions);
  initTestimonialNavActiveToggle();
  setBackgroundImages();
  odometerCounter();
  initMagnificPopup();
  updateSkills();
  setHoverActiveClass(".music-box", ".music-box", "active");
  setHoverActiveClass(".statistic-box2", ".statistic-box2", "active");
  initMasonryFilter();
  popupSearchBox(".popup-search-box", ".search-btn", ".searchClose", "show");
  $(".vs-menu-wrapper").vsmobilemenu();
});
