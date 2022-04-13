const citiesUnparsed = JSON.parse(
  document.getElementById("cities-list-json").textContent
);
console.log(citiesUnparsed);
const arrCitites = [];
for (let i = 0; i < citiesUnparsed.length; i++) {
  arrCitites.push(JSON.parse(citiesUnparsed[i]));
}

/*-------------------------------------------------------------*/
/*-----Generate datas------------------------------------------*/
/*-------------------------------------------------------------*/

function generateDatas(start, end) {
  let data = [];
  for (let i = start; i < end; i++) {
    data.push(i + 1);
  }
  return data;
}

function generateLabels(start, end) {
  let labels = [];
  for (let i = start; i < end; i++) {
    labels.push(arrCitites[i].name);
  }
  return labels;
}

function createNewChart(start, end) {
  const labels = generateLabels(start, end);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Безопасность и устойчивое развитие",
        data: generateDatas(start, end),
        backgroundColor: "#864AFF",
      },
      {
        label: "Комфорт и удобство",
        data: generateDatas(start, end),
        backgroundColor: "#FF6384",
      },
      {
        label: "Эффективность маршрутной сети",
        data: generateDatas(start, end),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Ценовая доступность",
        data: generateDatas(start, end),
        backgroundColor: "#FFCE56",
      },
      {
        label: "Физическая доступность",
        data: generateDatas(start, end),
        backgroundColor: "#4BC0C0",
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
          text: "Рейтинг городов по основным показателям",
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

console.log(document.getElementById("example"));
new Chart(document.getElementById("group-1"), createNewChart(0, 20));
new Chart(document.getElementById("group-2"), createNewChart(20, 40));
new Chart(document.getElementById("group-3"), createNewChart(40, 60));
new Chart(document.getElementById("group-4"), createNewChart(60, 76));