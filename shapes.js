var dataArray = [5,11,18];
// Array of labels
var dataDays = ['Mon', 'Wed', 'Fri'];
// Colour bars
var rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0, 10]);
// Colour circles
var rainbow2 = d3.scaleSequential(d3.interpolateRainbow).domain([0, 3]);

var x = d3.scaleBand()
          .domain(dataDays)
          .range([0,170])
          .paddingInner(0.1176);

var xAxis = d3.axisBottom(x);


var svg = d3.select("body").append("svg")
  .attr("height", "400")
  .attr("width", "1800");

//Colour range
var cat20 = d3.schemeCategory20;
console.log(cat20);

svg.selectAll("rect")
   .data(dataArray)
   .enter().append("rect")
            .attr("height", d => d * 15)
            .attr("width", "50")
            .attr("fill", (d,i)=> rainbow(i))
            .attr("x", (d,i)=> 60 * i) //d - data point(5,11,18), i - index
            .attr("y", d => 300 - (d * 15));

svg.append("g")
    .attr("class", "x axis hidden")
    .attr("transform", "translate(0, 300)")
    .call(xAxis);

var newX = 300;
svg.selectAll("circle.first")
   .data(dataArray)
   .enter().append("circle")
            .attr("class", "first")
            .attr("fill", (d,i)=> rainbow2(i))
            .attr("cx", (d,i) => newX+=(d*3) + (i*20))
            .attr("cy", "100")
            .attr("r", d=> d*3);

var newX = 600;
svg.selectAll("ellipse")
   .data(dataArray)
   .enter().append("ellipse")
            .attr("class", "second")
            .attr("fill", (d,i)=> cat20[i])
            .attr("cx", (d,i) => newX+=(d*3) + (i*20))
            .attr("cy", "100")
            .attr("rx", d=> d*3)
            .attr("ry", "30");

// Line
// .style takes precedence from .attr and from style.css
// Use CSS if possible, then .attr, then .style 
// - easier to manege your style in one place 
// - and it reduces overall file size, which reduces download and running times.
var newX = 900;
svg.selectAll("line")
   .data(dataArray)
   .enter().append("line")
            .attr("x1", newX)
            // .attr("stroke", "blue") // for line to be visible on web
            .style("stroke", "green") // same as above to style line to be visible
            .attr("stroke-width", "2")
            .attr("y1", (d,i)=> 80+(i*20)) // to get 20px gap between lines
            .attr("x2", d => newX+(d*15))
            .attr("y2", (d,i)=> 80+(i*20));

var textArray = ["start", "middle", "end"];

svg.append("text").selectAll("tspan")
 .data(textArray)
 .enter().append("tspan")
   .attr("x", newX)
   .attr("y", (d,i) => 150+(i*30))
   .attr("fill", "none")
   .attr("stroke", "blue")
   .attr("stroke-width", "2")
//    .text("start")
   .attr("text-anchor", "start")        // to align text horizontally
   .attr("dominant-baseline", "middle") // to align vertically
   .attr("font-size", "30")
   .text(d=>d);

// svg.append("text")
//    .attr("x", newX)
//    .attr("y", 180)
//    .attr("fill", "blue")
//    .attr("stroke", "none")
//    .text("middle")
//    .attr("text-anchor", "middle")
//    .attr("dominant-baseline", "middle")
//    .attr("font-size", "30");
//  svg.append("text")
//    .attr("x", newX)
//    .attr("y", 210)
//    .attr("fill", "none")
//    .attr("stroke", "blue")
//    .text("end")
//    .attr("text-anchor", "end")
//    .attr("dominant-baseline", "middle")
//    .attr("font-size", "30");

svg.append("line")
   .attr("x1", newX)
   .attr("y1", 150)
   .attr("x2", newX)
   .attr("y2", 210);

