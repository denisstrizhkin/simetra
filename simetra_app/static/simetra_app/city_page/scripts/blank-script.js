"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities_attrs_by_groups_list_json").textContent
);

const subgroups = JSON.parse(citiesUnparsed[0]);

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
  rollinStock = Object.entries(JSON.parse(subgroups["ПОДВИЖНОЙ СОСТАВ"][0])),
  routes = Object.entries(JSON.parse(subgroups["МАРШРУТЫ"][0])),
  tariffSystem = Object.entries(JSON.parse(subgroups["ТАРИФНАЯ СИСТЕМА"][0]));

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
        label: "Dataset 1",
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "#E08A8E",
          "#6F80FF",
          "#DFE08B",
          "#85DEB1",
          "#B18AE0",
        ],
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
            // color: "#ffffff",
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
          "#E08A8E",
          "#6F80FF",
          "#DFE08B",
          "#85DEB1",
          "#B18AE0",
        ],
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
          "#E08A8E",
          "#6F80FF",
          "#DFE08B",
          "#85DEB1",
          "#B18AE0",
        ],
        borderColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1)",
          "rgba(75, 192, 192,1)",
          "rgba(153, 102, 255,1)",
        ],
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
/*-----Multi Series Pie----------------------------------------*/
/*-------------------------------------------------------------*/

// function generateMultiDatas(arrField, start, end) {
//   let data = [];
//   for (let i = start; i < end; i++) {
//     if (arrField[i][1] !== 0) {
//       const dataBuff = []
//       dataBuff.push(arrField[i][1]);
//       dataBuff.push(100 - arrField[i][1]);

//       data.push(dataBuff);
//     } else {
//       unusedProperties.push(arrField[i][1]);
//     }
//   }
//   return data;
// }

function generateMultiLabels(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    const buffName = arrField[i][0];
    if (arrField[i][1] !== 0) {
      data.push(cityAttributeName[`${buffName}`]);
      data.push(`Оставшийся процент`);
    } else {
      data.push(`Нет данных`);
      data.push(`Нет данных`);
      // data.push(`Оставшийся процент`);
      nameUnusedProperties.push(cityAttributeName[`${buffName}`]);
    }
  }
  return data;
}

