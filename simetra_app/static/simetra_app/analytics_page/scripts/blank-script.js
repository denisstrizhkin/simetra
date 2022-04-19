const citiesUnparsed = JSON.parse(
  document.getElementById("cities-list-json").textContent
);

const arrCitites = [];
for (let i = 0; i < citiesUnparsed.length; i++) {
  arrCitites.push(JSON.parse(citiesUnparsed[i]));
}
console.log(arrCitites);
let filteredList;
/*-------------------------------------------------------------*/
/*-----Generate datas------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatas(start, end, property) {
  let data = [];
  for (let i = start; i < end; i++) {
    data.push(filteredList[i][property]);
  }
  return data;
}

function generateLabels(start, end) {
  let labels = [];
  for (let i = start; i < end; i++) {
    labels.push(filteredList[i].russian_name);
  }
  return labels;
}

function createNewChart(start, end, regionName) {
  const labels = generateLabels(start, end);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Безопасность и устойчивое развитие",
        data: generateDatas(start, end, "rating_security_n_development"),
        backgroundColor: "#CCB2FF",
        borderColor: "#B18AE0",
        borderWidth: 2,


      },
      {
        label: "Комфорт и удобство",
        data: generateDatas(start, end, "rating_comfort_n_convenience"),
        // backgroundColor: "#FF6384",
        // borderColor: "rgb(255,177,193",

        backgroundColor: "#FFB1C1",
        borderColor: "#FF6384",

        borderWidth: 2,
        // rgb(255,177,193)

      },
      {
        label: "Эффективность маршрутной сети",
        data: generateDatas(start, end, "rating_route_network_efficiency"),
        backgroundColor: "#9AD0F5",
        borderColor: "#36A2EB",
        borderWidth: 2,
      },
      {
        label: "Ценовая доступность",
        data: generateDatas(start, end, "rating_affordability"),
        backgroundColor: "#FFE6AA",
        borderColor: "#FFCE56",
        borderWidth: 2,
      },
      {
        label: "Физическая доступность",
        data: generateDatas(start, end, "rating_physical_availability"),
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

// console.log(arrCitites[0].region);

const countyNames = ["ЦФО", "СЗФО", "ЮФО", "СКФО", "ПФО", "УФО", "СФО", "ДФО"];
for (let i = 0; i < countyNames.length; i++) {
  filteredList = arrCitites.filter((city) => city.region === countyNames[i]);

  new Chart(
    document.getElementById(`county-${i + 1}`),
    createNewChart(0, filteredList.length, countyNames[i])
  );
}
