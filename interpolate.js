// Define an array of objects, each with x and y properties
var dataArray = [{x:5,y:5}, {x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}]; 

// Create an SVG element in the body with fixed height and width
var svg = d3.select("body").append("svg").attr("height", "400").attr("width", "1800");

// Declare line generator func using d3.line()
var line = d3.line()
                .x(d=> d.x*6) // Map x-value for each data point, scaled by 6
                .y(d=> d.y*4) // Map y-value for each data point, scaled by 4
                .curve(d3.curveCardinal)

                //Append path element to the SVG and apply styling
svg.append("path")
   .attr("fill", "none")
   .attr("stroke", "blue")
   .attr("d", line(dataArray));