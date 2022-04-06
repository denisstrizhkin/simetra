"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities_attrs_by_groups_list_json").textContent
);

const featureGroups = JSON.parse(citiesUnparsed[0]);

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
    data.push(arrField[i][1]);
  }
  return data;
}

function generateLabels(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    const buffName = arrField[i][0];
    data.push(cityAttributeName[`${buffName}`]);
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
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Polar Area Chart",
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Bar-----------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewBar(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        label: "Пространственные характеристики",
        data: generateDatas(groupArr, start, end),
        backgroundColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1)",
          "rgba(75, 192, 192,1)",
          "rgba(153, 102, 255,1)",
        ],
        stack: "combined",
        type: "bar",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Bubble--------------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatasForBubble(groupArr, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    data.push({
      x: groupArr[i][1],
      y: (i + 1) * 10,
      r: 20,
    });
  }
  return data;
}

function createNewBubble(groupArr, start, end) {
  const data = {
    datasets: [
      {
        label: "dataSet",
        data: generateDatasForBubble(groupArr, start, end),
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
    type: "bubble",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bubble Chart",
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Radar---------------------------------------------------*/
/*-------------------------------------------------------------*/

function createNewRadar(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      plugins: {
        legend: false,
        tooltip: false,
      },
      elements: {
        line: {
          backgroundColor: "#00A82D",
          borderColor: "#00A82D",
        },
        point: {
          backgroundColor: "rgba(54, 162, 235,1)",
          hoverBackgroundColor: "rgba(54, 162, 235,1)",
          radius: 10,
          pointStyle: "circle",
          hoverRadius: 15,
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Pie-----------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewPie(groupArr, start, end) {
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
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
      },
    },
  };
  return config;
}

/*-------------------------------------------------------------*/
/*-----Doughnut------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewDoughnut(groupArr, start, end) {
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
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    },
  };
  return config;
}
/*-------------------------------------------------------------*/
/*-----Horizontal Bar Chart------------------------------------*/
/*-------------------------------------------------------------*/

function horizontalBarChart(groupArr, start, end) {
  const data = {
    labels: generateLabels(groupArr, start, end),
    datasets: [
      {
        data: generateDatas(groupArr, start, end),
        borderColor: "white",
        backgroundColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1)",
          "rgba(75, 192, 192,1)",
          "rgba(153, 102, 255,1)",
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
    type: "horizontalBar",
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
        },
        title: {
          display: true,
          text: "Chart.js Horizontal Bar Chart",
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

/*-------------------------------------------------------------*/
/*-----Quality-------------------------------------------------*/
/*-------------------------------------------------------------*/

new Chart(
  document.getElementById("quality-1"),
  createNewPolarArea(qualityGroups, 0, 5)
);

/*-------------------------------------------------------------*/
/*-----Spatial-------------------------------------------------*/
/*-------------------------------------------------------------*/

new Chart(
  document.getElementById("spatial-1"),
  createNewBar(spatialCharacteristics, 0, 5)
);

/*-------------------------------------------------------------*/
/*-----Analysis------------------------------------------------*/
/*-------------------------------------------------------------*/
new Chart(
  document.getElementById("rolling-stock-1"),
  createNewPie(rollinStock, 0, 5)
);
new Chart(
  document.getElementById("rolling-stock-2"),
  createNewDoughnut(rollinStock, 5, 10)
);

const analysisContainer = document.querySelector(".rolling-stock__container");

for (let i = 10, j = 3; i < 15; i++, j++) {
  const newChart = document.createElement("canvas");
  newChart.id = `rolling-stock-${j}`;
  analysisContainer.append(newChart);
  new Chart(
    document.getElementById(newChart.id),
    createNewDoughnut(rollinStock, i, i + 1)
  );
}

// for (let i = 16, j = 8; i < 25; i+=4, j++) {
//   const newChart = document.createElement('canvas');
//   newChart.id = `analysis-${j}`;
//   analysisContainer.append(newChart);
//   new Chart(document.getElementById(newChart.id), createNewDoughnut(i, i + 4, rollinStock));
// }

//33C2C7
//60EEC4

/*-------------------------------------------------------------*/
/*-----Routes--------------------------------------------------*/
/*-------------------------------------------------------------*/

new Chart(document.getElementById("routes-1"), createNewRadar(routes, 0, 6));

/*-------------------------------------------------------------*/
/*-----Tariff--------------------------------------------------*/
/*-------------------------------------------------------------*/
new Chart(
  document.getElementById("tariff-1"),
  horizontalBarChart(tariffSystem, 3, 16)
);
