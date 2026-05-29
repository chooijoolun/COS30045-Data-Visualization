const data = [
    { brand: "Samsung",  count: 512 },
    { brand: "LG",       count: 300 },
    { brand: "Sony",     count: 596  },
    { brand: "Panasonic",count: 156  },
    { brand: "TCL",      count: 106  },
    { brand: "Hisense",  count: 251  },
    { brand: "Sharp",    count: 56   },
    { brand: "Philips",  count: 175   },
    { brand: "Vizio",    count: 191 },
    { brand: "Other",    count: 284   }
];

// ── DIMENSIONS ───────────────────────────────────────────────
const margin = { top: 16, right: 70, bottom: 16, left: 90 }; // left: room for brand name labels
// Bigger canvas so bars/labels are easier to read
const totalW  = 1400;
const totalH  = 560;
const innerW  = totalW - margin.left - margin.right; // drawable bar width
const innerH  = totalH - margin.top  - margin.bottom;

const svg = d3.select("#chart")
    .attr("viewBox", `0 0 ${totalW} ${totalH}`);

// Root group shifted by margin — bars start at x=0 inside this group
const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const createBarChart = data => {

    // ── SCALES ───────────────────────────────────────────────
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, innerW]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, innerH])
        .padding(0.2);

    const bandwidth = yScale.bandwidth();

    // ── BARS ─────────────────────────────────────────────────
    g.selectAll("rect.bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width",  d => xScale(d.count))
        .attr("height", bandwidth)
        .attr("fill", "#2563eb");

    // ── BRAND NAME LABELS — outside bar, to the LEFT ─────────
    g.selectAll("text.label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("x", -10)
        .attr("y", d => yScale(d.brand) + bandwidth / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-size", 13)
        .attr("fill", "#1f2937")
        .attr("font-weight", "600")
        .text(d => d.brand);

    // ── VALUE LABELS — outside bar, to the RIGHT ─────────────
    g.selectAll("text.value")
        .data(data)
        .join("text")
        .attr("class", "value")
        .attr("x", d => xScale(d.count) + 8)
        .attr("y", d => yScale(d.brand) + bandwidth / 2)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-size", 13)
        .attr("fill", "#1f2937")
        .attr("font-weight", "700")
        .text(d => d.count);
};

createBarChart(data);
