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

  // Pagination: If 'pagination' is true or a custom class, enable pagination
  if (options.pagination) {
    options.pagination = {
      el:
        options.pagination === true
          ? `${containerSelector} .swiper-pagination`
          : options.pagination,
      clickable: true,
    };
  } else {
    delete options.pagination; // If false, remove pagination
  }

  // Navigation: If 'navigation' is true or a custom class, enable navigation
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
    delete options.navigation; // If false, remove navigation
  }
  // Initialize Swiper with the final options
  return new Swiper(containerSelector, options);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeVideoPlayers(".video-player", ".play-btn");
  initializeSwiper(".brandSlider", brandSliderOptions);
  setBackgroundImages();
  odometerCounter();
});
