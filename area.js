var dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

// Parse years into date objects using d3.timeParse
var parseDate = d3.timeParse("%Y");
// d3.entent logs the min and max date from dataYears
console.log(d3.extent(dataYears, d=> parseDate(d)));

var height = 200;
var width = 500;

var margin = {left:50, right:50, top:40, bottom:0};

// y-Scales
var y = d3.scaleLinear()
           .domain([0, d3.max(dataArray)]) //domain from 0 to max value
           .range([height,0]);//inverted range because SVG origin is top-left
// x-Scales
var x = d3.scaleTime()
          .domain(d3.extent(dataYears, d=> parseDate(d))) //domain from min to max year
          .range([0, width]); 

var yAxis = d3.axisLeft(y).ticks(3).tickPadding(10).tickSize(10);
var xAxis = d3.axisBottom(x);

//Create area generator
var area = d3.area()
             .x((d,i) =>x(parseDate(dataYears[i])))
             .y0(height)   // baseline at chart bottom
             .y1(d=> y(d)); // top of area from data

var svg = d3.select("body").append("svg").attr("height", "600").attr("width", "1800");

var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")")

chartGroup.append("path").attr("d", area(dataArray));
chartGroup.append("g")
    .attr("class", "axis y")
    .call(yAxis);
chartGroup.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0, "+height+")")
    .call(xAxis);
