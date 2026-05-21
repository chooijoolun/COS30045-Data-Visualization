const data = [
    { brand: "Samsung", count: 1005 },
    { brand: "LG", count: 614 },
    { brand: "Sony", count: 596 },
    { brand: "Panasonic", count: 262 },
    { brand: "TCL", count: 206 },
    { brand: "Hisense", count: 151 },
    { brand: "Sharp", count: 96 },
    { brand: "Philips", count: 94 },
    { brand: "Vizio", count: 91 },
    { brand: "Other", count: 84 }
];

const svg = d3.select("#chart");

const createBarChart = data => {
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("x", 0)
        .attr("y", (d, i) => i * 30)
        .attr("width", d => d.count)
        .attr("height", 20)
        .attr("fill", "steelblue");
};

createBarChart(data);
