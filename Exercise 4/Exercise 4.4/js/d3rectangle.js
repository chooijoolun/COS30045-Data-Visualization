// Create SVG 
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1500 420")
    .style("background-color", "#f8f9fa")
    .style("border", "2px solid #ccc")
    .style("border-radius", "12px");

// Rectangle
svg
    .append("rect")
    .attr("x", 120)
    .attr("y", 120)
    .attr("width", 980)
    .attr("height", 90)
    .attr("rx", 10) // rounded corners
    .attr("ry", 10)
    .attr("fill", "#2563eb");

// Title text
svg
    .append("text")
    .attr("x", 120)
    .attr("y", 90)
    .text("D3 svg rectangle")
    .style("font-size", "34px")
    .style("font-family", "Arial")
    .style("font-weight", "bold")
    .style("fill", "#333");