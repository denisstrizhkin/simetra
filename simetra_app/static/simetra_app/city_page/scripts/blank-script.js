"use strict";

const longitude = document.querySelector(".home__longitude");
const latitude = document.querySelector(".home__latitude");

longitude.textContent = longitude.textContent.slice(0, 13);
latitude.textContent = latitude.textContent.slice(0, 14);

const subgroups = JSON.parse(
  JSON.parse(
    document.getElementById("cities_attrs_by_groups_list_json").textContent
  )[0]
);

const namesubgroups = [
  "Качественные группы",
  "Пространственные характеристики",
  "Подвижной состав",
  "Маршруты",
  "Тарифная система",
];
const qualityGroups = Object.entries(
    JSON.parse(subgroups["КАЧЕСТВЕННЫЕ ГРУППЫ"][0])
  ),
  spatial = Object.entries(
    JSON.parse(subgroups["ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ"][0])
  ),
  rollingStock = Object.entries(JSON.parse(subgroups["ПОДВИЖНОЙ СОСТАВ"][0])),
  routes = Object.entries(JSON.parse(subgroups["МАРШРУТЫ"][0])),
  tariffSystem = Object.entries(JSON.parse(subgroups["ТАРИФНАЯ СИСТЕМА"][0]));

function roundingValues(arrField) {
  for (let i = 0; i < arrField.length; i++) {
    if (arrField[i][1] % 1 !== 0) {
      arrField[i][1] = +arrField[i][1].toFixed(2);
      console.log(arrField[i][1]);
    }
  }
}

roundingValues(qualityGroups);
roundingValues(spatial);
roundingValues(rollingStock);
roundingValues(routes);
roundingValues(tariffSystem);


const cityAttributeName = JSON.parse(
  JSON.parse(
    document.getElementById("city_attr_verbose_names_list_json").textContent
  )[0]
);

const allPropertiesCity = JSON.parse(
  JSON.parse(document.getElementById("cities-list-json").textContent)[0]
);

/*-------------------------------------------------------------*/
/*-----Generate datas------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatas(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    if (arrField[i][1] !== 0) {
      data.push(arrField[i][1]);
    }
  }
  return data;
}

function generateLabels(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    if (arrField[i][1] !== 0) {
      data.push(cityAttributeName[arrField[i][0]]);
    } else {
      nameUnusedProperties.push(cityAttributeName[arrField[i][0]]);
    }
  }
  return data;
}

/*-------------------------------------------------------------*/
/*-----Polar Area----------------------------------------------*/
/*-------------------------------------------------------------*/
function createPolarArea(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "#FFB1C1",
          "#9AD0F5",
          "#FFE6AA",
          "#A5DFDF",
          "#CCB2FF",
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#B18AE0"],
        borderWidth: 3,
      },
    ],
  };

  const config = {
    type: "polarArea",
    data: data,

    // overrides: {
    //   plugins: {
    //     tooltip: {
    //       caretSize: 40,
    //     },
    //   },
    // },
    options: {
      responsive: true,
      scales: {
        color: "#ffffff",
      },
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            font: {
              size: 20,
            },
          },
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Pie-----------------------------------------------------*/
/*-------------------------------------------------------------*/
function createPie(groupArr, start, end, fontColor = "black") {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "#FFB1C1",
          "#9AD0F5",
          "#FFE6AA",
          "#A5DFDF",
          "#CCB2FF",
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#B18AE0"],
        borderWidth: 3,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            color: fontColor,
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Doughnut------------------------------------------------*/
/*-------------------------------------------------------------*/
function createDoughnut(groupArr, start, end, fontColor = "black") {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "#FFB1C1",
          "#9AD0F5",
          "#FFE6AA",
          "#A5DFDF",
          "#CCB2FF",
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#B18AE0"],
        borderWidth: 3,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            color: fontColor,
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Generate datas------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatasProcent(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    data.push(arrField[i][1], 100 - arrField[i][1]);
  }
  return data;
}

function generateLabelsProcent(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    let re = /исправных/gi;
    let newLabel = cityAttributeName[arrField[i][0]].replace(re, "неисправных");

    data.push(cityAttributeName[arrField[i][0]], newLabel);
  }
  return data;
}

/*-------------------------------------------------------------*/
/*-----Doughnut procent----------------------------------------*/
/*-------------------------------------------------------------*/
function createDoughnutProcent(groupArr, start, end, fontColor = "black") {
  const data = {
    labels: generateLabelsProcent(groupArr, start, end),
    datasets: [
      {
        data: generateDatasProcent(groupArr, start, end),
        backgroundColor: [
          "#FFB1C1",
          "#9AD0F5",
          "#FFE6AA",
          "#A5DFDF",
          "#CCB2FF",
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#B18AE0"],
        borderWidth: 3,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          caretSize: 8,
          bodyFont: {
            size: 15,
          },
        },
        legend: {
          position: "top",
          labels: {
            color: fontColor,
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
        },
      },
    },
  };
  return config;
}

// backgroundColor: [
//   "#FFB1C1",
//   "#9AD0F5",
//   "#FFE6AA",
//   "#A5DFDF",
//   "#CCB2FF",
// ],
// borderColor: ["#FF6384", "#36A2EB", "#FFCE56",'#4BC0C0','#B18AE0'],
// borderWidth: 3,

/*-------------------------------------------------------------*/
/*-----Horizontal bar------------------------------------------*/
/*-------------------------------------------------------------*/

function generateLabels(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    const buffName = arrField[i][0];
    if (arrField[i][1] !== 0) {
      data.push(cityAttributeName[`${buffName}`]);
    } else {
      nameUnusedProperties.push(cityAttributeName[`${buffName}`]);
    }
  }
  return data;
}

function createHorizontalBar(groupArr, start, end, label, fontColor = "black") {
  const labels = label;
  const dataSets = generateLabels(groupArr, start, end);
  const dataValue = generateDatas(groupArr, start, end);
  const data = {
    labels: labels,
    datasets: [
      {
        label: dataSets[0],
        data: [dataValue[0]],
        backgroundColor: "#93ABE8",
        borderColor: "#456DD0",
      },
      {
        label: dataSets[1],
        data: [dataValue[1]],
        backgroundColor: "#FF9840",
        borderColor: "#F43270",
      },
      {
        label: dataSets[2],
        data: [dataValue[2]],
        backgroundColor: "#CVF1240",
        borderColor: "#F4570",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: fontColor,
            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
        },
      },
    },
  };
  return config;
}

