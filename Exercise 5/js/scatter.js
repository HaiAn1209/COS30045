const scatterMargin = { top: 20, right: 20, bottom: 55, left: 70 };
const scatterWidth = 600;
const scatterHeight = 420;

const scatterSvg = d3
  .select("#scatter-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${scatterWidth} ${scatterHeight}`);

const scatterInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
const scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;

const scatterG = scatterSvg
  .append("g")
  .attr("transform", `translate(${scatterMargin.left},${scatterMargin.top})`);

d3.csv("data/Ex5_TV_energy.csv", d => ({
  brand: d.brand,
  screenTech: d.screen_tech,
  screenSize: +d.screensize,
  energy: +d.energy_consumpt,
  star: +d.star2
})).then(data => {
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.star))
    .nice()
    .range([0, scatterInnerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .nice()
    .range([scatterInnerHeight, 0]);

  scatterG.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${scatterInnerHeight})`)
    .call(d3.axisBottom(xScale));

  scatterG.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale));

  scatterG.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.star))
    .attr("cy", d => yScale(d.energy))
    .attr("r", 4)
    .attr("fill", "steelblue")
    .attr("opacity", 0.65);

  scatterSvg.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight - 10)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  scatterSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -scatterHeight / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");
});