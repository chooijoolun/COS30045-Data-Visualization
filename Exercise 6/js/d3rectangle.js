// Create SVG 
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 2000 600")
    .style("background-color", "#f8f9fa")
    .style("border", "2px solid #ccc")
    .style("border-radius", "12px");

// Rectangle
svg
    .append("rect")
    .attr("x", 80)
    .attr("y", 80)
    .attr("width", 1500)
    .attr("height", 80)
    .attr("rx", 10) // rounded corners
    .attr("ry", 10)
    .attr("fill", "#2563eb");


