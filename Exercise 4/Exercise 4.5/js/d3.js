// main.js — D3 house and garden drawing
const W = 680, H = 420;

// Added houseX parameter with a default value of 160
function createScene(svgSelector, roofScale = 1, treeScale = 1, houseX = 160, windowWidth = 50, windowHeight = 38, labelChanges = false) {
  const svg = d3.select(svgSelector)
    .append("svg")
    .attr("width", W)
    .attr("height", H)
    .attr("viewBox", `0 0 ${W} ${H}`);

  // ── BACKGROUND ──────────────────────────────────────────
  // Sky (rect)
  svg.append("rect")
    .attr("width", W)
    .attr("height", H)
    .attr("fill", "#87CEEB");

  // Ground (rect)
  svg.append("rect")
    .attr("x", 0).attr("y", 300)
    .attr("width", W).attr("height", 120)
    .attr("fill", "#4a7c3f");

  // ── GARDEN PATH ─────────────────────────────────────────
  // Left edge
  const leftEdge = d3.path();
  leftEdge.moveTo(310, 420);
  leftEdge.bezierCurveTo(300, 380, 270, 350, 310, 320);
  leftEdge.bezierCurveTo(340, 300, 360, 300, 355, 300);
  svg.append("path")
    .attr("d", leftEdge.toString())
    .attr("fill", "none")
    .attr("stroke", "#c8a96e")
    .attr("stroke-width", 20)
    .attr("stroke-linecap", "round");

  // Right edge
  const rightEdge = d3.path();
  rightEdge.moveTo(350, 420);
  rightEdge.bezierCurveTo(340, 380, 310, 350, 350, 320);
  rightEdge.bezierCurveTo(375, 300, 395, 300, 390, 300);
  svg.append("path")
    .attr("d", rightEdge.toString())
    .attr("fill", "none")
    .attr("stroke", "#c8a96e")
    .attr("stroke-width", 20)
    .attr("stroke-linecap", "round");

  // ── HOUSE GROUP (Using dynamic template literals for X coordinate) ──
  const house = svg.append("g")
    .attr("id", "house")
    .attr("transform", `translate(${houseX}, 110)`); // Dynamic house position

  // House wall (rect)
  house.append("rect")
    .attr("x", 0).attr("y", 120)
    .attr("width", 200).attr("height", 160)
    .attr("fill", "#CD853F")
    .attr("rx", 2);

  // Roof — triangle using d3.path()
  const roofPath = d3.path();
  roofPath.moveTo(-20 * roofScale, 124);
  roofPath.lineTo(100, 20 - (20 * (roofScale - 1))); 
  roofPath.lineTo(220 + (20 * (roofScale - 1)), 124);
  roofPath.closePath();
  house.append("path")
    .attr("d", roofPath.toString())
    .attr("fill", "#8B4513");

  // Chimney (rect)
  house.append("rect")
    .attr("x", 140).attr("y", 45)
    .attr("width", 24).attr("height", 50)
    .attr("fill", "#6B3410");

  // Door (rect)
  house.append("rect")
    .attr("x", 75).attr("y", 200)
    .attr("width", 50).attr("height", 80)
    .attr("fill", "#5C3317")
    .attr("rx", 3);

  // Door knob (circle)
  house.append("circle")
    .attr("cx", 118).attr("cy", 242)
    .attr("r", 4)
    .attr("fill", "#FFD700");

  // Windows — DATA BINDING
  // Right window x is calculated so it always stays inside the 200px wide house wall:
  // rightX + windowWidth + 8px margin = 200  →  rightX = 200 - windowWidth - 8
  const windowData = [
    { x: 12,                      y: 150 },  // Left window  — fixed 12px from left wall edge
    { x: 200 - windowWidth - 8,   y: 150 },  // Right window — 8px margin from right wall edge
  ];

  const winGroups = house.selectAll("g.win")
    .data(windowData)
    .enter()
    .append("g")
    .attr("class", "win");

  // Window frame — now uses dynamic windowWidth and windowHeight
  winGroups.append("rect")
    .attr("x", d => d.x).attr("y", d => d.y)
    .attr("width", windowWidth).attr("height", windowHeight)
    .attr("fill", "#add8e6")
    .attr("stroke", "#5C3317")
    .attr("stroke-width", 2)
    .attr("rx", 2);

  // Vertical divider line — centred on dynamic width
  winGroups.append("line")
    .attr("x1", d => d.x + windowWidth / 2).attr("y1", d => d.y)
    .attr("x2", d => d.x + windowWidth / 2).attr("y2", d => d.y + windowHeight)
    .attr("stroke", "#5C3317")
    .attr("stroke-width", 1.5);

  // Horizontal divider line — centred on dynamic height
  winGroups.append("line")
    .attr("x1", d => d.x).attr("y1", d => d.y + windowHeight / 2)
    .attr("x2", d => d.x + windowWidth).attr("y2", d => d.y + windowHeight / 2)
    .attr("stroke", "#5C3317")
    .attr("stroke-width", 1.5);

  // House label (text)
  house.append("text")
    .attr("x", 100).attr("y", 112)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", 13)
    .attr("font-weight", 600)
    .attr("fill", "#5C3317");

  // ── CHANGE LABELS (After Modification only) ──────────────
  if (labelChanges) {

    // Arrow marker definition (must be added before any marker-end refs)
    const defs = svg.append("defs");
    defs.append("marker")
      .attr("id", "arrow-red")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5).attr("refY", 5)
      .attr("markerWidth", 4).attr("markerHeight", 4)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#c0392b");

    defs.append("marker")
      .attr("id", "arrow-orange")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5).attr("refY", 5)
      .attr("markerWidth", 4).attr("markerHeight", 4)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#e67e22");

    // Helper: draw a white-bg label box + text + optional arrow
    // anchor: "middle" | "start" | "end"
    function addLabel(x, y, text, color, arrowTo = null, markerColor = "red") {
      const pad = 3;
      const charW = 6.5;
      const bw = text.length * charW + pad * 2;
      const bh = 14;

      // White background rect for readability
      svg.append("rect")
        .attr("x", x - bw / 2).attr("y", y - bh + 2)
        .attr("width", bw).attr("height", bh)
        .attr("fill", "white")
        .attr("opacity", 0.85)
        .attr("rx", 2);

      // Label text
      svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 11)
        .attr("fill", color)
        .attr("font-weight", "bold")
        .text(text);

      // Arrow from bottom of label box to arrowTo point
      if (arrowTo) {
        const markerId = markerColor === "orange" ? "arrow-orange" : "arrow-red";
        svg.append("line")
          .attr("x1", arrowTo.x).attr("y1", y + 2)           // start just below label
          .attr("x2", arrowTo.x).attr("y2", arrowTo.y - 2)   // end just above target
          .attr("stroke", color)
          .attr("stroke-width", 1.5)
          .attr("marker-end", `url(#${markerId})`);
      }
    }

    // ── Window width labels (red) — one above each window ──
    // House group is translated by (houseX, 110), so abs coords = houseX + d.x, 110 + d.y
    windowData.forEach((d) => {
      const absX = houseX + d.x;
      const absY = 110 + d.y;                   // top of window in svg coords
      const winCx = absX + windowWidth / 2;     // horizontal centre of window

      addLabel(
        winCx, absY - 20,                        // label position: above window
        `Width: ${windowWidth}px`,               // text — what changed
        "#c0392b",                               // red
        { x: winCx, y: absY },                  // arrow points to window top
        "red"
      );
    });

    // ── Roof scale label (blue) — centred above the roof peak ──
    const roofLabelX = houseX + 100;            // horizontal centre of roof
    addLabel(
      roofLabelX, 58,                            // label sits above the roof triangle
      `Roof scale: ${roofScale}×`,              // text — what changed
      "#1a6bb5"                                  // blue, no arrow needed (roof is clearly visible)
    );

    // ── Tree scale label (orange) ──
    // Tree group origin: translate(88, 220). Main foliage circle: cx=0, cy=38, r=40*treeScale.
    // Foliage top in SVG coords = 220 + 38 - (40 * treeScale).
    // Place label above-left of tree; arrow points diagonally down to the foliage top.
    const treeOriginX = 98;   // tree group translate X
    const treeOriginY = 220;  // tree group translate Y
    const foliageTopY = treeOriginY + 38 - (40 * treeScale);  // absolute SVG Y of foliage top
    const foliageCX   = treeOriginX;                          // foliage circle centre X

    const treeLabelX = treeOriginX - 52;  // label centred well left of the tree
    const treeLabelY = foliageTopY - 14;  // label sits above the foliage top

    addLabel(
      treeLabelX, treeLabelY,
      `Tree scale: ${treeScale}x`,          // text — what changed
      "#e67e22",                             // orange — distinct from green foliage
      { x: foliageCX - 30, y: foliageTopY + 8 },  // arrow tip lands on upper-left foliage edge
      "orange"
    );

    // ── House position label (purple) — along the bottom, below the ground ──
    addLabel(
      houseX + 100, 408,                         // horizontally centred under house
      `House X: ${houseX} (shifted right)`,     // text — what changed
      "#8e44ad"                                  // purple
    );
  }

  // ── TREE GROUP (grouping + transform) ───────────────────
  const tree = svg.append("g")
    .attr("id", "tree")
    .attr("transform", "translate(88, 220)");

  // Trunk (rect)
  tree.append("rect")
    .attr("x", -7).attr("y", 55)
    .attr("width", 14).attr("height", 50)
    .attr("fill", "#8B6914");

  // Foliage (circles)
  const foliage = [
    { cx:  0, cy: 38, r: 40 * treeScale, fill: "#2d7a2d" },
    { cx: -18 * treeScale, cy: 52, r: 26 * treeScale, fill: "#3a9a3a" },
    { cx:  20 * treeScale, cy: 50, r: 24 * treeScale, fill: "#256325" },
  ];
  foliage.forEach(c => {
    tree.append("circle")
      .attr("cx", c.cx).attr("cy", c.cy)
      .attr("r", c.r)
      .attr("fill", c.fill);
  });
}