function checkDataGroupForNull(arrField, start, end) {
  let counter = 0;

  for (let i = start; i < end; i++) {
    if (arrField[i][0] !== 0) {
      counter++;
    }
  }

  if (counter === end - start) {
    for (let i = 18; i < 20; i++) {
      nameUnusedProperties.push(cityAttributeName[arrField[i][0]]);
    }
  } else {
    addChartToPage(`${arrField}`, routesCounter);
    new Chart(
      document.getElementById(`${chartName}-${routesCounter}`),
      createDoughnut(routes, 18, 20, "white")
    );
  }
}

/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
/*-----Add chart to page---------------------------------------*/
/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
function addChartToPage(nameGroup, index) {
  const newChart = document.createElement("canvas");
  const groupContainer = document.querySelector(`.${nameGroup}__container`);
  newChart.id = `${nameGroup}-${index}`;
  groupContainer.appendChild(newChart);
}

/*-------------------------------------------------------------*/
/*-----Unused and ungrouped properties-------------------------*/
/*-------------------------------------------------------------*/
let nameUnusedProperties = [];
let ungroupedProperties = [];

/*-------------------------------------------------------------*/
/*-----Unused properties---------------------------------------*/
/*-------------------------------------------------------------*/
function displayUnusedProperties(containerSelector) {
  let unusedList;
  for (let i = 0; i < nameUnusedProperties.length; i++) {
    if (i === 0) {
      const unusedWrapper = document.createElement("div");
      unusedWrapper.classList.add("unused__wrapper");
      document.querySelector(containerSelector).append(unusedWrapper);

      const unusedListTitle = document.createElement("h3");
      unusedListTitle.textContent = "Неиспользуемые свойства*";
      unusedWrapper.append(unusedListTitle);

      unusedList = document.createElement("ul");
      unusedList.classList.add("unused__list");
      unusedWrapper.append(unusedList);
    }

    const unuseElement = document.createElement("li");
    unuseElement.textContent = nameUnusedProperties[i];
    unusedList.append(unuseElement);
  }

  nameUnusedProperties = [];
}

/*-------------------------------------------------------------*/
/*-----Ungrouped properties------------------------------------*/
/*-------------------------------------------------------------*/

