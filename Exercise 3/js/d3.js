/* storytelling charts — D3 chart definitions */

//  Chart 1 Data 
const tvTechData = [
  { Technology: "LCD",  Count: 115, color: "#10b981" },
  { Technology: "LED",  Count: 167, color: "#3b82f6" },
  { Technology: "OLED", Count: 10,  color: "#f59e0b" }
];

//  Chart 2 Data
const brandData = [
  { Brand: "LG",      Count: 637, color: "#3b82f6" },
  { Brand: "SAMSUNG", Count: 449, color: "#10b981" },
  { Brand: "KOGAN",   Count: 195, color: "#f59e0b" },
  { Brand: "EKO",     Count: 170, color: "#ef4444" },
  { Brand: "HISENSE", Count: 148, color: "#8b5cf6" }
];

//  Chart 3 Data 
const powerData = [
  { tech: "LCD",       pasv: 0.283, act: 0.717,  color: "#3b82f6" },
  { tech: "LCD (LED)", pasv: 0.332, act: 0.700,  color: "#10b981" },
  { tech: "Plasma",    pasv: 0.400, act: 13.333, color: "#f59e0b" },
  { tech: "OLED",      pasv: 0.401, act: 4.198,  color: "#ef4444" }
];

//  Shared tooltip factory 
function createTooltip() {
  return d3.select("body").append("div")
    .style("position", "absolute")
    .style("background", "#0a3d62")
    .style("color", "white")
    .style("padding", "10px 16px")
    .style("border-radius", "8px")
    .style("font-size", "13px")
    .style("pointer-events", "none")
    .style("z-index", "100")
    .style("box-shadow", "0 2px 10px rgba(0,0,0,0.2)")
    .style("opacity", 0);
}

//  Chart 1: TV Screen Technology Availability 
function createChart1() {
  const margin = { top: 50, right: 30, bottom: 70, left: 70 };
  const width  = 1000 - margin.left - margin.right;
  const height = 450  - margin.top  - margin.bottom;

  const container = d3.select("#chart1-container");
  container.html("");

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .style("width", "100%").style("height", "auto")
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const data = [...tvTechData].sort((a, b) => b.Count - a.Count);

  const x = d3.scaleBand().domain(data.map(d => d.Technology)).range([0, width]).padding(0.35);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Count) + 20]).range([height, 0]);

  svg.append("g").attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(8))
    .selectAll("text")
    .style("font-size", "14px").style("font-weight", "bold").style("fill", "#1e3a8a");

  svg.append("g").call(d3.axisLeft(y).ticks(8))
    .style("font-size", "13px").style("fill", "#334155");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2).attr("y", -50)
    .style("font-size", "14px").style("font-weight", "bold").style("fill", "#1e3a8a")
    .style("text-anchor", "middle")
    .text("Number of Models");

  const tooltip = createTooltip();
  const total = data.reduce((s, d) => s + d.Count, 0);

  svg.selectAll(".bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.Technology)).attr("width", x.bandwidth())
    .attr("y", height).attr("height", 0)
    .attr("fill", d => d.color).attr("rx", 4)
    .on("mouseover", function (event, d) {
      d3.select(this).transition().duration(200).attr("opacity", 0.8);
      tooltip.transition().duration(200).style("opacity", 0.95)
        .html(`<strong>${d.Technology}</strong><br/>Models: ${d.Count}<br/>Market Share: ${((d.Count / total) * 100).toFixed(1)}%`)
        .style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 40) + "px");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("opacity", 1);
      tooltip.transition().duration(200).style("opacity", 0);
    })
    .transition().duration(800).delay((_, i) => i * 150)
    .attr("y", d => y(d.Count)).attr("height", d => height - y(d.Count));

  svg.selectAll(".bar-label").data(data).enter().append("text")
    .attr("class", "bar-label")
    .attr("x", d => x(d.Technology) + x.bandwidth() / 2)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .style("font-size", "15px").style("font-weight", "700").style("fill", "#1e3a8a")
    .style("opacity", 0)
    .transition().duration(400).delay((_, i) => i * 150 + 800)
    .attr("y", d => y(d.Count) - 8)
    .style("opacity", 1)
    .text(d => d.Count);
}