// ── RENDER SCENES ─────────────────────────────────────────

// Create original version — windows: width=50, height=38 (original)
createScene("#house-container",   1,   1,   160, 50,  38, false);

// Create modified version — windows WIDER (width=70, height=38), bigger roof & tree, shifted house
//   labelChanges=true → shows red labels for window width, blue for roof, green for tree, purple for house X
createScene("#house-container-2", 1.3, 1.4, 320, 70,  38, true);

// -------------------------------------------------------------------
// Storytelling charts
// -------------------------------------------------------------------

function createResponsiveSvg(containerSelector, width, height) {
  const container = d3.select(containerSelector);
  if (container.empty()) return null;

  container.selectAll("*").remove();

  return container
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto")
    .style("display", "block");
}

function renderNoData(containerSelector, message) {
  const container = d3.select(containerSelector);
  if (container.empty()) return;

  container.selectAll("*").remove();
  container
    .append("div")
    .style("padding", "1rem")
    .style("color", "#b91c1c")
    .style("font-family", "Arial, sans-serif")
    .text(message);
}

function prettyBrand(value) {
  const upper = String(value || "").trim().toUpperCase();
  const special = {
    LG: "LG",
    EKO: "Eko",
    KOGAN: "Kogan",
    HISENSE: "Hisense",
    SAMSUNG: "Samsung",
  };

  if (special[upper]) return special[upper];

  return upper
    .split(/\s+/)
    .map(part => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

function renderScreenTechChart(data) {
  const width = 960;
  const height = 420;
  const margin = { top: 24, right: 30, bottom: 36, left: 150 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = createResponsiveSvg("#chart1-container", width, height);
  if (!svg) return;

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count) || 0])
    .nice()
    .range([0, innerW]);

  const y = d3.scaleBand()
    .domain(data.map(d => d.tech))
    .range([0, innerH])
    .padding(0.25);

  g.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 0)
    .attr("y", d => y(d.tech))
    .attr("width", d => x(d.count))
    .attr("height", y.bandwidth())
    .attr("rx", 6)
    .attr("fill", (d, i) => ["#2563eb", "#10b981", "#f59e0b"][i % 3]);

  g.selectAll("text.tech")
    .data(data)
    .join("text")
    .attr("class", "tech")
    .attr("x", -12)
    .attr("y", d => y(d.tech) + y.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 600)
    .attr("fill", "#1f2937")
    .text(d => d.tech);

  g.selectAll("text.value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", d => x(d.count) + 8)
    .attr("y", d => y(d.tech) + y.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 13)
    .attr("font-weight", 700)
    .attr("fill", "#334155")
    .text(d => d.count);

  g.append("g")
    .attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

  g.append("text")
    .attr("x", innerW / 2)
    .attr("y", -4)
    .attr("text-anchor", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 700)
    .attr("fill", "#0f172a")
    .text("Models available");
}

