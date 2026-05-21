// Chart 3: Bar Chart Setup
const barSvg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", "0 0 500 350");

// Load your filtered or raw data here
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
    data.forEach(d => {
        d.energy = +d.energy;
    });

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([50, 450])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d["Mean(Labelled energy consumption (kWh/year))"])])
        .range([300, 30]);

    // Create x-axis and y-axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append x-axis
    barSvg.append("g")
        .attr("transform", "translate(0, 300)")
        .call(xAxis);

    // Append y-axis
    barSvg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);

    // Create bars
    barSvg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(+d["Mean(Labelled energy consumption (kWh/year))"]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 300 - yScale(+d["Mean(Labelled energy consumption (kWh/year))"]))
        .attr("fill", "steelblue");
    
}).catch(error => console.error("Error loading bar data:", error));