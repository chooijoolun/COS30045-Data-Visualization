// Load and parse CSV — extract only the two fields we need for the chart
d3.csv("./data/Rating_on_Screen_Technology.csv", d => {
    return {
        screenTech: d.Screen_Tech,      // Screen technology name (X axis label)
        meanStar: +d["Mean(Star)"]      // Average star rating — + converts string to number
    };
}).then(data => {
    // Verify data loaded correctly in browser console
    console.log(data);                           // Full array of objects
    console.log(data.length);                    // Number of screen tech categories
    console.log(d3.max(data, d => d.meanStar));  // Highest average rating
    console.log(d3.min(data, d => d.meanStar));  // Lowest average rating
    console.log(d3.extent(data, d => d.meanStar)); // [min, max] as array

    createBarChart(data); // Pass cleaned data to chart function
}).catch(error => {
    // If CSV fails to load — log error and show message on page
    console.error("Error loading CSV:", error);
    d3.select("body").append("p").text("Error loading data: " + error);
});

const createBarChart = (data) => {
    const width = 700;                                        // Total SVG width
    const height = 400;                                       // Total SVG height
    const margin = { top: 40, right: 30, bottom: 70, left: 60 }; // Space for axes and title

    const container = d3.select("#chart-container");
    container.selectAll("*").remove(); // Remove old chart before redrawing

    if (container.empty()) {
        console.error("Chart container #chart-container not found");
        return;
    }

    // Create SVG canvas on the page
    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // ── X SCALE 
    const x = d3.scaleBand()
        .domain(data.map(d => d.screenTech)) // One band per screen tech category
        .range([margin.left, width - margin.right]) // Span between left and right margins
        .padding(0.2);                        // 20% gap between bars

    // ── Y SCALE 
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.meanStar)]) // 0 to highest rating
        .nice()                               // Round up to a clean top value
        .range([height - margin.bottom, margin.top]); // SVG Y is inverted (bottom → top)

    // ── BARS ─────────────────────────────────────────────
    svg.selectAll("rect")
        .data(data)                           // Bind one rect per data row
        .enter()
        .append("rect")
        .attr("x", d => x(d.screenTech))     // X position from band scale
        .attr("y", d => y(d.meanStar))        // Y position — top of bar
        .attr("width", x.bandwidth())         // Bar width from band scale
        .attr("height", d => height - margin.bottom - y(d.meanStar)) // Bar height from rating value
        .attr("fill", "steelblue");           // Bar colour

    // ── X AXIS ───────────────────────────────────────────
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) // Move to bottom
        .call(d3.axisBottom(x))              // Draw axis with screen tech labels
        .selectAll("text")
        .attr("transform", "rotate(-20)")    // Tilt labels to avoid overlap
        .style("text-anchor", "end");        // Align rotated text to tick mark

    // ── Y AXIS ───────────────────────────────────────────
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`) // Move to left margin
        .call(d3.axisLeft(y));               // Draw axis with star rating numbers

    // ── CHART TITLE ──────────────────────────────────────
    svg.append("text")
        .attr("x", width / 2)               // Horizontally centred
        .attr("y", 24)                       // Near the top of the SVG
        .attr("text-anchor", "middle")       // Centre-align the text
        .style("font-size", "18px")          // Title font size
        .style("font-weight", "bold")        // Bold title
        .text("Average Screen Technology Rating"); // Chart title text
};
