d3.csv("data/Ex6_TVdata.csv").then(data => {
    
    // Convert strings into numerical formats
    data.forEach(d => {
        d.energyConsumption = +d.energyConsumption;
        d.screenSize = +d.screenSize;
        d.star = +d.star;
    });

    // Initialize UI and charts in correct order
    populateFilters(data);
    drawHistogram(data);
    drawScatterplot(data);   
    createTooltip();         
    handleMouseEvents();     

}).catch(err => console.error("Error loading CSV file metrics: ", err));