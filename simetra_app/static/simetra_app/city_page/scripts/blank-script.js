"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities-list-json").textContent
);

const nameCity = document.location.pathname.slice(
  8,
  document.location.pathname.length - 1
);

function findCity() {
  for (let i = 0; i < citiesUnparsed.length; i++) {
    const cityUnparsed = citiesUnparsed[i];
    const city = JSON.parse(cityUnparsed);
    if (city["name"] === nameCity) {
      return city;
    }
  }
}
const cityObj = findCity();

// function generateData(index) {
//   return {
//     category: Object.keys(cityObj)[index],
//     value: Object.values(cityObj)[index],
//   };
// }

function generateDatas(objectField) {
  let data = [];
  for (let i = 3; i < 8; i++) {
    data.push(objectField[i]);
  }
  return data;
}

const data = {
  labels: generateDatas(Object.keys(cityObj)),
  datasets: [
    {
      label: "Dataset 1",
      data: generateDatas(Object.values(cityObj)),
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

const myChart = new Chart(document.getElementById("myChart"), config);
