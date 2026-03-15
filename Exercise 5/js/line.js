const lineMargin = { top: 20, right: 20, bottom: 55, left: 90 };
const lineWidth = 1000;
const lineHeight = 430;

const lineSvg = d3
  .select("#line-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${lineWidth} ${lineHeight}`);

const lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
const lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;

const lineG = lineSvg
  .append("g")
  .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => ({
  year: +d.Year,
  averagePrice: +d["Average Price (notTas-Snowy)"]
})).then(data => {
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, lineInnerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .nice()
    .range([lineInnerHeight, 0]);

  lineG.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${lineInnerHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

  lineG.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale));

  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  lineG.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "tomato")
    .attr("stroke-width", 2.5)
    .attr("d", line);

  lineG.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("r", 3)
    .attr("fill", "tomato");

  lineSvg.append("text")
    .attr("x", lineWidth / 2)
    .attr("y", lineHeight - 10)
    .attr("text-anchor", "middle")
    .text("Year");

  lineSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -lineHeight / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Average Spot Price ($ per megawatt hour)");
});