function renderBrandChart(data) {
  const width = 960;
  const height = 460;
  const margin = { top: 24, right: 36, bottom: 36, left: 170 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = createResponsiveSvg("#chart2-container", width, height);
  if (!svg) return;

  const sorted = [...data].sort((a, b) => d3.descending(a.count, b.count));
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, d3.max(sorted, d => d.count) || 0])
    .nice()
    .range([0, innerW]);

  const y = d3.scaleBand()
    .domain(sorted.map(d => d.brand))
    .range([0, innerH])
    .padding(0.22);

  g.selectAll("rect")
    .data(sorted)
    .join("rect")
    .attr("x", 0)
    .attr("y", d => y(d.brand))
    .attr("width", d => x(d.count))
    .attr("height", y.bandwidth())
    .attr("rx", 6)
    .attr("fill", "#0ea5a8");

  g.selectAll("text.brand")
    .data(sorted)
    .join("text")
    .attr("class", "brand")
    .attr("x", -12)
    .attr("y", d => y(d.brand) + y.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 600)
    .attr("fill", "#1f2937")
    .text(d => d.brand);

  g.selectAll("text.value")
    .data(sorted)
    .join("text")
    .attr("class", "value")
    .attr("x", d => x(d.count) + 8)
    .attr("y", d => y(d.brand) + y.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 13)
    .attr("font-weight", 700)
    .attr("fill", "#334155")
    .text(d => d.count);

  g.append("g")
    .attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));
}

