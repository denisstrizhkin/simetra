
am5.ready(function() {
var root = am5.Root.new("chartdiv");
root.setThemes([
  am5themes_Animated.new(root)
]);
var cat = -1;
var value = 10;

function generateData() {
  value = Math.round(Math.random() * 10);
  cat++;
  return {
    category: "cat" + cat,
    value: value
  };
}

function generateDatas(count) {
  cat = -1;
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX"
}));

var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false);

var xRenderer = am5radar.AxisRendererCircular.new(root, {});
xRenderer.labels.template.setAll({
  radius: 10
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5radar.AxisRendererRadial.new(root, {})
}));

for (var i = 0; i < 4; i++) {
  var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    stacked: true,
    name: "Series " + i,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}: {valueY}"
  });

  series.data.setAll(generateDatas(8));
  
  series.appear(1000);
}

var data = generateDatas(8);
xAxis.data.setAll(data);


chart.appear(1000, 100);

});