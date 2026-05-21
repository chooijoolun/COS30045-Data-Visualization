// main.js — D3 house and garden drawing

const W = 680, H = 420;

// 1. Select container and append SVG
const svg = d3.select("#house-container")
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

// Left edge — d3.path() builds path data programmatically
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

// ── HOUSE GROUP (grouping + transform) ──────────────────

const house = svg.append("g")
  .attr("id", "house")
  .attr("transform", "translate(160, 110)");

// House wall (rect)
house.append("rect")
  .attr("x", 0).attr("y", 120)
  .attr("width", 200).attr("height", 160)
  .attr("fill", "#CD853F")
  .attr("rx", 2);

// Roof — triangle using d3.path()
const roofPath = d3.path();
roofPath.moveTo(-20, 124);
roofPath.lineTo(100, 20);
roofPath.lineTo(220, 124);
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
const windowData = [
  { x: 12,  y: 150 },  // left window
  { x: 138, y: 150 },  // right window
];

const winGroups = house.selectAll("g.win")
  .data(windowData)
  .enter()
  .append("g")
  .attr("class", "win");

winGroups.append("rect")
  .attr("x", d => d.x).attr("y", d => d.y)
  .attr("width", 50).attr("height", 38)
  .attr("fill", "#add8e6")
  .attr("stroke", "#5C3317")
  .attr("stroke-width", 2)
  .attr("rx", 2);

winGroups.append("line")
  .attr("x1", d => d.x + 25).attr("y1", d => d.y)
  .attr("x2", d => d.x + 25).attr("y2", d => d.y + 38)
  .attr("stroke", "#5C3317")
  .attr("stroke-width", 1.5);

winGroups.append("line")
  .attr("x1", d => d.x).attr("y1", d => d.y + 19)
  .attr("x2", d => d.x + 50).attr("y2", d => d.y + 19)
  .attr("stroke", "#5C3317")
  .attr("stroke-width", 1.5);

// House label (text)
house.append("text")
  .attr("x", 100).attr("y", 112)
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", 13)
  .attr("font-weight", 600)
  .attr("fill", "#5C3317")
  .text("My House");

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
  { cx:  0, cy: 38, r: 40, fill: "#2d7a2d" },
  { cx: -18, cy: 52, r: 26, fill: "#3a9a3a" },
  { cx:  20, cy: 50, r: 24, fill: "#256325" },
];
foliage.forEach(c => {
  tree.append("circle")
    .attr("cx", c.cx).attr("cy", c.cy)
    .attr("r", c.r)
    .attr("fill", c.fill);
});

// ── FLOWERS — DATA BINDING ───────────────────────────────

// Flower bed ground (ellipse)
svg.append("ellipse")
  .attr("cx", 530).attr("cy", 318)
  .attr("rx", 65).attr("ry", 13)
  .attr("fill", "#5a9e4a");

// Flower heads — selectAll / data / enter pattern
const flowerData = [
  { x: 480, color: "#FF6B9D" },
  { x: 505, color: "#FFD700" },
  { x: 530, color: "#FF4500" },
  { x: 555, color: "#DA70D6" },
  { x: 580, color: "#FF6B9D" },
];

svg.selectAll("circle.flower")
  .data(flowerData)
  .enter()
  .append("circle")
  .attr("class", "flower")
  .attr("cx", d => d.x)
  .attr("cy", 305)
  .attr("r", 9)
  .attr("fill", d => d.color);

// ── FENCE — DATA BINDING ─────────────────────────────────

// d3.range() generates x positions for fence posts
const fencePositions = d3.range(430, 650, 18);

const fencePosts = svg.selectAll("g.fence")
  .data(fencePositions)
  .enter()
  .append("g")
  .attr("class", "fence");

fencePosts.append("rect")
  .attr("x", d => d).attr("y", 288)
  .attr("width", 10).attr("height", 26)
  .attr("fill", "#DEB887")
  .attr("stroke", "#C4A265")
  .attr("stroke-width", 0.5)
  .attr("rx", 2);

// Fence rail (line)
svg.append("line")
  .attr("x1", 430).attr("y1", 296)
  .attr("x2", 650).attr("y2", 296)
  .attr("stroke", "#C4A265")
  .attr("stroke-width", 3);