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

// 1. FIX: Update your HTML SVG element's viewBox attribute to 1200 350 instead of 1600
const svg = d3.select("#chart")
    .attr("viewBox", "0 0 1200 350"); 

const createBarChart = data => {
    // Horizontal Scale (X-Axis) - maps counts perfectly to 1200px width
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)]) 
        .range([0, 1200]); 

    // 2. FIX: Change the vertical range from 1600 to 350 to match the new viewBox height
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) 
        .range([0, 350]) // Fits all 10 bars beautifully into a compact space
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