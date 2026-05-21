// Dataset matching your specific parameters
const data = [
    { brand: "Samsung", count: 1005 },
    { brand: "LG", count: 614 },
    { brand: "Sony", count: 596 },
    { brand: "Panasonic", count: 262 },
    { brand: "TCL", count: 206 },
    { brand: "Hisense", count: 151 },
    { brand: "Sharp", count: 96 },
    { brand: "Philips", count: 94 },
    { brand: "Vizio", count: 91 },
    { brand: "Other", count: 84 }
];

// Target the SVG container and match the compact aspect ratio workspace bounds
const svg = d3.select("#chart")
    .attr("viewBox", "0 0 600 300"); // Increased height slightly to accommodate the title layout cleanly

const createBarChart = dataArr => {
    // Layout Margins - provides essential spacing for the title and boundaries
    const margin = { top: 60, right: 20, bottom: 20, left: 20 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create a centralized chart group shifted inside the margins
    const chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Horizontal Scale (X-Axis) - Maps data count values across the safe width bounds
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataArr, d => d.count)])
        .range([0, width]);

    // Vertical Scale (Y-Axis) - Uniformly maps brand categories down the safe height bounds
    const yScale = d3.scaleBand()
        .domain(dataArr.map(d => d.brand))
        .range([0, height])
        .padding(0.25); // Slightly wider padding for a more breathing, modern look

    // 1. Add the Chart Title
    svg.append("text")
        .attr("x", margin.left)
        .attr("y", 35) // Positioned nicely in the top margin space
        .attr("class", "chart-title")
        .text("D3 Scaling Charts");

    // 2. Execute data binding sequence loop inside the inner group
    chartGroup.selectAll("rect")
        .data(dataArr)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("rx", 4) // Rounds the corner horizontal radius
        .attr("ry", 4) // Rounds the corner vertical radius
        .attr("fill", "#3b82f6"); // Modern, vibrant digital blue tailwind-style palette
};

// Initialize execution chain
createBarChart(data);