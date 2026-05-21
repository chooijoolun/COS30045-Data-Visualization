function drawScatterplot(data) {
    // 1. Build Base SVG Node Wrapper
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", Width + Margin.left + Margin.right)
        .attr("height", Height + Margin.top + Margin.bottom);

    // Populate global inner frame reference
    innerChartS = svg.append("g")
        .attr("transform", `translate(${Margin.left}, ${Margin.top})`);

    // 2. Map Dynamic Domains
    xScaleS = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star )])
        .range([0, Width]).nice();

    yScaleS = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([Height, 0]).nice();
        
    // 3. Render Coordinate Grid Paths
    innerChartS.append("g")
        .attr("transform", `translate(0, ${Height})`)
        .call(d3.axisBottom(xScaleS));

    innerChartS.append("g")
        .call(d3.axisLeft(yScaleS));

    // Axis Labels
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", Width / 2)
        .attr("y", Height + 40)
        .style("text-anchor", "middle")
        .text("Star Rating");

    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -Height / 2)
        .attr("y", -35)
        .style("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // 4. Render Data Nodes
    innerChartS.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.6); // Semi-transparent to reveal overlapping densities

    // 5. Build Layout Legend Elements
    const legend = innerChartS.selectAll(".legend")
        .data(colorScale.domain())
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(${Width + 20}, ${i * 25 + 10})`);

    legend.append("circle")
        .attr("r", 6)
        .attr("fill", colorScale);

    legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 15)
        .attr("y", 4)
        .text(d => d);
}