function renderPowerChart(data) {
  const width = 960;
  const height = 460;
  const margin = { top: 24, right: 28, bottom: 54, left: 66 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = createResponsiveSvg("#chart3-container", width, height);
  if (!svg) return;

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x0 = d3.scaleBand()
    .domain(data.map(d => d.tech))
    .range([0, innerW])
    .padding(0.2);

  const x1 = d3.scaleBand()
    .domain(["Passive standby", "Active standby"])
    .range([0, x0.bandwidth()])
    .padding(0.18);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d.passive, d.active)) || 0])
    .nice()
    .range([innerH, 0]);

  const colors = {
    "Passive standby": "#3b82f6",
    "Active standby": "#ef4444",
  };

  const series = [
    { key: "Passive standby", accessor: d => d.passive },
    { key: "Active standby", accessor: d => d.active },
  ];

  const techGroups = g.selectAll("g.tech")
    .data(data)
    .join("g")
    .attr("class", "tech")
    .attr("transform", d => `translate(${x0(d.tech)},0)`);

  techGroups.selectAll("rect")
    .data(d => series.map(s => ({ key: s.key, value: s.accessor(d), tech: d.tech })))
    .join("rect")
    .attr("x", d => x1(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", d => innerH - y(d.value))
    .attr("rx", 5)
    .attr("fill", d => colors[d.key]);

  techGroups.selectAll("text.bar-value")
    .data(d => series.map(s => ({ key: s.key, value: s.accessor(d), tech: d.tech })))
    .join("text")
    .attr("class", "bar-value")
    .attr("x", d => x1(d.key) + x1.bandwidth() / 2)
    .attr("y", d => y(d.value) - 8)
    .attr("text-anchor", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 11)
    .attr("font-weight", 700)
    .attr("fill", "#0f172a")
    .text(d => d.value.toFixed(2));

  g.append("g")
    .attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x0))
    .selectAll("text")
    .attr("transform", "rotate(-15)")
    .style("text-anchor", "end");

  g.append("g")
    .call(d3.axisLeft(y).ticks(6));

  g.append("text")
    .attr("x", innerW / 2)
    .attr("y", -4)
    .attr("text-anchor", "middle")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 700)
    .attr("fill", "#0f172a")
    .text("Watts");
}

function initStorytellingCharts() {
  const screenTech = [
    { tech: "LED", count: 167 },
    { tech: "LCD", count: 115 },
    { tech: "OLED", count: 10 },
  ];

  const brands = [
    { brand: prettyBrand("LG"), count: 637 },
    { brand: prettyBrand("SAMSUNG"), count: 449 },
    { brand: prettyBrand("KOGAN"), count: 195 },
    { brand: prettyBrand("EKO"), count: 170 },
    { brand: prettyBrand("HISENSE"), count: 148 },
  ];

  const power = [
    { tech: "LCD", passive: 0.283494, active: 0.716545262 },
    { tech: "LCD (LED)", passive: 0.332371482, active: 0.700360897 },
    { tech: "Plasma", passive: 0.4, active: 13.33333333 },
    { tech: "OLED", passive: 0.401985866, active: 4.197883392 },
  ];

  renderScreenTechChart(screenTech);
  renderBrandChart(brands);
  renderPowerChart(power);
}

if (document.querySelector("#chart1-container")) {
  initStorytellingCharts();
}

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