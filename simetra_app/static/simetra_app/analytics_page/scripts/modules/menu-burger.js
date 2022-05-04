"use strict";

function burgerMenu() {
  const iconMenu = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".menu__body");

  if (iconMenu) {
    iconMenu.addEventListener("click", (event) => {
      document.body.classList.toggle("_lock");
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    });
  }

  const menuLinks = document.querySelectorAll(".menu__link");
  menuLinks.forEach((item) => {
    item.addEventListener("click", () => {
      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }
    });
  });
}

export default burgerMenu;
