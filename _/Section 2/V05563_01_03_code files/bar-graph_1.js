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
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d.sales;
    })])
    .range([0, height]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .on('click', function(d) {
      alert('Best seller: ' + d.bestSeller);
    })
    .attr('x', function(d, i) {
      return i * (width / data.length);
    })
    .attr('y', function(d) {
      return height - yScale(d.sales);
    })
    .attr('width', width / data.length - barPadding)
    .attr('height', function(d) {
      return yScale(d.sales);
    })
    .attr('fill', '#3399ff')
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
    .attr('fill', function(d) {
      var max = d3.max(data, function(d) {
        return d.sales;
      });
      var min = d3.min(data, function(d) {
        return d.sales;
      });

      if (d.sales === min) {
        return '#ff3300';
      } else if (d.sales === max) {
        return '#66ff66';
      } else {
        return '#3399ff';
      }
    });
});