// Chart 1: Scatter Plot Setup
const scatterSvg = d3.select("#scatter-plot")
    .append("svg")
    .attr("viewBox", "0 0 500 350");

// Load your TV Data here
d3.csv("data/Ex5_TV_energy.csv").then(data => {
    // Parse data safely (e.g., converting strings to numbers)
    data.forEach(d => {
        d.star2 = +d.star2;
        d.energy_consumpt = +d.energy_consumpt;
    });

    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2)])
        .range([50, 450]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumpt)])
        .range([300, 30]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes
    scatterSvg.append("g")
        .attr("transform", "translate(0, 300)")
        .call(xAxis);

    scatterSvg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);

    // Create circles (scatter points)
    scatterSvg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energy_consumpt))
        .attr("r", 3)
        .attr("fill", "rgba(31, 119, 180, 0.5)");
    
}).catch(error => console.error("Error loading scatter data:", error));