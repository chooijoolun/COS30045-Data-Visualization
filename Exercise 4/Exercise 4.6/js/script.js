// 1. Setup the SVG container with a responsive viewBox as instructed
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 1600") // Adjusted size to see scales in action
  .style("border", "1px solid black");

// Assuming your data structure looks something like this:
// const data = [{ brand: "Apple", count: 1200 }, { brand: "Samsung", count: 850 }, ...];

function createBarChart(data) {
  
  // --- Step 1: Add Linear scale for count data (X-Axis) ---
  // Maps count values (0 to max value 1310) to the SVG width available (0 to 500)
  const xScale = d3.scaleLinear()
    .domain([0, 1310])
    .range([0, 500]);

  // --- Step 2: Add a Band scale for categories (Y-Axis) ---
  // Maps discrete brands to the SVG height available (0 to 1600)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 1600])
    .padding(0.2); // Adds the recommended padding gap between bars

  // 3. Bind data and draw the bars using the scales
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    // Use yScale to dynamically position each bar on the Y-axis
    .attr("y", d => yScale(d.brand))
    // Use the scale's bandwidth helper function to set uniform bar heights
    .attr("height", yScale.bandwidth())
    // Start all horizontal bars from the left edge
    .attr("x", 0)
    // Use xScale to dynamically determine the width of the bar based on data
    .attr("width", d => xScale(d.count))
    .attr("fill", "teal"); // Example styling color
}