function displayUngroupedProperties(containerSelector) {
  let table;
  for (let i = 0; i < ungroupedProperties.length; i++) {
    if (i === 0) {
      const unusedWrapper = document.createElement("div");
      unusedWrapper.classList.add("ungrouped__wrapper");
      document.querySelector(containerSelector).append(unusedWrapper);

      table = document.createElement("table");
      table.classList.add("ungrouped__table");
      unusedWrapper.append(table);

      const caption = document.createElement("caption");
      caption.textContent = "Несгруппированные свойства";
      table.append(caption);

      const mainLine = document.createElement("tr");
      const mainPropertyName = document.createElement("th");
      const mainPropertyValue = document.createElement("th");
      mainPropertyName.textContent = "Название свойства";
      mainPropertyValue.textContent = "Значение свойства";

      mainLine.append(mainPropertyName);
      mainLine.append(mainPropertyValue);
      table.append(mainLine);
    }

    const line = document.createElement("tr");

    const propertyName = document.createElement("td");
    const propertyValue = document.createElement("td");
    propertyName.textContent = ungroupedProperties[i][0];
    propertyValue.textContent = ungroupedProperties[i][1];

    line.append(propertyName);
    line.append(propertyValue);
    table.append(line);
  }

  ungroupedProperties = [];
}
/*-------------------------------------------------------------*/
/*-----Quality-------------------------------------------------*/
/*-------------------------------------------------------------*/

addChartToPage("quality", 1);
new Chart(
  document.getElementById("quality-1"),
  createPolarArea(qualityGroups, 0, 5)
);

/*-------------------------------------------------------------*/
/*-----Spatial-------------------------------------------------*/
/*-------------------------------------------------------------*/

let spatialCounter = 0;
for (let i = 8; i < 17; i++) {
  if (spatial[i][1] !== 0) {
    spatialCounter++;
    addChartToPage("spatial", spatialCounter);
    new Chart(
      document.getElementById(`spatial-${spatialCounter}`),
      createPie(spatial, i, i + 1, "white")
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[spatial[i][0]]);
  }
}

for (let i = 19; i < 23; i++) {
  if (spatial[i][1] !== 0) {
    spatialCounter++;
    addChartToPage("spatial", spatialCounter);
    new Chart(
      document.getElementById(`spatial-${spatialCounter}`),
      createDoughnut(spatial, i, i + 1, "white")
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[spatial[i][0]]);
  }
}

spatialCounter++;
addChartToPage("spatial", spatialCounter);
new Chart(
  document.getElementById(`spatial-${spatialCounter}`),
  createDoughnut(spatial, 24, 30, "white")
);

ungroupedProperties.push([
  cityAttributeName.num_population,
  allPropertiesCity.num_population,
]);
ungroupedProperties.push([
  cityAttributeName.length_UDS,
  allPropertiesCity.length_UDS,
]);
ungroupedProperties.push([
  cityAttributeName.area_active_city_zone,
  allPropertiesCity.area_active_city_zone,
]);
ungroupedProperties.push([
  cityAttributeName.traffic_ground_transport,
  allPropertiesCity.traffic_ground_transport,
]);
ungroupedProperties.push([
  cityAttributeName.traffic_metro,
  allPropertiesCity.traffic_metro,
]);
ungroupedProperties.push([
  cityAttributeName.num_working_stops_overall,
  allPropertiesCity.num_working_stops_overall,
]);
ungroupedProperties.push([
  cityAttributeName.num_working_stops_active_city_zone,
  allPropertiesCity.num_working_stops_active_city_zone,
]);
ungroupedProperties.push([
  cityAttributeName.num_of_apartments,
  allPropertiesCity.num_of_apartments,
]);
ungroupedProperties.push([
  cityAttributeName.area_metro_coverage,
  allPropertiesCity.area_metro_coverage,
]);
ungroupedProperties.push([
  cityAttributeName.density_stops_active_zone,
  allPropertiesCity.density_stops_active_zone,
]);
ungroupedProperties.push([
  cityAttributeName.avrg_length_between_stops,
  allPropertiesCity.avrg_length_between_stops,
]);
displayUngroupedProperties(".spatial__container");

displayUnusedProperties(".spatial__container");

/*-------------------------------------------------------------*/
/*-----Rolling stock-------------------------------------------*/
/*-------------------------------------------------------------*/
let rollingStockCounter = 0;

rollingStockCounter++;
addChartToPage("rolling-stock", rollingStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollingStockCounter}`),
  createPie(rollingStock, 0, 5)
);

rollingStockCounter++;
addChartToPage("rolling-stock", rollingStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollingStockCounter}`),
  createDoughnut(rollingStock, 5, 10)
);

for (let i = 10; i < 15; i++) {
  if (rollingStock[i][1] !== 0) {
    rollingStockCounter++;
    addChartToPage("rolling-stock", rollingStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollingStockCounter}`),
      createDoughnutProcent(rollingStock, i, i + 1)
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollingStock[i][0]]);
  }
}

rollingStockCounter++;
addChartToPage("rolling-stock", rollingStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollingStockCounter}`),
  createPie(rollingStock, 15, 20)
);

