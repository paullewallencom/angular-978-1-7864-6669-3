var width = 400;
var height = 300;
var padding = 100;

var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('padding', padding);

d3.json('salesData.json', function(data) {
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 40)
    .attr('height', 200)
});