function createNewMultiSeriesPie(groupArr, start, end) {
  const data = {
    labels: generateMultiLabels(groupArr, start, end),
    datasets: [
      {
        backgroundColor: ["#33C2C7", "#60EEC4"],
        data: [groupArr[start][1], 100 - groupArr[start][1]],
      },
      {
        backgroundColor: ["#FF9840", "#FFB270"],
        data: [groupArr[start + 1][1], 100 - groupArr[start + 1][1]],
      },
      {
        backgroundColor: ["#456DD0", "#93ABE8"],
        data: [groupArr[start + 2][1], 100 - groupArr[start + 2][1]],
      },
      {
        backgroundColor: ["#39E143", "#163788"],
        data: [groupArr[start + 3][1], 100 - groupArr[start + 3][1]],
      },
      {
        backgroundColor: ["#33C2C7", "#60EEC4"],
        data: [groupArr[start + 4][1], 100 - groupArr[start + 4][1]],
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
          labels: {
            font: {
              size: 20,
            },
            generateLabels: function (chart) {
              const original =
                Chart.overrides.pie.plugins.legend.labels.generateLabels;
              const labelsOriginal = original.call(this, chart);

              var datasetColors = chart.data.datasets.map(function (e) {
                return e.backgroundColor;
              });
              datasetColors = datasetColors.flat();

              labelsOriginal.forEach((label) => {
                label.datasetIndex = (label.index - (label.index % 2)) / 2;

                label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                label.fillStyle = datasetColors[label.index];
              });

              return labelsOriginal;
            },
          },
          onClick: function (mouseEvent, legendItem, legend) {
            legend.chart.getDatasetMeta(legendItem.datasetIndex).hidden =
              legend.chart.isDatasetVisible(legendItem.datasetIndex);
            legend.chart.update();
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const labelIndex = context.datasetIndex * 2 + context.dataIndex;
              return (
                context.chart.data.labels[labelIndex] +
                ": " +
                context.formattedValue
              );
            },
          },
        },
      },
    },
  };
  return config;
}

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
          position: "right",
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
/*-------------------------------------------------------------*/
/*-----Creating charts-----------------------------------------*/
/*-------------------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewChart(nameGroup, index) {
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
  let unusedList;
  for (let i = 0; i < ungroupedProperties.length; i++) {
    if (i === 0) {
      const unusedWrapper = document.createElement("div");
      unusedWrapper.classList.add("unused__wrapper");
      document.querySelector(containerSelector).append(unusedWrapper);

      const unusedListTitle = document.createElement("h3");
      unusedListTitle.textContent = "Несгруппированные свойства";
      unusedWrapper.append(unusedListTitle);

      unusedList = document.createElement("ul");
      unusedList.classList.add("unused__list");
      unusedWrapper.append(unusedList);
    }

    const unuseElement = document.createElement("li");
    unuseElement.textContent = `${ungroupedProperties[i][0]}: ${ungroupedProperties[i][1]}`;
    unusedList.append(unuseElement);
  }

  ungroupedProperties = [];
}
/*-------------------------------------------------------------*/
/*-----Quality-------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("quality", 1);
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
    createNewChart("spatial", spatialCounter);
    new Chart(
      document.getElementById(`spatial-${spatialCounter}`),
      createDoughnut(spatial, i, i + 1, "white")
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[spatial[i][0]]);
  }
}

for (let i = 19; i < 23; i++) {
  if (spatial[i][1] !== 0) {
    spatialCounter++;
    createNewChart("spatial", spatialCounter);
    new Chart(
      document.getElementById(`spatial-${spatialCounter}`),
      createDoughnut(spatial, i, i + 1, "white")
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[spatial[i][0]]);
  }
}

spatialCounter++;
createNewChart("spatial", spatialCounter);
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
let rollinStockCounter = 0;

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createPie(rollinStock, 0, 5)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createDoughnut(rollinStock, 5, 10)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createNewMultiSeriesPie(rollinStock, 10, 15)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createDoughnut(rollinStock, 15, 20)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createDoughnut(rollinStock, 20, 23)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createDoughnut(rollinStock, 23, 26)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createDoughnut(rollinStock, 26, 31)
);

rollinStockCounter++;
createNewChart("rolling-stock", rollinStockCounter);
new Chart(
  document.getElementById(`rolling-stock-${rollinStockCounter}`),
  createDoughnut(rollinStock, 31, 35)
);

for (let i = 37; i < 41; i++) {
  if (rollinStock[i][1] !== 0) {
    rollinStockCounter++;
    createNewChart("rolling-stock", rollinStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollinStockCounter}`),
      createDoughnut(rollinStock, i, i + 1)
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollinStock[i][0]]);
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
createNewChart("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createPie(routes, 0, 4, "white")
);

routesCounter++;
createNewChart("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createPie(routes, 4, 7, "white")
);

routesCounter++;
createNewChart("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createDoughnut(routes, 7, 10, "white")
);

routesCounter++;
createNewChart("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createDoughnut(routes, 10, 14, "white")
);

if (routes[15][1] !== 0) {
  routesCounter++;
  createNewChart("routes", routesCounter);
  new Chart(
    document.getElementById(`routes-${routesCounter}`),
    createDoughnut(routes, 15, 16, "white")
  );
} else {
  nameUnusedProperties.push(cityAttributeName[routes[i][0]]);
}

routesCounter++;
createNewChart("routes", routesCounter);
new Chart(
  document.getElementById(`routes-${routesCounter}`),
  createDoughnut(routes, 18, 20, "white")
);

routesCounter++;
createNewChart("routes", routesCounter);
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
createNewChart("tariff", tariffCounter);
new Chart(
  document.getElementById(`tariff-${tariffCounter}`),
  createHorizontalBar(tariffSystem, 7, 10, ["Стоимость"], "black")
);

tariffCounter++;
createNewChart("tariff", tariffCounter);
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
