# Obry

A personal portfolio HTML template with three home page styles and 11 inner pages, built with Bootstrap 5, jQuery and GSAP.

## Live demo

[obry-html.netlify.app](https://obry-html.netlify.app/)

## Features

- Template preview page (`index.html`) that links to every demo page.
- Three home pages for different kinds of portfolios:
  - **Home One** (`obry-demo/index.html`): developer / digital agency style, with skills, works, counters, pricing and FAQ sections.
  - **Home Two** (`obry-demo/index-2.html`): photographer style, with services, photographers, testimonials and news.
  - **Home Three** (`obry-demo/index-3.html`): musician style, with upcoming shows, trending albums and a custom audio player.
- Inner pages: About, Blog, Blog Details, Work, Work Masonry, Work Details, Service, Service Details, Team Details, Contact and 404.
- Masonry work grid with filtering (Isotope and imagesLoaded).
- Sliders and carousels (Swiper).
- Image and video pop-ups (Magnific Popup).
- Animated number counters (Odometer).
- Scroll and text animations (GSAP ScrollTrigger, ScrollToPlugin, SplitText, WOW.js, Animate.css).
- Preloader, mobile menu (MeanMenu) and back-to-top button.
- Responsive layout on Bootstrap 5.3.3.
- SCSS source files are included next to the compiled CSS.

Forms in the demo (contact, newsletter, search) are front-end only. There is no mail script or backend in this repo.

## Tech stack

- HTML5, CSS3, SCSS
- Bootstrap 5.3.3
- jQuery 3.7.1 (demo) and 3.6.0 (preview page)
- GSAP with ScrollTrigger, ScrollToPlugin and SplitText
- Swiper, Slick (preview page), Isotope, imagesLoaded, Magnific Popup, Odometer, MeanMenu, Select2, WOW.js
- Font Awesome
- Google Fonts (Epilogue, Rubik on the preview page)

There is no build step and no `package.json`.

## Getting started

Open `index.html` in a browser to see the preview page, or open any file in `obry-demo/` directly.

For local testing with a static server:

```bash
npx serve .
# or
python -m http.server 8000
```

To change styles, edit the SCSS in `obry-demo/assets/sass/` and compile it to `obry-demo/assets/css/style.css` with any Sass compiler.

## Project structure

```
obry/
├── index.html            # template preview / landing page
├── assets/               # preview page CSS, JS, SCSS, fonts and images
└── obry-demo/
    ├── index.html        # Home One
    ├── index-2.html      # Home Two
    ├── index-3.html      # Home Three
    ├── about.html, blog.html, blog-details.html, contact.html, 404.html
    ├── service.html, service-details.html, team-details.html
    ├── work.html, work-masonry.html, work-details.html
    └── assets/
        ├── css/          # compiled styles
        ├── sass/         # SCSS source (abstracts, base, components, layout, pages)
        ├── js/           # main.js and vendor scripts
        ├── plugins/      # vendor CSS
        └── images/
```

## Author

Built by [Sakebul Islam](https://sakebul.com) · [LinkedIn](https://www.linkedin.com/in/sakebul-islam)
