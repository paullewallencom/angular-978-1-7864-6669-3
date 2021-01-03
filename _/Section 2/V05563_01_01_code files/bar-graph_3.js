d3.json('salesData.json', function(data) {
  d3.select('body')
    .selectAll('p')
    .data(data)
    .enter()
    .append('p')
    .text(function(d) {
      return d.day + '\'s best seller was ' + d.bestSeller + '. There were ' + d.sales + ' total sales!';
    });
});