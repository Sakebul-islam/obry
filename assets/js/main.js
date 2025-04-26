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

const quoteSliderOptions = {
  loop: true,
  direction: "horizontal",
  effect: "flip",
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
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

const HeroTwoSliderOptions = {
  loop: true,
  speed: 500,
  spaceBetween: 100,

  keyboard: {
    enabled: true,
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
    start: "top+=100",
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

function initMagnificPopups(
  selector = ".popup-youtube, .popup-vimeo, .popup-gmaps, .video__player-play-btn"
) {
  $(selector).magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
}


function initObryPlayers() {
  const players = document.querySelectorAll(".obry-player");

  players.forEach((player) => {
    const audio = player.querySelector("audio");
    if (!audio) return;

    const playBtn = player.querySelector(".play, .play-btn");
    const currentTimeEl = player.querySelector(".music-length span");
    const totalTimeEl = player.querySelector(".music-duration span");
    const progressBar = player.querySelector(".music-progress");
    const volumeBtn = player.querySelector(".music-velum");
    const volumeTrack = player.querySelector(".voluom-track");
    const volumeProgress = player.querySelector(".voluom-progress");
    const musicTrack = player.querySelector(".music-track");

    const formatTime = (time) => {
      const min = String(Math.floor(time / 60)).padStart(2, "0");
      const sec = String(Math.floor(time % 60)).padStart(2, "0");
      return `${min}:${sec}`;
    };

    // ⏱ Total time display
    audio.addEventListener("loadedmetadata", () => {
      if (totalTimeEl) {
        totalTimeEl.textContent = formatTime(audio.duration);
      }
    });

    // ⏱ Update progress and current time
    audio.addEventListener("timeupdate", () => {
      if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(audio.currentTime);
      }
      if (progressBar && audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percentage}%`;
      }
    });

    // ▶️ Play/Pause button
    playBtn?.addEventListener("click", () => {
      players.forEach((p) => {
        const a = p.querySelector("audio");
        const btn = p.querySelector(".play, .play-btn");

        if (a && a !== audio) {
          a.pause();
          btn?.classList.remove("now-play");
          btn?.classList.add("now-pause");
        }
      });

      if (audio.paused) {
        audio.play();
        playBtn.classList.add("now-play");
        playBtn.classList.remove("now-pause");
      } else {
        audio.pause();
        playBtn.classList.add("now-pause");
        playBtn.classList.remove("now-play");
      }
    });

    // 🔇 Mute/Unmute button
    volumeBtn?.addEventListener("click", () => {
      audio.muted = !audio.muted;
      volumeBtn.classList.toggle("muted", audio.muted);
    });

    // 🔊 Volume adjustment with drag
    let isDragging = false;

    const updateVolume = (e) => {
      const rect = volumeTrack.getBoundingClientRect();
      let volume = (e.clientX - rect.left) / rect.width;
      volume = Math.max(0, Math.min(1, volume)); // clamp between 0 and 1
      audio.volume = volume;
      if (volumeProgress) {
        volumeProgress.style.width = `${volume * 100}%`;
      }
    };

    volumeTrack?.addEventListener("mousedown", (e) => {
      isDragging = true;
      updateVolume(e);
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        updateVolume(e);
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // ⏩ Seek on music track click
    musicTrack?.addEventListener("click", (e) => {
      const rect = musicTrack.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      audio.currentTime = position * audio.duration;

      if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(audio.currentTime);
      }

      if (progressBar && audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percentage}%`;
      }
    });
  });
}

function initHeroTwoSlider() {
  const slider = document.querySelector(".hero-two__slider");

  if (!slider) return;

  const slides = slider.querySelectorAll(".swiper-slide");
  if (!slides.length) return;

  slides.forEach(slide => {
    const images = slide.querySelectorAll(".slide-image");
    if (images.length >= 2) {
      images.forEach(img => img.classList.remove("active"));
      images[1].classList.add("active");
    }
  });


  const slideImages = slider.querySelectorAll(".slide-image");
  if (!slideImages.length) return;

  slideImages.forEach((image) => {
    image.addEventListener("click", function () {
      const slideContainer = this.closest(".slide-container");
      if (!slideContainer) return;

      const imagesInSlide = slideContainer.querySelectorAll(".slide-image");
      if (!imagesInSlide.length) return;

      imagesInSlide.forEach((img) => img.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

function initDragButton() {
  const dragButton = document.querySelector(".hero-two__drag-button");
  const swiperElement = document.querySelector(".hero-two__slider");
  if (!swiperElement && !dragButton) {
    return;
  }
  let isHovering = false;

  gsap.set(dragButton, { opacity: 0 });

  function handleMouseEnter(e) {
    isHovering = true;
    gsap.to(dragButton, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    updateButtonPosition(e);
  }

  function handleMouseLeave() {
    isHovering = false;
    gsap.to(dragButton, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }

  function updateButtonPosition(e) {
    if (!isHovering) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    gsap.to(dragButton, {
      left: mouseX,
      top: mouseY,
      duration: 0.1,
      ease: "none",
    });
  }

  function handleClick() {
    gsap.to(dragButton, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  }

  swiperElement.addEventListener("mouseenter", handleMouseEnter);
  swiperElement.addEventListener("mouseleave", handleMouseLeave);
  swiperElement.addEventListener("mousemove", updateButtonPosition);
  swiperElement.addEventListener("click", handleClick);
}

// const horizontalScroll = () => {
//   const races = document.querySelector(".pricing-box2-wrapper");

//   function getScrollAmount() {
//     if (!races) {
//       return;
//     }
//     let racesWidth = races?.scrollWidth;
//     let containerWidth = window.innerWidth;
//     let offsetLeft = races.getBoundingClientRect().left;
//     const extraPadding = 15;
//     return -(racesWidth - containerWidth + offsetLeft + extraPadding);
//   }
//   const tween = gsap.to(races, {
//     x: getScrollAmount,
//     duration: 3,
//     ease: "none",
//   });

//   ScrollTrigger.create({
//     trigger: ".pricing2",
//     start: "top 20%",
//     end: () => `+=${getScrollAmount() * -1}`,
//     pin: true,
//     animation: tween,
//     scrub: 1,
//     invalidateOnRefresh: true,
//     markers: false,
//   });
// };

const horizontalScroll = () => {
  ScrollTrigger.matchMedia({
    // Only run when screen is 992px and above
    "(min-width: 992px)": function () {
      const races = document.querySelector(".pricing-box2-wrapper");

      function getScrollAmount() {
        if (!races) return;
        let racesWidth = races.scrollWidth;
        let containerWidth = window.innerWidth;
        let offsetLeft = races.getBoundingClientRect().left;
        const extraPadding = 15;
        return -(racesWidth - containerWidth + offsetLeft + extraPadding);
      }

      const tween = gsap.to(races, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: ".pricing2",
        start: "top 20%",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: false,
      });
    }
  });
};


document.addEventListener("DOMContentLoaded", () => {
  initializeSwiper(".quote__slider", quoteSliderOptions);
  initializeSwiper(".hero-one__slider", heroOneSliderOptions);
  initializeSwiper(".instagram2__slider", instagram2SliderOptions);
  initializeSwiper(".testimonial__slider", testimonialSliderOptions);
  initializeSwiper(".testimonial2__slider", testimonial2SliderOptions);
  initializeSwiper(".hero-two__slider", HeroTwoSliderOptions);
  initHeroTwoSlider();
  initDragButton();
  initTestimonialNavActiveToggle();
  setBackgroundImages();
  odometerCounter();
  initMagnificPopup();
  updateSkills();
  setHoverActiveClass(".statistic-box2", ".statistic-box2", "active");
  initMasonryFilter();
  popupSearchBox(".popup-search-box", ".search-btn", ".searchClose", "show");
  $(".vs-menu-wrapper").vsmobilemenu();
  initMagnificPopups();
  initObryPlayers();
  horizontalScroll();
});

// Update the scroll amount on resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
