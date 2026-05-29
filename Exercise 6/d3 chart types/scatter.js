// Chart 1: Scatter Plot Setup
const scatterSvg = d3.select("#scatter-plot")
    .append("svg")
    .attr("viewBox", "0 0 500 350");

// Load TV data (Exercise 6 dataset)
d3.csv("data/Ex6_TVdata.csv").then(data => {
    // Parse data safely (e.g., converting strings to numbers)
    data.forEach(d => {
        d.star = +d.star;
        d.energyConsumption = +d.energyConsumption;
    });

    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star)])
        .range([50, 450]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
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
        .attr("cx", d => xScale(d.star))
        .attr("cy", d => yScale(d.energyConsumption))
        .attr("r", 3)
        .attr("fill", "rgba(31, 119, 180, 0.5)");
    
}).catch(error => console.error("Error loading scatter data:", error));