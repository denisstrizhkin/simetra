"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities_attrs_by_groups_list_json").textContent
);

const featureGroups = JSON.parse(citiesUnparsed[0]);

const nameFeatureGroups = [
  "Качественные группы",
  "Пространственные характеристики",
  "Подвижной состав",
  "Маршруты",
  "Тарифная система",
];
const qualityGroups = Object.entries(
    JSON.parse(featureGroups["КАЧЕСТВЕННЫЕ ГРУППЫ"][0])
  ),
  spatialCharacteristics = Object.entries(
    JSON.parse(featureGroups["ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ"][0])
  ),
  rollinStock = Object.entries(
    JSON.parse(featureGroups["ПОДВИЖНОЙ СОСТАВ"][0])
  ),
  routes = Object.entries(JSON.parse(featureGroups["МАРШРУТЫ"][0])),
  tariffSystem = Object.entries(
    JSON.parse(featureGroups["ТАРИФНАЯ СИСТЕМА"][0])
  );

const citiesAttrVerboseNameUnparsed = JSON.parse(
  document.getElementById("city_attr_verbose_names_list_json").textContent
);
const cityAttributeName = JSON.parse(citiesAttrVerboseNameUnparsed[0]);

function generateDatas(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    if (arrField[i][1] !== 0) {
      data.push(arrField[i][1]);
    } else {
      unusedProperties.push(arrField[i][1]);
    }
  }
  return data;
}

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

/*-------------------------------------------------------------*/
/*-----Polar Area----------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewPolarArea(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        label: "Dataset 1",
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
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
function createNewPie(groupArr, start, end, fontColor = "black") {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
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
function createNewDoughnut(groupArr, start, end, fontColor = "black") {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
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
/*-----Unused properties and ungrouped properties--------------*/
/*-------------------------------------------------------------*/
let unusedProperties = [];
let nameUnusedProperties = [];

let ungroupedProperties = [];
let ungroupedPropertiesName = [];

/*-------------------------------------------------------------*/
/*-----Unused--------------------------------------------------*/
/*-------------------------------------------------------------*/
function displayUnusedProperties(containerSelector) {
  console.log(document.querySelector(containerSelector));
  let unusedList;
  for (let i = 0; i < unusedProperties.length; i++) {
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
    unuseElement.textContent = `${nameUnusedProperties[i]}`;
    unusedList.append(unuseElement);
  }

  unusedProperties = [];
  nameUnusedProperties = [];
}

/*-------------------------------------------------------------*/
/*-----Quality-------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("quality", 1);
new Chart(
  document.getElementById("quality-1"),
  createNewPolarArea(qualityGroups, 0, 5)
);

/*-------------------------------------------------------------*/
/*-----Spatial-------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("spatial", 1);
new Chart(
  document.getElementById("spatial-1"),
  createNewPie(spatialCharacteristics, 0, 5, "white")
);
displayUnusedProperties(".spatial__container");

createNewChart("spatial", 2);
new Chart(
  document.getElementById("spatial-2"),
  createNewDoughnut(spatialCharacteristics, 5, 8, "white")
);
displayUnusedProperties(".spatial__container");

createNewChart("spatial", 3);
new Chart(
  document.getElementById("spatial-3"),
  createNewDoughnut(spatialCharacteristics, 8, 13, "white")
);
displayUnusedProperties(".spatial__container");

createNewChart("spatial", 4);
new Chart(
  document.getElementById("spatial-4"),
  createNewDoughnut(spatialCharacteristics, 13, 18, "white")
);
displayUnusedProperties(".spatial__container");

createNewChart("spatial", 5);
new Chart(
  document.getElementById("spatial-5"),
  createNewDoughnut(spatialCharacteristics, 18, 20, "white")
);
displayUnusedProperties(".spatial__container");

createNewChart("spatial", 6);
new Chart(
  document.getElementById("spatial-6"),
  createNewDoughnut(spatialCharacteristics, 25, 30, "white")
);
displayUnusedProperties(".spatial__container");

/*-------------------------------------------------------------*/
/*-----Rolling stock-------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("rolling-stock", 1);
new Chart(
  document.getElementById("rolling-stock-1"),
  createNewPie(rollinStock, 0, 5)
);
displayUnusedProperties(".rolling-stock__container");


createNewChart("rolling-stock", 2);
new Chart(
  document.getElementById("rolling-stock-2"),
  createNewDoughnut(rollinStock, 5, 10)
);
displayUnusedProperties(".rolling-stock__container");

/*-----Procent-------------------------------------------*/
createNewChart("rolling-stock", 3);
new Chart(
  document.getElementById("rolling-stock-3"),
  createNewMultiSeriesPie(rollinStock, 10, 15)
);
displayUnusedProperties(".rolling-stock__container");

