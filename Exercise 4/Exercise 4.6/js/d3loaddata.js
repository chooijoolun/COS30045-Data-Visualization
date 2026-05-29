const fallbackData = [
    { screenTech: "LCD", meanStar: 6.6 },
    { screenTech: "LCD (LED)", meanStar: 7.276041666666666 },
    { screenTech: "OLED", meanStar: 7.3125 },
    { screenTech: "Plasma", meanStar: 5.583333333333333 }
];

function renderFallbackMessage(message) {
    const container = d3.select("#chart-container");
    if (container.empty()) return;

    container.selectAll(".chart-message").remove();
    container
        .insert("p", ":first-child")
        .attr("class", "chart-message")
        .text(message);
}

function loadCsvData() {
    return d3.csv("./data/Rating_on_Screen_Technology.csv", d => {
        return {
            screenTech: d.Screen_Tech,
            meanStar: +d["Mean(Star)"]
        };
    });
}

loadCsvData()
    .then(data => {
        createBarChart(data);
    })
    .catch(error => {
        console.error("Error loading CSV:", error);
        renderFallbackMessage("CSV could not be loaded, so a fallback chart is shown below.");
        createBarChart(fallbackData);
    });

const createBarChart = (data) => {
    const width = 700;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 70, left: 60 };

    const container = d3.select("#chart-container");
    if (container.empty()) {
        console.error("Chart container #chart-container not found");
        return;
    }

    container.selectAll("svg").remove();

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("role", "img")
        .attr("aria-label", "Average screen technology rating bar chart");

    const x = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([margin.left, width - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.meanStar)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.screenTech))
        .attr("y", d => y(d.meanStar))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.bottom - y(d.meanStar))
        .attr("fill", "steelblue");

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-20)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 24)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Average Screen Technology Rating");
};
