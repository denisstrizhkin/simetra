"use strict";
import dataVisualization from "./modules/data-visualization.js";
import modalWindow from "./modules/modal-window.js";
import burgerMenu from "./modules/menu-burger.js";

window.addEventListener("DOMContentLoaded", () => {
  modalWindow();
  burgerMenu();
  dataVisualization();
});
