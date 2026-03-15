const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");


d3.csv("data/tvScreenTechCount.csv", d => {

    return {
    screenTech: d.Screen_Tech,
    count: +d["Count(Brand)"]
  };

}).then(data => {

    // view dataset
    console.log(data);

    // number of rows
    console.log("Rows:", data.length);

    // max value
    console.log("Max:", d3.max(data, d => d.count));

    // min value
    console.log("Min:", d3.min(data, d => d.count));

    // min + max together
    console.log("Extent:", d3.extent(data, d => d.count));


    // sort data (descending)
    data.sort((a,b) => b.count - a.count);

    console.log("Sorted data:", data);


    // send data to chart function
    createBarChart(data);

});

const createBarChart = (data) => {

    console.log("Data received in chart function:", data);

};