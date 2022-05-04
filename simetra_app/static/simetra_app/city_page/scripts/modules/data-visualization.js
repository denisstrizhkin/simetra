"use strict";

function dataVisualization() {
  const longitude = document.querySelector(".home__longitude");
  const latitude = document.querySelector(".home__latitude");

  longitude.textContent = longitude.textContent.slice(0, 13);
  latitude.textContent = latitude.textContent.slice(0, 14);

  const subgroups = JSON.parse(
    JSON.parse(
      document.getElementById("cities_attrs_by_groups_list_json").textContent
    )[0]
  );

  const qualityGroups = Object.entries(
      JSON.parse(subgroups["КАЧЕСТВЕННЫЕ ГРУППЫ"][0])
    ),
    spatial = Object.entries(
      JSON.parse(subgroups["ПРОСТРАНСТВЕННЫЕ_ХАРАКТЕРИСТИКИ"][0])
    ),
    rollingStock = Object.entries(JSON.parse(subgroups["ПОДВИЖНОЙ СОСТАВ"][0])),
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

  function roundingGroupValues(arrField) {
    for (let i = 0; i < arrField.length; i++) {
      if (typeof arrField[i][1] === "number") {
        arrField[i][1] = +arrField[i][1].toFixed(2);
      }
    }
  }

  roundingGroupValues(qualityGroups);
  roundingGroupValues(spatial);
  roundingGroupValues(rollingStock);
  roundingGroupValues(routes);
  roundingGroupValues(tariffSystem);

  function roundingAllValues(arrField) {
    for (let key in arrField) {
      if (typeof arrField[key] === "number") {
        arrField[key] = arrField[key].toFixed(2);
      }
    }
  }

  roundingAllValues(allPropertiesCity);

  /*-------------------------------------------------------------*/
  /*-----Generate colors-----------------------------------------*/
  /*-------------------------------------------------------------*/

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateColors() {
    const backgroundColor = [
      "#FFB1C1",
      "#9AD0F5",
      "#FFE6AA",
      "#A5DFDF",
      "#CCB2FF",
    ];
    shuffle(backgroundColor);
    return backgroundColor;
  }

  /*-------------------------------------------------------------*/
  /*-----Generate border colors----------------------------------*/
  /*-------------------------------------------------------------*/

  function generateBorderColors(backgroundColorArr) {
    const borderColor = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#B18AE0"];
    for (let i = 0; i < backgroundColorArr.length; i++) {
      switch (backgroundColorArr[i]) {
        case "#FFB1C1":
          borderColor[i] = "#FF6384";
          break;
        case "#9AD0F5":
          borderColor[i] = "#36A2EB";
          break;
        case "#FFE6AA":
          borderColor[i] = "#FFCE56";
          break;
        case "#A5DFDF":
          borderColor[i] = "#4BC0C0";
          break;
        case "#CCB2FF":
          borderColor[i] = "#B18AE0";
          break;
      }
    }
    return borderColor;
  }

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
    let labels = [];
    for (let i = start; i < end; i++) {
      if (arrField[i][1] !== 0) {
        labels.push(cityAttributeName[arrField[i][0]]);
      } else {
        nameUnusedProperties.push(cityAttributeName[arrField[i][0]]);
      }
    }
    return labels;
  }

  /*-------------------------------------------------------------*/
  /*-----Polar Area----------------------------------------------*/
  /*-------------------------------------------------------------*/
  function createPolarArea(groupArr, start, end) {
    const backgroundColorArr = generateColors();
    const data = {
      labels: generateLabels(groupArr, start, end),
      datasets: [
        {
          data: generateDatas(groupArr, start, end),
          backgroundColor: backgroundColorArr,
          borderColor: generateBorderColors(backgroundColorArr),
          borderWidth: 3,
        },
      ],
    };

    const config = {
      type: "polarArea",
      data: data,
      options: {
        scales: {
          r: {
            ticks: {
              display: false,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            caretSize: 8,
            bodyFont: {
              size: 15,
            },
          },
          legend: {
            onClick: null,
            position: "top",
            labels: {
              font: {
                size: 16,
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
    const backgroundColorArr = generateColors();
    const data = {
      labels: generateLabels(groupArr, start, end),
      datasets: [
        {
          data: generateDatas(groupArr, start, end),
          backgroundColor: backgroundColorArr,
          borderColor: generateBorderColors(backgroundColorArr),
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
            onClick: null,
            position: "top",
            labels: {
              color: fontColor,
              font: {
                size: 18,
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
    const backgroundColorArr = generateColors();
    const data = {
      labels: generateLabels(groupArr, start, end),
      datasets: [
        {
          data: generateDatas(groupArr, start, end),
          backgroundColor: backgroundColorArr,
          borderColor: generateBorderColors(backgroundColorArr),
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
            onClick: null,
            position: "top",
            labels: {
              color: fontColor,
              font: {
                size: 18,
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
  /*-----Generate share charts-----------------------------------*/
  /*-------------------------------------------------------------*/

  function generateDatasShare(arrField, start, end) {
    let data = [];
    for (let i = start; i < end; i++) {
      data.push(arrField[i][1], 100 - arrField[i][1]);
    }
    return data;
  }

  function generateLabelsShare(arrField, start, end, alternativeText) {
    let labels = [];
    for (let i = start; i < end; i++) {
      labels.push(cityAttributeName[arrField[i][0]], alternativeText);
    }
    return labels;
  }

  /*-------------------------------------------------------------*/
  /*-----Pie share-----------------------------------------------*/
  /*-------------------------------------------------------------*/
  function createPieShare(
    groupArr,
    start,
    end,
    fontColor = "black",
    alternativeText = "Оставшаяся часть"
  ) {
    const backgroundColorArr = generateColors();
    const data = {
      labels: generateLabelsShare(groupArr, start, end, alternativeText),
      datasets: [
        {
          data: generateDatasShare(groupArr, start, end),
          backgroundColor: backgroundColorArr,
          borderColor: generateBorderColors(backgroundColorArr),
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
            onClick: null,
            position: "top",
            labels: {
              color: fontColor,
              font: {
                size: 18,
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
  /*-----Generate data procent-----------------------------------*/
  /*-------------------------------------------------------------*/

  function generateDatasProcent(arrField, start, end) {
    let data = [];
    for (let i = start; i < end; i++) {
      data.push(arrField[i][1], 100 - arrField[i][1]);
    }
    return data;
  }

  function generateLabelsProcent(arrField, start, end) {
    let labels = [];
    for (let i = start; i < end; i++) {
      let re = /исправных/gi;
      let newLabel = cityAttributeName[arrField[i][0]].replace(
        re,
        "неисправных"
      );

      labels.push(cityAttributeName[arrField[i][0]], newLabel);
    }
    return labels;
  }

  /*-------------------------------------------------------------*/
  /*-----Doughnut procent----------------------------------------*/
  /*-------------------------------------------------------------*/
  function createDoughnutProcent(groupArr, start, end, fontColor = "black") {
    const backgroundColorArr = generateColors();
    const data = {
      labels: generateLabelsProcent(groupArr, start, end),
      datasets: [
        {
          data: generateDatasProcent(groupArr, start, end),
          backgroundColor: backgroundColorArr,
          borderColor: generateBorderColors(backgroundColorArr),
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
            onClick: null,
            position: "top",
            labels: {
              color: fontColor,
              font: {
                size: 18,
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

  function checkDataGroupForNull(
    arrField,
    start,
    end,
    fieldCounter,
    nameField,
    colorLabel = "black"
  ) {
    let counter = 0;

    for (let i = start; i < end; i++) {
      if (arrField[i][0] !== 0) {
        counter++;
      }
    }

    if (counter === end - start) {
      for (let i = start; i < end; i++) {
        nameUnusedProperties.push(cityAttributeName[arrField[i][0]]);
      }
    } else {
      addChartToPage(`${nameField}`, fieldCounter);
      new Chart(
        document.getElementById(`${nameField}-${fieldCounter}`),
        createDoughnut(arrField, start, end, colorLabel)
      );
    }
  }

  /*-------------------------------------------------------------*/
  /*-------------------------------------------------------------*/
  /*-----Add chart to page---------------------------------------*/
  /*-------------------------------------------------------------*/
  /*-------------------------------------------------------------*/
  function addChartToPage(nameGroup, index) {
    const chartWrapper = document.createElement("div");
    chartWrapper.classList.add("_chart-wrapper");
    const newChart = document.createElement("canvas");
    const groupContainer = document.querySelector(`.${nameGroup}__container`);
    newChart.id = `${nameGroup}-${index}`;
    groupContainer.appendChild(chartWrapper);
    chartWrapper.appendChild(newChart);
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
  // ! By AnoMorCH BEGINNING
  function canBufferBeShown() {
    const buffer500 = allPropertiesCity.area_stops_active_zone_coverage_500;
    const buffer700 = allPropertiesCity.area_stops_active_zone_coverage_700;
    const buffer1000 = allPropertiesCity.area_stops_active_zone_coverage_1000;

    if (
      buffer500 == 0 && buffer700 == 0
      || buffer500 == 0 && buffer1000 == 0
      || buffer700 == 0 && buffer1000 == 0
    ) {
      return false;
    }

    return true;
  }

  let spatialCounter = 0;

  if (canBufferBeShown()) {
    spatialCounter++;
    addChartToPage("spatial", spatialCounter);
    new Chart(
      document.getElementById(`spatial-${spatialCounter}`),
      createPie(spatial, 10, 13, "white")
    );
  } else {
    ungroupedProperties.push([
      cityAttributeName.area_stops_active_zone_coverage_500,
      allPropertiesCity.area_stops_active_zone_coverage_500,
    ]);

    ungroupedProperties.push([
      cityAttributeName.area_stops_active_zone_coverage_700,
      allPropertiesCity.area_stops_active_zone_coverage_700,
    ]);

    ungroupedProperties.push([
      cityAttributeName.area_stops_active_zone_coverage_1000,
      allPropertiesCity.area_stops_active_zone_coverage_1000,
    ]);
  }

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 8, 9, "white", "Доля домов ВНЕ зоны покрытия")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 9, 10, "white", "Доля населения ВНЕ зоны покрытия")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 13, 14, "white", "Доля домов ВНЕ зоны покрытия метрополитеном")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 14, 15, "white", "Доля населения ВНЕ зоны покрытия метрополитеном")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 17, 18, "white", "Процент НЕпокрытой территории")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 18, 19, "white", "Процент НЕпокрытой территории от станций метрополитена")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 18, 19, "white", "Процент НЕпокрытой территории от станций метрополитена")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 20, 21, "white", "Доля населения БЕЗ доступа к метрополитену")
  );

  spatialCounter++;
  addChartToPage("spatial", spatialCounter);
  new Chart(
    document.getElementById(`spatial-${spatialCounter}`),
    createPieShare(spatial, 22, 23, "white", "Доля населения БЕЗ доступа к общественному транспорту")
  );
  // ! By AnoMorCH ENDING

  // let spatialCounter = 0;
  // for (let i = 8; i < 10; i++) {
  //   if (spatial[i][1] !== 0) {
  //     spatialCounter++;
  //     addChartToPage("spatial", spatialCounter);
  //     new Chart(
  //       document.getElementById(`spatial-${spatialCounter}`),
  //       createPie(spatial, i, i + 1, "white")
  //     );
  //   } else {
  //     nameUnusedProperties.push(cityAttributeName[spatial[i][0]]);
  //   }
  // }

  // /////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////

  // let flagBuff = 0;
  // for (let i = 10; i < 13; i++) {
  //   if (spatial[i][1] !== 0) {
  //     flagBuff++;
  //   }
  // }

  // if (flagBuff > 1) {
  //   spatialCounter++;
  //   addChartToPage("spatial", spatialCounter);
  //   new Chart(
  //     document.getElementById(`spatial-${spatialCounter}`),
  //     createDoughnut(spatial, 10, 13, "white")
  //   );
  // } else {
  //   ungroupedProperties.push([
  //     cityAttributeName[spatial[10][0]],
  //     allPropertiesCity[spatial[10][0]],
  //   ]);
  //   ungroupedProperties.push([
  //     cityAttributeName[spatial[11][0]],
  //     allPropertiesCity[spatial[11][0]],
  //   ]);
  //   ungroupedProperties.push([
  //     cityAttributeName[spatial[12][0]],
  //     allPropertiesCity[spatial[12][0]],
  //   ]);
  // }

  // /////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////

  // for (let i = 13; i < 16; i++) {
  //   ungroupedProperties.push([
  //     cityAttributeName[spatial[i][0]],
  //     allPropertiesCity[spatial[i][0]],
  //   ]);
  // }

  // if (spatial[19][1] !== 0) {
  //   spatialCounter++;
  //   addChartToPage("spatial", spatialCounter);
  //   new Chart(
  //     document.getElementById(`spatial-${spatialCounter}`),
  //     createDoughnut(spatial, 19, 20, "white")
  //   );
  // } else {
  //   nameUnusedProperties.push(cityAttributeName[spatial[19][0]]);
  // }

  // if (spatial[20][1] !== 0) {
  //   spatialCounter++;
  //   addChartToPage("spatial", spatialCounter);
  //   new Chart(
  //     document.getElementById(`spatial-${spatialCounter}`),
  //     createPieShare(
  //       spatial,
  //       20,
  //       21,
  //       "white",
  //       "Доля населения без доступа к метрополитену"
  //     )
  //   );
  // } else {
  //   nameUnusedProperties.push(cityAttributeName[spatial[20][0]]);
  // }

  // if (spatial[21][1] !== 0) {
  //   spatialCounter++;
  //   addChartToPage("spatial", spatialCounter);
  //   new Chart(
  //     document.getElementById(`spatial-${spatialCounter}`),
  //     createDoughnut(spatial, 21, 22, "white")
  //   );
  // } else {
  //   nameUnusedProperties.push(cityAttributeName[spatial[21][0]]);
  // }

  // if (spatial[22][1] !== 0) {
  //   spatialCounter++;
  //   addChartToPage("spatial", spatialCounter);
  //   new Chart(
  //     document.getElementById(`spatial-${spatialCounter}`),
  //     createPieShare(
  //       spatial,
  //       22,
  //       23,
  //       "white",
  //       "Доля населения без доступа к общественному транспорту"
  //     )
  //   );
  // } else {
  //   nameUnusedProperties.push(cityAttributeName[spatial[22][0]]);
  // }

  // spatialCounter++;
  // addChartToPage("spatial", spatialCounter);
  // new Chart(
  //   document.getElementById(`spatial-${spatialCounter}`),
  //   createDoughnut(spatial, 24, 30, "white")
  // );

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
  // displayUnusedProperties(".spatial__container");

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
  checkDataGroupForNull(
    rollingStock,
    20,
    23,
    rollingStockCounter,
    "rolling-stock"
  );

  rollingStockCounter++;
  checkDataGroupForNull(
    rollingStock,
    23,
    26,
    rollingStockCounter,
    "rolling-stock"
  );

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


  if (rollingStock[37][1] !== 0) {
    rollingStockCounter++;
    addChartToPage("rolling-stock", rollingStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollingStockCounter}`),
      createPieShare(rollingStock, 37, 38, "black", 'Доля ТС без низкопольных площадок')
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollingStock[37][0]]);
  }


  if (rollingStock[38][1] !== 0) {
    rollingStockCounter++;
    addChartToPage("rolling-stock", rollingStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollingStockCounter}`),
      createPieShare(rollingStock, 38, 39, "black", 'Доля остального ТС')
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollingStock[38][0]]);
  }


  if (rollingStock[39][1] !== 0) {
    rollingStockCounter++;
    addChartToPage("rolling-stock", rollingStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollingStockCounter}`),
      createPieShare(rollingStock, 39, 40, "black", 'Доля остального транспорта в парке ТС НОТ')
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollingStock[39][0]]);
  }

  if (rollingStock[40][1] !== 0) {
    rollingStockCounter++;
    addChartToPage("rolling-stock", rollingStockCounter);
    new Chart(
      document.getElementById(`rolling-stock-${rollingStockCounter}`),
      createPieShare(rollingStock, 40, 41, "black", 'Доля не рабочего ПС в парке ТС')
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[rollingStock[40][0]]);
  }

  ungroupedProperties.push([
    cityAttributeName.num_new_GET,
    allPropertiesCity.num_new_GET,
  ]);
  ungroupedProperties.push([
    cityAttributeName.num_new_buses,
    allPropertiesCity.num_new_buses,
  ]);

  if (allPropertiesCity[rollingStock[41][0]] > 0) {
    ungroupedProperties.push([cityAttributeName[rollingStock[41][0]], "Есть"]);
  } else {
    ungroupedProperties.push([cityAttributeName[rollingStock[41][0]], "Нет"]);
  }

  displayUngroupedProperties(".rolling-stock__container");
  // displayUnusedProperties(".rolling-stock__container");

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
  checkDataGroupForNull(routes, 10, 14, routesCounter, "routes", "white");

  routesCounter++;
  if (routes[15][1] !== 0) {
    addChartToPage("routes", routesCounter);
    new Chart(
      document.getElementById(`routes-${routesCounter}`),
      createPieShare(
        routes,
        15,
        16,
        "white",
        "Процент необособленных трамвайных путей"
      )
    );
  } else {
    nameUnusedProperties.push(cityAttributeName[routes[15][0]]);
  }

  routesCounter++;
  checkDataGroupForNull(routes, 18, 20, routesCounter, "routes", "white");

  ungroupedProperties.push([
    cityAttributeName.time_avrg_waiting_any_transport,
    allPropertiesCity.time_avrg_waiting_any_transport,
  ]);

  ungroupedProperties.push([
    cityAttributeName.time_avrg_waiting_specific_transport,
    allPropertiesCity.time_avrg_waiting_specific_transport,
  ]);

  ungroupedProperties.push([
    cityAttributeName.length_overall_nonrailed_transport_path,
    allPropertiesCity.length_overall_nonrailed_transport_path,
  ]);

  for (let i = 22; i < 29; i++) {
    if (typeof allPropertiesCity[routes[i][0]] === "boolean") {
      const boolValue = allPropertiesCity[routes[i][0]] ? "Есть" : "Нет";
      ungroupedProperties.push([cityAttributeName[routes[i][0]], boolValue]);
    } else {
      ungroupedProperties.push([
        cityAttributeName[routes[i][0]],
        allPropertiesCity[routes[i][0]],
      ]);
    }
  }

  displayUngroupedProperties(".routes__container");
  // displayUnusedProperties(".routes__container");

  /*-------------------------------------------------------------*/
  /*-----Tariff--------------------------------------------------*/
  /*-------------------------------------------------------------*/

  for (let i = 0; i < 10; i++) {
    if (typeof allPropertiesCity[tariffSystem[i][0]] === "boolean") {
      const boolValue = allPropertiesCity[tariffSystem[i][0]] ? "Есть" : "Нет";
      ungroupedProperties.push([
        cityAttributeName[tariffSystem[i][0]],
        boolValue,
      ]);
    } else {
      ungroupedProperties.push([
        cityAttributeName[tariffSystem[i][0]],
        allPropertiesCity[tariffSystem[i][0]],
      ]);
    }
  }

  for (let i = 10; i < 16; i++) {
    if (typeof allPropertiesCity[tariffSystem[i][0]] === "boolean") {
      const boolValue = allPropertiesCity[tariffSystem[i][0]] ? "Есть" : "Нет";
      ungroupedProperties.push([
        cityAttributeName[tariffSystem[i][0]],
        boolValue,
      ]);
    } else {
      ungroupedProperties.push([
        cityAttributeName[tariffSystem[i][0]],
        allPropertiesCity[tariffSystem[i][0]],
      ]);
    }
  }

  displayUngroupedProperties(".tariff__container");
  // displayUnusedProperties(".tariff__container");
}

export default dataVisualization;
