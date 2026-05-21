// Create SVG canvas
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 300")
    .style("background-color", "#f8f9fa")
    .style("border", "2px solid #ccc")
    .style("border-radius", "12px");

// Add improved rectangle
svg
    .append("rect")
    .attr("x", 80)
    .attr("y", 80)
    .attr("width", 700)
    .attr("height", 40)
    .attr("rx", 10) // rounded corners
    .attr("ry", 10)
    .attr("fill", "#2563eb");

// Optional title text
svg
    .append("text")
    .attr("x", 80)
    .attr("y", 60)
    .text("Energy Consumption Example")
    .style("font-size", "24px")
    .style("font-family", "Arial")
    .style("font-weight", "bold")
    .style("fill", "#333");