//  Chart 2: Number of Models by Brand 
function createChart2() {
  const margin = { top: 50, right: 30, bottom: 70, left: 70 };
  const width  = 1000 - margin.left - margin.right;
  const height = 450  - margin.top  - margin.bottom;

  const container = d3.select("#chart2-container");
  container.html("");

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .style("width", "100%").style("height", "auto")
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const data = [...brandData].sort((a, b) => b.Count - a.Count);

  const x = d3.scaleBand().domain(data.map(d => d.Brand)).range([0, width]).padding(0.35);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Count) + 60]).range([height, 0]);

  svg.append("g").attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(8))
    .selectAll("text")
    .style("font-size", "14px").style("font-weight", "bold").style("fill", "#1e3a8a");

  svg.append("g").call(d3.axisLeft(y).ticks(8))
    .style("font-size", "13px").style("fill", "#334155");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2).attr("y", -50)
    .style("font-size", "14px").style("font-weight", "bold").style("fill", "#1e3a8a")
    .style("text-anchor", "middle")
    .text("Count of Models");

  svg.append("text")
    .attr("x", width / 2).attr("y", height + 50)
    .style("font-size", "14px").style("font-weight", "bold").style("fill", "#1e3a8a")
    .style("text-anchor", "middle")
    .text("Brand");

  const tooltip = createTooltip();
  const total = data.reduce((s, d) => s + d.Count, 0);

  svg.selectAll(".bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.Brand)).attr("width", x.bandwidth())
    .attr("y", height).attr("height", 0)
    .attr("fill", d => d.color).attr("rx", 4)
    .on("mouseover", function (event, d) {
      d3.select(this).transition().duration(200).attr("opacity", 0.8);
      tooltip.transition().duration(200).style("opacity", 0.95)
        .html(`<strong>${d.Brand}</strong><br/>Models: ${d.Count}<br/>Market Share: ${((d.Count / total) * 100).toFixed(1)}%`)
        .style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 40) + "px");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("opacity", 1);
      tooltip.transition().duration(200).style("opacity", 0);
    })
    .transition().duration(800).delay((_, i) => i * 150)
    .attr("y", d => y(d.Count)).attr("height", d => height - y(d.Count));

  svg.selectAll(".bar-label").data(data).enter().append("text")
    .attr("class", "bar-label")
    .attr("x", d => x(d.Brand) + x.bandwidth() / 2)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .style("font-size", "15px").style("font-weight", "700").style("fill", "#1e3a8a")
    .style("opacity", 0)
    .transition().duration(400).delay((_, i) => i * 150 + 800)
    .attr("y", d => y(d.Count) - 8)
    .style("opacity", 1)
    .text(d => d.Count);
}

//  Chart 3: Average Power Consumption by Screen Technology 
function createChart3() {
  const margin = { top: 50, right: 40, bottom: 90, left: 80 };
  const width  = 1000 - margin.left - margin.right;
  const height = 480  - margin.top  - margin.bottom;

  const container = d3.select("#chart3-container");
  container.html("");

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .style("width", "100%").style("height", "auto")
    .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const groups = ["Mean(Pasv_stnd_power)", "Mean(Act_stnd_power)"];
  const groupLabels = {
    "Mean(Pasv_stnd_power)": "pasv",
    "Mean(Act_stnd_power)":  "act"
  };

  const x0 = d3.scaleBand().domain(groups).range([0, width]).paddingInner(0.3).paddingOuter(0.15);
  const x1 = d3.scaleBand().domain(powerData.map(d => d.tech)).range([0, x0.bandwidth()]).padding(0.08);
  const y  = d3.scaleLinear().domain([0, 15]).range([height, 0]);

  // Gridlines
  svg.append("g").attr("class", "grid")
    .call(d3.axisLeft(y).ticks(8).tickSize(-width).tickFormat(""))
    .selectAll("line")
    .style("stroke", "#e2e8f0").style("stroke-dasharray", "3,3");
  svg.select(".grid .domain").remove();

  // X axis
  svg.append("g").attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x0).tickSize(0))
    .selectAll("text")
    .style("font-size", "13px").style("font-weight", "700").style("fill", "#1e3a8a")
    .attr("dy", "1.4em");

  // X axis label
  svg.append("text")
    .attr("x", width / 2).attr("y", height + 68)
    .style("font-size", "14px").style("font-weight", "700")
    .style("fill", "#1e3a8a").style("text-anchor", "middle")
    .text("Screen Technology Type");

  // Y axis
  svg.append("g").call(d3.axisLeft(y).ticks(8))
    .style("font-size", "12px").style("fill", "#334155");

  // Y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2).attr("y", -62)
    .style("font-size", "13px").style("font-weight", "700")
    .style("fill", "#1e3a8a").style("text-anchor", "middle")
    .text("Average Power Consumption (Watts)");

  const tooltip = createTooltip();

  // Draw grouped bars
  groups.forEach((grp, gi) => {
    const key = groupLabels[grp];
    const gx  = x0(grp);

    svg.selectAll(`.bar-${gi}`).data(powerData).enter().append("rect")
      .attr("class", `bar-${gi}`)
      .attr("x", d => gx + x1(d.tech))
      .attr("width", x1.bandwidth())
      .attr("y", height).attr("height", 0)
      .attr("fill", d => d.color).attr("rx", 3).attr("opacity", 0.9)
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(150).attr("opacity", 0.7);
        tooltip.transition().duration(200).style("opacity", 0.95)
          .html(`<strong>${d.tech}</strong><br/>${grp.replace("Mean(", "").replace(")", "")}: <strong>${d[key]}W</strong>`)
          .style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 40) + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(150).attr("opacity", 0.9);
        tooltip.transition().duration(200).style("opacity", 0);
      })
      .transition().duration(800).delay((_, i) => gi * 200 + i * 120)
      .attr("y", d => y(d[key]))
      .attr("height", d => height - y(d[key]));

    svg.selectAll(`.label-${gi}`).data(powerData).enter().append("text")
      .attr("class", `label-${gi}`)
      .attr("x", d => gx + x1(d.tech) + x1.bandwidth() / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "11px").style("font-weight", "700").style("fill", "#1e3a8a")
      .style("opacity", 0)
      .transition().duration(300).delay((_, i) => gi * 200 + i * 120 + 800)
      .attr("y", d => y(d[key]) - 5)
      .style("opacity", 1)
      .text(d => d[key]);
  });
}

//  Initialise all charts 
createChart1();
createChart2();
createChart3();

//  Re-render on resize 
window.addEventListener("resize", () => {
  createChart1();
  createChart2();
  createChart3();
});