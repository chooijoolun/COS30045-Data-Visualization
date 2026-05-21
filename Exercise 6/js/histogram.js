// Renders the baseline SVG frame and axis labels
function drawHistogram(data) {
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", Width + Margin.left + Margin.right)
        .attr("height", Height + Margin.top + Margin.bottom)
        .append("g")
        .attr("transform", `translate(${Margin.left}, ${Margin.top})`);

    // Lock the global maximum energy consumption boundary
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    // Explicitly enforce boundaries on the bin generator domain
    const bins = binGenerator.domain([0, maxEnergy])(data);

    const xScale = d3.scaleLinear()
        .domain([0, maxEnergy])
        .range([0, Width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([Height, 0]);

    // Plot initial data bins
    svg.selectAll(".bar-rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("class", "bar-rect")
        .attr("x", d => xScale(d.x0))
        // Prevent negative widths by using Math.max fallback
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("y", d => yScale(d.length))
        .attr("height", d => Height - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", "2px");

    // X-Axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${Height})`)
        .call(d3.axisBottom(xScale));

    // Y-Axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

    // Labels
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", Width / 2)
        .attr("y", Height + 40)
        .style("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -Height / 2)
        .attr("y", -35)
        .style("text-anchor", "middle")
        .text("Frequency (Number of TVs)");
}