/*-------------------------------------------------------------*/
createNewChart("rolling-stock", 4);
new Chart(
  document.getElementById("rolling-stock-4"),
  createNewDoughnut(rollinStock, 15, 20)
);
displayUnusedProperties(".rolling-stock__container");

createNewChart("rolling-stock", 5);
new Chart(
  document.getElementById("rolling-stock-5"),
  createNewDoughnut(rollinStock, 25, 30)
);
displayUnusedProperties(".rolling-stock__container");

createNewChart("rolling-stock", 6);
new Chart(
  document.getElementById("rolling-stock-6"),
  createNewDoughnut(rollinStock, 30, 35)
);
displayUnusedProperties(".rolling-stock__container");

createNewChart("rolling-stock", 7);
new Chart(
  document.getElementById("rolling-stock-7"),
  createNewDoughnut(rollinStock, 35, 40)
);
displayUnusedProperties(".rolling-stock__container");

createNewChart("rolling-stock", 8);
new Chart(
  document.getElementById("rolling-stock-8"),
  createNewDoughnut(rollinStock, 40, 42)
);
displayUnusedProperties(".rolling-stock__container");

/*-------------------------------------------------------------*/
/*-----Routes--------------------------------------------------*/
/*-------------------------------------------------------------*/

createNewChart("routes", 1);
new Chart(
  document.getElementById("routes-1"),
  createNewPie(routes, 0, 4, "white")
);
displayUnusedProperties(".routes__container");


createNewChart("routes", 2);
new Chart(
  document.getElementById("routes-2"),
  createNewPie(routes, 4, 7, "white")
);
displayUnusedProperties(".routes__container");



createNewChart("routes", 3);
new Chart(
  document.getElementById("routes-3"),
  createNewDoughnut(routes, 7, 10, "white")
);
displayUnusedProperties(".routes__container");


createNewChart("routes", 4);
new Chart(
  document.getElementById("routes-4"),
  createNewDoughnut(routes, 10, 14, "white")
);
displayUnusedProperties(".routes__container");


// !!! Data
createNewChart("routes", 5);
new Chart(
  document.getElementById("routes-5"),
  createNewDoughnut(routes, 14, 19, "white")
);
displayUnusedProperties(".routes__container");


createNewChart("routes", 6);
new Chart(
  document.getElementById("routes-6"),
  createNewDoughnut(routes, 19, 21, "white")
);
displayUnusedProperties(".routes__container");


// !!! Data
createNewChart("routes", 7);
new Chart(
  document.getElementById("routes-7"),
  createNewDoughnut(routes, 21, 26, "white")
);
displayUnusedProperties(".routes__container");


// !!! Data
// ??? 30f
createNewChart("routes", 8);
new Chart(
  document.getElementById("routes-8"),
  createNewDoughnut(routes, 26, 29, "white")
);
displayUnusedProperties(".routes__container");


/*-------------------------------------------------------------*/
/*-----Tariff--------------------------------------------------*/
/*-------------------------------------------------------------*/
createNewChart("tariff", 1);
new Chart(document.getElementById("tariff-1"), createNewPie(routes, 0, 5));
displayUnusedProperties(".tariff__container");


createNewChart("tariff", 2);
new Chart(
  document.getElementById("tariff-2"),
  createNewDoughnut(tariffSystem, 5, 10)
);
displayUnusedProperties(".tariff__container");


createNewChart("tariff", 3);
new Chart(
  document.getElementById("tariff-3"),
  createNewDoughnut(tariffSystem, 10, 16)
);
displayUnusedProperties(".tariff__container");
