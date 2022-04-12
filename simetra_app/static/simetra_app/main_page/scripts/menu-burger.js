// Burger
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

/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/

// const links = document.querySelectorAll("a[data-goto]");
// if (links.length > 0) {
//   links.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       const menuLink = e.target;
//       if (
//         menuLink.dataset.goto &&
//         document.querySelector(menuLink.dataset.goto)
//       ) {
//         const gotoBlock = document.querySelector(menuLink.dataset.goto);
//         const gotoBlockValue =
//           gotoBlock.getBoundingClientRect().top +
//           pageYOffset -
//           document.querySelector("header").offsetHeight;

//         window.scrollTo({
//           top: gotoBlockValue,
//           behavior: "smooth",
//         });
//         // e.preventDefault();
//       }
//     });
//   });
// }

