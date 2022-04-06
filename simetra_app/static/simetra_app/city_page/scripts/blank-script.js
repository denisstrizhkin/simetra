"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities_attrs_by_groups_list_json").textContent
);

const featureGroups = JSON.parse(citiesUnparsed[0]);

const qualityGroups = Object.entries(
  JSON.parse(featureGroups["КАЧЕСТВЕННЫЕ ГРУППЫ"][0])
);
const spatialCharacteristics = Object.entries(
  JSON.parse(featureGroups["ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ"][0])
);
const rollinStock = Object.entries(
  JSON.parse(featureGroups["ПОДВИЖНОЙ СОСТАВ"][0])
);
const routes = Object.entries(JSON.parse(featureGroups["МАРШРУТЫ"][0]));
const tariffSystem = Object.entries(
  JSON.parse(featureGroups["ТАРИФНАЯ СИСТЕМА"][0])
);

// console.log(qualityGroups);
// console.log(spatialCharacteristics);
// console.log(rollinStock);
// console.log(routes);
// console.log(tariffSystem);

const citiesAttrVerboseNameUnparsed = JSON.parse(
  document.getElementById("city_attr_verbose_names_list_json").textContent
);

const cityAttributeName = JSON.parse(citiesAttrVerboseNameUnparsed[0]);

function generateDatas(arrField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    // console.log(arrField);
    data.push(arrField[i][1]);
  }
  return data;
}

function generateLabels(arrField, start, end) {
  let data = [];

  for (let i = start; i < end; i++) {
    // console.log(arrField[i][0]);
    const buffName = arrField[i][0];
    // console.log(cityAttributeName[`${buffName}`]);
    // console.log(cityAttributeName.buffName);
    data.push(cityAttributeName[`${buffName}`]);
  }
  return data;
}

/*-------------------------------------------------------------*/
/*-----Polar Area----------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewPolarArea(start, end) {
  const data = {
    labels: generateLabels(qualityGroups, start, end),
    datasets: [
      {
        label: "Dataset 1",
        data: generateDatas(qualityGroups, start, end),
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
new Chart(document.getElementById("myChart-1"), createNewPolarArea(0, 5));

/*-------------------------------------------------------------*/
/*-----Bar-----------------------------------------------------*/
/*-------------------------------------------------------------*/
function createNewBar(start, end) {
  const data = {
    labels: generateLabels(spatialCharacteristics, start, end),
    datasets: [
      {
        label: "Пространственные характеристики",
        data: generateDatas(spatialCharacteristics, start, end),
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
new Chart(document.getElementById("myChart-2"), createNewBar(0, 5));


/*-------------------------------------------------------------*/
/*-----Bubble--------------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatasForBubble(objectField, start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    data.push({
      x: objectField[i][1],
      y: (i + 1) * 10,
      r: 20,
    });
  }
  return data;
}

function createNewBubble(start, end) {
  const data = {
    // labels: generateDatas(Object.keys(cityObj), start, end),
    datasets: [
      {
        label: "dataSet",
        data: generateDatasForBubble(rollinStock, start, end),
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

new Chart(document.getElementById("myChart-3"), createNewBubble(0, 5));


/*-------------------------------------------------------------*/
/*-----Radar---------------------------------------------------*/
/*-------------------------------------------------------------*/

function createNewRadar(start, end) {
  const data = {
    labels: generateLabels(routes, start, end),
    datasets: [
      {
        data: generateDatas(routes, start, end),
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
new Chart(document.getElementById("myChart-4"), createNewRadar(0, 5));


/*-------------------------------------------------------------*/
/*-----Radar regular-------------------------------------------*/
/*-------------------------------------------------------------*/

function createNewRadarRegular(start, end) {
  const data = {
    labels: generateLabels(tariffSystem, start, end),
    datasets: [
      {
        data: generateDatas(tariffSystem, start, end),
        borderColor: "white",
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
    type: "radar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Radar Chart",
        },
      },
    },
  };
  return config;
}

new Chart(
  document.getElementById("myChart-5"),
  createNewRadarRegular(0, 6)
);
