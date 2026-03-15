const barMargin = { top: 20, right: 20, bottom: 60, left: 90 };
const barWidth = 620;
const barHeight = 420;

const barSvg = d3
  .select("#bar-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${barWidth} ${barHeight}`);

const barInnerWidth = barWidth - barMargin.left - barMargin.right;
const barInnerHeight = barHeight - barMargin.top - barMargin.bottom;

const barG = barSvg
  .append("g")
  .attr("transform", `translate(${barMargin.left}, ${barMargin.top})`);

d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => ({
  screenTech: d.Screen_Tech,
  energy: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.screenTech))
    .range([0, barInnerWidth])
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .nice()
    .range([barInnerHeight, 0]);

  barG.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${barInnerHeight})`)
    .call(d3.axisBottom(xScale));

  barG.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale));

  barG.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => xScale(d.screenTech))
    .attr("y", d => yScale(d.energy))
    .attr("width", xScale.bandwidth())
    .attr("height", d => barInnerHeight - yScale(d.energy))
    .attr("fill", "seagreen");

  barSvg.append("text")
    .attr("x", barWidth / 2)
    .attr("y", barHeight - 10)
    .attr("text-anchor", "middle")
    .text("Screen Technology");

  barSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -barHeight / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Average Energy Consumption (kWh/year)");
});