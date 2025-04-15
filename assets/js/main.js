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

document.addEventListener("DOMContentLoaded", () => {
  initializeVideoPlayers(".video-player", ".play-btn");
  initializeSwiper(".brandSlider", brandSliderOptions);
  initializeSwiper(".quote__slider", quoteSliderOptions);
  initializeSwiper(".hero-one__slider", heroOneSliderOptions);
  initializeSwiper(".testimonial__slider", testimonialSliderOptions);
  setBackgroundImages();
  odometerCounter();
  initMagnificPopup();
  setHoverActiveClass(".music-box", ".music-box", "active");
});
