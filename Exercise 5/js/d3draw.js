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

const chartWidth = 1400;
const chartHeight = 560;

// 1. HTML SVG element's viewBox attribute
const svg = d3.select("#chart")
    .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`);

const createBarChart = data => {
    // Horizontal Scale (X-Axis)
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, chartWidth]);

    // 2. Vertical range
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, chartHeight])
        .padding(0.2);

    // Bind data and apply attributes
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
};

createBarChart(data);
