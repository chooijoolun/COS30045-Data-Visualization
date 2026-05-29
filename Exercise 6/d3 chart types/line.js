// Chart 4: Line Chart Setup
const lineSvg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", "0 0 500 350");

// Load your Historical Power Price Data here
d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(data => {
    const parseTime = d3.timeParse("%Y");
    
    data.forEach(d => {
        d.year = parseTime(d.Year);
        d.price = +d["Average Price (notTas-Snowy)"];
    });

    // Create scales
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.year))
        .range([50, 450]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)])
        .range([300, 30]);

    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.price));

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes
    lineSvg.append("g")
        .attr("transform", "translate(0, 300)")
        .call(xAxis);

    lineSvg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);

    // Append line path
    lineSvg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("transform", "translate(0, 0)");
    
}).catch(error => console.error("Error loading line data:", error));