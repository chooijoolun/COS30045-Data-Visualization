// Dimensional Properties for charts
const Margin = { top: 30, right: 120, bottom: 50, left: 50 }; // Right margin widened for the legend
const Width = 800 - Margin.left - Margin.right;
const Height = 500 - Margin.top - Margin.bottom;

// Histogram Colors
const barColor = "#3498db";
const bodyBackgroundColor = "#fafafa"; 

// Filtering Component Initial States
const filters_screen = [
    { id: "all", label: "All Technologies", isActive: true },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "LED", label: "LED", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Central Layout Bin Generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(25); 

// --- Exercise 6.2 Global Scatterplot Placeholders ---
let innerChartS;
let xScaleS;
let yScaleS;
let tooltipG; // Tooltip structural group container

// Dynamic Color Palette for categories
const colorScale = d3.scaleOrdinal()
    .domain(["LCD", "LED", "OLED"])
    .range(["#e67e22", "#2ecc71", "#9b59b6"]); // Orange, Green, Purple