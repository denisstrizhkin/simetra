const citiesUnparsed = JSON.parse(
  document.getElementById("cities-list-json").textContent
);

const arrCitites = [];
for (let i = 0; i < citiesUnparsed.length; i++) {
  arrCitites.push(JSON.parse(citiesUnparsed[i]));
}

let filteredList;
/*-------------------------------------------------------------*/
/*-----Generate datas------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatas(start, end, property, citiesArr) {
  let data = [];
  for (let i = start; i < end; i++) {
    data.push(citiesArr[i][property]);
  }
  return data;
}

function generateLabels(start, end, citiesArr) {
  let labels = [];
  for (let i = start; i < end; i++) {
    labels.push(citiesArr[i].russian_name);
  }
  return labels;
}

function addChartToPage(start, end, regionName, citiesArr) {
  const labels = generateLabels(start, end, citiesArr);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Безопасность и устойчивое развитие",
        data: generateDatas(
          start,
          end,
          "rating_security_n_development",
          citiesArr
        ),
        backgroundColor: "#CCB2FF",
        borderColor: "#B18AE0",
        borderWidth: 2,
      },
      {
        label: "Комфорт и удобство",
        data: generateDatas(
          start,
          end,
          "rating_comfort_n_convenience",
          citiesArr
        ),
        backgroundColor: "#FFB1C1",
        borderColor: "#FF6384",
        borderWidth: 2,
      },
      {
        label: "Эффективность маршрутной сети",
        data: generateDatas(
          start,
          end,
          "rating_route_network_efficiency",
          citiesArr
        ),
        backgroundColor: "#9AD0F5",
        borderColor: "#36A2EB",
        borderWidth: 2,
      },
      {
        label: "Ценовая доступность",
        data: generateDatas(start, end, "rating_affordability", citiesArr),
        backgroundColor: "#FFE6AA",
        borderColor: "#FFCE56",
        borderWidth: 2,
      },
      {
        label: "Физическая доступность",
        data: generateDatas(
          start,
          end,
          "rating_physical_availability",
          citiesArr
        ),
        backgroundColor: "#A5DFDF",
        borderColor: "#4BC0C0",
        borderWidth: 2,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
          text: regionName,
          font: {
            size: 30,
          },
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  return config;
}

const countyNames = ["ЦФО", "СЗФО", "ЮФО", "СКФО", "ПФО", "УФО", "СФО", "ДФО"];
for (let i = 0; i < countyNames.length; i++) {
  filteredList = arrCitites.filter((city) => city.region === countyNames[i]);

  filteredList.sort((a, b) => b.sum_of_rating - a.sum_of_rating);

  new Chart(
    document.getElementById(`county-${i + 1}`),
    addChartToPage(0, filteredList.length, countyNames[i], filteredList)
  );
}

arrCitites.sort((a, b) => b.sum_of_rating - a.sum_of_rating);
new Chart(
  document.getElementById(`top-10`),
  addChartToPage(0, 10, "TOP-10", arrCitites)
);

/*-------------------------------------------------------------*/
/*-----Spoller-------------------------------------------------*/
/*-------------------------------------------------------------*/

const spollersArray = document.querySelectorAll("[data-spollers]");
if (spollersArray.length > 0) {
  initSpollers(spollersArray);
}

function initSpollers(spollersArray, matchMedia = false) {
  spollersArray.forEach((spollersBlock) => {
    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
    if (matchMedia.matches || !matchMedia) {
      spollersBlock.classList.add("_init");
      initSpollerBody(spollersBlock);
      spollersBlock.addEventListener("click", setSpollerAction);
    } else {
      spollersBlock.classList.remove("_init");
      initSpollerBody(spollersBlock, false);
      spollersBlock.removeEventListener("click", setSpollerAction);
    }
  });
}

function initSpollerBody(spollersBlock, hideSpollerBody = true) {
  const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
  if (spollerTitles.length > 0) {
    spollerTitles.forEach((spollerTitle) => {
      if (hideSpollerBody) {
        spollerTitle.removeAttribute("tabindex");
        if (!spollerTitle.classList.contains("_active")) {
          spollerTitle.nextElementSibling.hidden = "true";
        }
      } else {
        spollerTitle.setAttribute("tabindex", "-1");
        spollerTitle.nextElementSibling.hidden = "false";
      }
    });
  }
}

function setSpollerAction(e) {
  const el = e.target;
  if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
    const spollerTitle = el.hasAttribute("data-spoller")
      ? el
      : el.closest("[data-spoller]");
    const spollersBlock = spollerTitle.closest("[data-spollers]");
    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
      ? true
      : false;
    if (!spollersBlock.querySelectorAll("._slide").length) {
      if (oneSpoller && !spollerTitle.classList.contains("_active")) {
        hideSpollersBody(spollersBlock);
      }
      spollerTitle.classList.toggle("_active");
      _slideToggle(spollerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
}

function hideSpollersBody(spollersBlock) {
  const spollerActiveTitle = spollersBlock.querySelector(
    "[data-spoller]._active"
  );
  if (spollerActiveTitle) {
    spollerActiveTitle.classList.remove("_active");
    _slideUp(spollerActiveTitle.nextElementSibling, 500);
  }
}

let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    // target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};

let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;

    // target.offsetHeight;

    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";

    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};

let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
