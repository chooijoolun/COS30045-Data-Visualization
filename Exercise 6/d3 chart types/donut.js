// Chart 2: Donut Chart Setup
const donutSvg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", "0 0 400 400");

// Load your TV Data here
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
    
    // Parse energy consumption values
    data.forEach(d => {
        d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
    });

    // Create pie layout
    const pie = d3.pie()
        .value(d => d.energy);

    const arc = d3.arc()
        .innerRadius(60)
        .outerRadius(150);

    const g = donutSvg.append("g")
        .attr("transform", "translate(200, 200)");

    // Color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screen_Tech))
        .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    // Create arc groups
    const arcs = g.selectAll("g")
        .data(pie(data))
        .enter()
        .append("g");

    // Append arcs (donut slices)
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.Screen_Tech));

    // Add labels
    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.Screen_Tech);
    
}).catch(error => console.error("Error loading donut data:", error));