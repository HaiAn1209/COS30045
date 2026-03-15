const populateFilters = (data) => {
    const screenContainer = d3.select("#filters_screen");
    const sizeContainer = d3.select("#filters_size");

    screenContainer.selectAll("*").remove();
    sizeContainer.selectAll("*").remove();

    // Screen technology buttons
    screenContainer.selectAll("button")
        .data(filters_screen)
        .join("button")
        .attr("class", d => d.isActive ? "active" : null)
        .text(d => d.label)
        .on("click", (event, clickedFilter) => {
            filters_screen.forEach(filter => {
                filter.isActive = filter.id === clickedFilter.id;
            });

            screenContainer.selectAll("button")
                .attr("class", d => d.isActive ? "active" : null);

            updateHistogram(data);
        });

    // Screen size buttons
    sizeContainer.selectAll("button")
        .data(filters_size)
        .join("button")
        .attr("class", d => d.isActive ? "active" : null)
        .text(d => d.label)
        .on("click", (event, clickedFilter) => {
            filters_size.forEach(filter => {
                filter.isActive = filter.id === clickedFilter.id;
            });

            sizeContainer.selectAll("button")
                .attr("class", d => d.isActive ? "active" : null);

            updateHistogram(data);
        });
};

const updateHistogram = (originalData) => {
    const activeScreen = filters_screen.find(d => d.isActive).id;
    const activeSize = filters_size.find(d => d.isActive).id;

    let updatedData = originalData;

    // apply screen filter
    if (activeScreen !== "all") {
        updatedData = updatedData.filter(d => d.screenTech === activeScreen);
    }

    // apply size filter
    if (activeSize !== "all") {
        updatedData = updatedData.filter(d => d.screenSize === activeSize);
    }

    const updatedBins = binGenerator(updatedData);

    const xMin = d3.min(updatedBins, d => d.x0) ?? 0;
    const xMax = d3.max(updatedBins, d => d.x1) ?? 1;
    const yMax = d3.max(updatedBins, d => d.length) ?? 1;

    xScale.domain([xMin, xMax]);
    yScale.domain([0, yMax]).nice();

    const innerChart = d3.select(".inner-chart");

    innerChart.selectAll("rect")
        .data(updatedBins)
        .join("rect")
        .attr("class", "bar")
        .transition()
        .duration(600)
        .attr("x", d => xScale(d.x0) + 1)
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", barStrokeColor);

    innerChart.select(".x-axis")
        .transition()
        .duration(600)
        .call(d3.axisBottom(xScale));

    innerChart.select(".y-axis")
        .transition()
        .duration(600)
        .call(d3.axisLeft(yScale));
};