"use strict";
import cityCharts from "./modules/city-charts.js";
import spoller from "./modules/spoller.js";
import burgerMenu from "./modules/menu-burger.js";

window.addEventListener("DOMContentLoaded", () => {
  burgerMenu();
  cityCharts();
  spoller();
});
