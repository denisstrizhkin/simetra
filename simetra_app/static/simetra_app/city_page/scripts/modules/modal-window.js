"use strict";

function modalWindow() {
  const overlay = document.querySelector(".overlay"),
    modalClose = document.querySelector(".modal__close");

  modalClose.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.classList.remove("_lock");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
      document.body.classList.remove("_lock");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && overlay.style.display === "block") {
      overlay.style.display = "none";
      document.body.classList.remove("_lock");
    }
  });

  if (window.innerWidth < 700) {
    overlay.style.display = "block";
    document.body.classList.add("_lock");
  }
}

export default modalWindow;
