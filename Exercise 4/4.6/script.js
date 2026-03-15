// create svg canvas
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 600")
  .style("border", "1px solid black");


// load csv data
d3.csv("data/tvScreenTechCount.csv", d => {
  return {
    screenTech: d.Screen_Tech,
    count: +d["Count(Brand)"]
  };
}).then(data => {

  console.log(data);
  console.log("Rows:", data.length);
  console.log("Max:", d3.max(data, d => d.count));
  console.log("Min:", d3.min(data, d => d.count));
  console.log("Extent:", d3.extent(data, d => d.count));

  data.sort((a, b) => b.count - a.count);

  console.log("Sorted data:", data);

  createBarChart(data);
});


// create bar chart
const createBarChart = data => {

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, 400]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.screenTech))
    .range([0, 500])
    .padding(0.2);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 50)
    .attr("y", d => yScale(d.screenTech))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");
};