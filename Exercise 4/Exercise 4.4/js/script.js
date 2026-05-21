d3.csv("./data/Rating_on_Screen_Technology.csv", d => {
    return {
        screenTech: d.Screen_Tech,
        meanStar: +d["Mean(Star)"]
    };
}).then(data => {
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.meanStar));
    console.log(d3.min(data, d => d.meanStar));
    console.log(d3.extent(data, d => d.meanStar));

    createBarChart(data);
}).catch(error => {
    console.error("Error loading CSV:", error);
    d3.select("body").append("p").text("Error loading data: " + error);
});

const createBarChart = (data) => {
    const width = 700;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 70, left: 60 };

    d3.select("body").select("svg").remove();

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

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
