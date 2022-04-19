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

// console.log(arrCitites[0].region);

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
console.log(arrCitites);
new Chart(
  document.getElementById(`top-10`),
  addChartToPage(0, 10, "TOP-10", arrCitites)
);

// ("rating_security_n_development");
// ("rating_comfort_n_convenience");
// ("rating_route_network_efficiency");
// ("rating_affordability");
// ("rating_physical_availability");
