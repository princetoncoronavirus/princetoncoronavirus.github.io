d3.json("https://raw.githubusercontent.com/princetoncoronavirus/princetoncoronavirus.github.io/master/nj.json?raw=true", function(json) {

//Width and height of map
var width = 420
var height = 400
	
var projection = d3.geo.mercator()
  .scale(5758)
  .rotate([74.6,0,0])
  .translate([width/2, height/0.0864181367160906])
  .clipAngle(90);

// var projection = d3.geo.mercator()
//   .scale(4000)
//   .center([-74, 40])
//   .translate([width/2, height/2]);
	
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
	.projection(projection);

	
//Create SVG element and append map to the SVG
var svg = d3.select("#map")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("viewbox", "50 50 350 350");
        
// Append Div for tooltip to SVG
var div = d3.select("#map")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);
// Bind the data to the SVG and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("stroke", "rgb(175,175,175)")
	.style("stroke-width", "0.5")
	.style("fill", "rgb(245,245,245)")
	
d3.csv("cases.csv", function(data) {

svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d) {
		return projection([d.lon, d.lat])[0];
	})
	.attr("cy", function(d) {
		return projection([d.lon, d.lat])[1];
	})
	.attr("r", function(d) {
		return Math.sqrt(d.cases) * 4;
	})
		.style("fill", "#ff8f00")	
		.style("fill-opacity", 0.3)
		.style("stroke", "#ff8f00")
		.style("stroke-opacity", 1.0)

	.on("mouseover", function(d) {      
    	div.transition()        
      	   .duration(200)      
           .style("opacity", .9);      
           div.text(d.county + ' cases: ' + d.cases)
           .style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 28) + "px");    
	})   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.transition()        
           .duration(500)      
           .style("opacity", 0);   
    });
});
}); 
