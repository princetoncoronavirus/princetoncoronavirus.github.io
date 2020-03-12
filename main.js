;(function() {

  var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d"),
    path = d3.geoPath().projection(null).context(context);

d3.json("nj.topojson", function(error, nj) {
  if (error) throw error;

  context.beginPath();
  path(topojson.feature(nj, nj.objects.counties));
  context.fillStyle = "#ddd";
  context.fill();

  context.beginPath();
  path(topojson.mesh(nj, nj.objects.counties, function(a, b) { return a !== b; }));
  context.strokeStyle = "#999";
  context.stroke();
});

}());
