 // ============================================
  // D3.js BAR CHART - TV Technology Distribution
  // ============================================

  // Data directly embedded (no external CSV needed)
  const tvTechData = [
    { Technology: "LED", Count: 167, color: "#3b82f6" },
    { Technology: "LCD", Count: 115, color: "#10b981" },
    { Technology: "OLED", Count: 10, color: "#f59e0b" }
  ];

  function createBarChart() {
    // Set up dimensions
    const margin = { top: 60, right: 30, bottom: 80, left: 60 };
    const width = 900 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Select the container
    const container = d3.select(".responsive-svg-container");
    
    // Clear any existing SVG
    container.html("");
    
    // Create SVG canvas
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .style("width", "100%")
      .style("height", "auto")
      .style("border", "none")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -25)
      .attr("class", "chart-main-title")
      .text("Number of TV Models by Screen Technology");

    // Sort data by count (descending)
    const data = [...tvTechData].sort((a, b) => b.Count - a.Count);

    // Create X scale (band scale for categories)
    const x = d3.scaleBand()
      .domain(data.map(d => d.Technology))
      .range([0, width])
      .padding(0.3);

    // Create Y scale (linear scale for count values)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Count) + 20])
      .range([height, 0]);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#334155")
      .style("font-weight", "500");

    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(8))
      .style("font-size", "11px")
      .style("fill", "#334155");

    // Add Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("class", "axis-label")
      .style("text-anchor", "middle")
      .text("Number of Models");

    // Add X axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("class", "axis-label")
      .style("text-anchor", "middle")
      .text("Screen Technology");

    // Create tooltip div
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "bar-tooltip")
      .style("opacity", 0);

    // Calculate total for percentage
    const total = data.reduce((sum, d) => sum + d.Count, 0);

    // Draw bars with animation
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Technology))
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", d => d.color)
      .attr("rx", 6)
      .attr("ry", 6)
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(200).attr("opacity", 0.8);
        const percentage = ((d.Count / total) * 100).toFixed(1);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(`
          <strong>${d.Technology}</strong><br/>
          Models: ${d.Count}<br/>
          Market Share: ${percentage}%
        `)
          .style("left", (event.pageX + 12) + "px")
          .style("top", (event.pageY - 30) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).transition().duration(200).attr("opacity", 1);
        tooltip.transition().duration(200).style("opacity", 0);
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 150)
      .attr("y", d => y(d.Count))
      .attr("height", d => height - y(d.Count));

    // Add value labels on top of bars
    svg.selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.Technology) + x.bandwidth() / 2)
      .attr("y", height)
      .attr("dy", "-5")
      .style("opacity", 0)
      .text(d => d.Count)
      .transition()
      .duration(800)
      .delay((d, i) => i * 150)
      .attr("y", d => y(d.Count) - 8)
      .style("opacity", 1);
  }

  // Create the chart when page loads
  createBarChart();

  // Handle window resize - recreate chart
  window.addEventListener('resize', function() {
    createBarChart();
  });