rollingStockCounter++;
addChartToPage("rolling-stock", rollingStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollingStockCounter}`),
  createPie(rollingStock, 20, 23)
);

///
// rollingStockCounter++;
// addChartToPage("rolling-stock", rollingStockCounter);
// new Chart(
//   document.getElementById(`rolling-stock-${rollingStockCounter}`),
//   createDoughnut(rollingStock, 23, 26)
// );

///
rollingStockCounter++;
checkDataGroupForNull(rollingStock, 23, 26);
// checkDataGroupForNull(rollingStock, 23, 26, 'rolling-stock');
///

rollingStockCounter++;
addChartToPage("rolling-stock", rollingStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollingStockCounter}`),
  createDoughnut(rollingStock, 26, 31)
);

rollingStockCounter++;
addChartToPage("rolling-stock", rollingStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollingStockCounter}`),
  createPie(rollingStock, 31, 35)
);

for (let i = 37; i < 41; i++) {
  if (rollingStock[i][1] !== 0) {
    rollingStockCounter++;
    addChartToPage("rolling-stock", rollingStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollingStockCounter}`),
      createDoughnut(rollingStock, i, i + 1)
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollingStock[i][0]]);
  }
}

ungroupedProperties.push([
  cityAttributeName.num_new_GET,
  allPropertiesCity.num_new_GET,
]);
ungroupedProperties.push([
  cityAttributeName.num_new_buses,
  allPropertiesCity.num_new_buses,
]);
displayUngroupedProperties(".rolling-stock__container");

displayUnusedProperties(".rolling-stock__container");

/*-------------------------------------------------------------*/
/*-----Routes--------------------------------------------------*/
/*-------------------------------------------------------------*/

let routesCounter = 0;

routesCounter++;
addChartToPage("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createPie(routes, 0, 4, "white")
);

routesCounter++;
addChartToPage("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createPie(routes, 4, 7, "white")
);

routesCounter++;
addChartToPage("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createDoughnut(routes, 7, 10, "white")
);

routesCounter++;
addChartToPage("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createDoughnut(routes, 10, 14, "white")
);

if (routes[15][1] !== 0) {
  routesCounter++;
  addChartToPage("routes", routesCounter);
  new Chart(
    document.getElementById(`routes-${routesCounter}`),
    createDoughnut(routes, 15, 16, "white")
  );
} else {
  nameUnusedProperties.push(cityAttributeName[routes[i][0]]);
}

routesCounter++;
checkDataGroupForNull(routes, 18, 20);

routesCounter++;
addChartToPage("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createHorizontalBar(routes, 20, 22, ["Маршрут"], "white")
);

ungroupedProperties.push([
  cityAttributeName.length_overall_nonrailed_transport_path,
  allPropertiesCity.length_overall_nonrailed_transport_path,
]);

displayUngroupedProperties(".routes__container");

displayUnusedProperties(".routes__container");

/*-------------------------------------------------------------*/
/*-----Tariff--------------------------------------------------*/
/*-------------------------------------------------------------*/
let tariffCounter = 0;

tariffCounter++;
addChartToPage("tariff", tariffCounter);
new Chart(
  document.getElementById(`tariff-${tariffCounter}`),
  createHorizontalBar(tariffSystem, 7, 10, ["Стоимость"], "black")
);

tariffCounter++;
addChartToPage("tariff", tariffCounter);
new Chart(
  document.getElementById(`tariff-${tariffCounter}`),
  createDoughnut(tariffSystem, 10, 16)
);

ungroupedProperties.push([
  cityAttributeName.avrg_region_salary,
  allPropertiesCity.avrg_region_salary,
]);
ungroupedProperties.push([
  cityAttributeName.avrg_region_income,
  allPropertiesCity.avrg_region_income,
]);
ungroupedProperties.push([
  cityAttributeName.price_monthly_transport_pass,
  allPropertiesCity.price_monthly_transport_pass,
]);
ungroupedProperties.push([
  cityAttributeName.ratio_pass_cost_to_income,
  allPropertiesCity.ratio_pass_cost_to_income,
]);
ungroupedProperties.push([
  cityAttributeName.num_routes_with_pass,
  allPropertiesCity.num_routes_with_pass,
]);
ungroupedProperties.push([
  cityAttributeName.num_routes_with_transfer_pass,
  allPropertiesCity.num_routes_with_transfer_pass,
]);

displayUngroupedProperties(".tariff__container");

displayUnusedProperties(".tariff__container");
