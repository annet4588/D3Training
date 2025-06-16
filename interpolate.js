// Define an array of objects, each with x and y properties
var dataArray = [{x:5,y:5}, {x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}]; 
var interpolateTypes = [d3.curveLinear,d3.curveNatural,d3.curveStep, d3.curveBasis, d3.curveBundle,d3.curveCardinal];


// Create an SVG element in the body with fixed height and width
var svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%").attr("viewBox", "0 0 1800 400");

for(var p=0; p<6; p++){
    // Declare line generator func using d3.line()
    var line = d3.line()
                    .x(d=> d.x*6) // Map x-value for each data point, scaled by 6
                    .y(d=> d.y*4) // Map y-value for each data point, scaled by 4
                    .curve(interpolateTypes[p]);

    // Correct horizontal shifting
    var shiftX = p*250;
    var shiftY = 0;

    // Declare group as g
    var chartGroup = svg.append("g").attr("class", "group"+p).attr("transform", "translate("+shiftX+",0)");

    //Append path element to the SVG and apply styling
    chartGroup.append("path")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("d", line(dataArray));

     chartGroup.selectAll("circle.grp"+p)
        .data(dataArray)
        .enter().append("circle")
                    .attr("class", (d,i)=> "grp"+i)
                    .attr("cx", d => d.x*6)
                    .attr("cy", d => d.y*4)
                    .attr("r", "2");

}

