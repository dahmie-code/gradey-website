import { showSpinner, hideSpinner } from "./loaderPage.js";
showSpinner();

const links = document.querySelectorAll('.menu-item');

links.forEach(function(link) {
  link.addEventListener('click', function(event) {
    links.forEach(function(el) {
      el.classList.remove('menu-item--active');
    });
    link.classList.add('menu-item--active');
  });
});

window.addEventListener('load', () => hideSpinner());
