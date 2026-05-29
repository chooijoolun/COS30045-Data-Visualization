// Generates control buttons dynamically
function populateFilters(rawData) {
    const filterDiv = d3.select("#filters");

    filterDiv.selectAll("button")
        .data(filters_screen)
        .enter()
        .append("button")
        .attr("class", d => d.isActive ? "filter-btn active" : "filter-btn")
        .text(d => d.label)
        .on("click", function(event, clickedData) {
            filterDiv.selectAll("button").classed("active", false);
            d3.select(this).classed("active", true);

            updateHistogram(clickedData.id, rawData);
        });
}

// Redraws histogram bars AND links scatterplot interactions
function updateHistogram(techId, rawData) {
    const filteredData = techId === "all" ? rawData : rawData.filter(d => d.screenTech === techId);
    const updatedBins = binGenerator(filteredData);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(rawData, d => d.energyConsumption)]) 
        .range([0, Width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(updatedBins, d => d.length)])
        .range([Height, 0]);

    const svg = d3.select("#chart svg g");
    const bars = svg.selectAll(".bar-rect").data(updatedBins);

    // Remove old structural elements
    bars.exit()
        .transition()
        .duration(300)
        .attr("y", Height)
        .attr("height", 0)
        .remove();

    // Enter newly needed bars
    const newBars = bars.enter()
        .append("rect")
        .attr("class", "bar-rect")
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", "2px")
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("y", Height)
        .attr("height", 0);

    // Transition updating and entering bars together
    bars.merge(newBars)
        .transition()
        .duration(400)
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("y", d => yScale(d.length))
        .attr("height", d => Height - yScale(d.length));

    // Update Y-Axis
    svg.select(".y-axis")
        .transition()
        .duration(400)
        .call(d3.axisLeft(yScale));

    // Update X-Axis
    svg.select(".x-axis")
        .transition()
        .duration(400)
        .call(d3.axisBottom(xScale));


    //  FOR SCATTERPLOT FILTERING
 
    // Update visibility of scatterplot circles based on the active button filter
    innerChartS.selectAll(".dot")
        .transition()
        .duration(300)
        .style("opacity", d => (techId === "all" || d.screenTech === techId) ? 0.6 : 0)
        .style("pointer-events", d => (techId === "all" || d.screenTech === techId) ? "auto" : "none");

    // Re-bind mouse events so tooltips don't activate on hidden elements
    handleMouseEvents();
}


function createTooltip() {
    // Append hidden overlay group layer onto target plot chart space
    tooltipG = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none"); 

    // Tooltip Base Plate
    tooltipG.append("rect")
        .attr("width", 140)
        .attr("height", 50)
        .attr("rx", 6) // Smooth rounded corners
        .attr("ry", 6)
        .attr("fill", "#2c3e50")
        .attr("opacity", 0.9);

    // Line 1: Brand/Model Info
    tooltipG.append("text")
        .attr("id", "tooltip-title")
        .attr("x", 10)
        .attr("y", 20)
        .attr("fill", "#fff")
        .style("font-size", "11px")
        .style("font-weight", "bold");

    // Line 2: Screen Metric Details
    tooltipG.append("text")
        .attr("id", "tooltip-size")
        .attr("x", 10)
        .attr("y", 38)
        .attr("fill", "#ecf0f1")
        .style("font-size", "11px");
}

function handleMouseEvents() {
    // Filter to only attach handlers to active (visible) data circles
    innerChartS.selectAll(".dot")
        .filter(function() { 
            return d3.select(this).style("pointer-events") !== "none"; 
        })
        .on("mouseenter", function(event, d) {
            // Isolate individual active node target element attribute markers
            const cx = +d3.select(this).attr("cx");
            const cy = +d3.select(this).attr("cy");

            // Update text elements with data attributes
            d3.select("#tooltip-title").text(`${d.brand} (${d.screenTech})`);
            d3.select("#tooltip-size").text(`Size: ${d.screenSize}-inch`);

            // Position and animate the tooltip into view
            tooltipG.attr("transform", `translate(${cx + 10}, ${cy - 25})`)
                .transition()
                .duration(150)
                .style("opacity", 1);

            // Highlight the active circle
            d3.select(this)
                .transition()
                .duration(100)
                .attr("r", 8)
                .style("opacity", 1);
        })
        .on("mouseleave", function() {
            // Smoothly hide tooltip layer
            tooltipG.transition()
                .duration(150)
                .style("opacity", 0);

            // Reset circle size and opacity
            d3.select(this)
                .transition()
                .duration(100)
                .attr("r", 5)
                .style("opacity", 0.6);
        });
}

