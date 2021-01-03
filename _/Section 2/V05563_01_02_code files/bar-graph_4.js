var width = 400;
var height = 300;
var padding = 100;
var barPadding = 5;

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
    .attr('x', function(d, i) {
      return i * (width / data.length);
    })
    .attr('y', function(d) {
      return height - d.sales;
    })
    .attr('width', width / data.length - barPadding)
    .attr('height', function(d) {
      return d.sales;
    });
});