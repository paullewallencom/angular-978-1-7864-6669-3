'use strict';

var w = window;
var doc = document;
var el = doc.documentElement;
var body = doc.getElementsByTagName('body')[0];
var width = w.innerWidth || el.clientWidth || body.clientWidth;
var height = w.innerHeight|| el.clientHeight|| body.clientHeight;

var projection = d3.geoAlbersUsa();
var path = d3.geoPath()
  .projection(projection);

var color = d3.scaleSequential(d3.interpolateReds);

var svg = d3.select('body')
  .append('svg')
  .attrs({
    width: width,
    height: height
  });

d3.json('data/final.json', function(error, data) {
  if (error) {
    return console.error(error);
  }

  var counties = topojson.feature(data, data.objects.counties).features;
  var meanDensity = d3.mean(counties, function(d) {
    return d.properties.density;
  });

  var scaleDensity = d3.scaleQuantize()
    .domain([0, meanDensity])
    .range([0, 0.2, 0.4, 0.6, 0.8, 1]);

  svg.selectAll('.county')
    .data(counties)
    .enter()
    .append('path')
    .attrs({
      'd': path,
      'class': 'county',
      'stroke': 'grey',
      'stroke-width': 0.3,
      'fill': function(d) {
        var countyDensity = d.properties.density;
        var density = countyDensity ? countyDensity : 0;
        return color(scaleDensity(density))
      }
    });

  var legendContainerSettings = {
    x: width * 0.03,
    y: height * 0.82,
    width: 350,
    height: 90,
    roundX: 10,
    roundY: 10
  }

  var legendContainer = svg.append('rect')
    .attrs({
      'x': legendContainerSettings.x,
      'y': legendContainerSettings.y,
      'rx': legendContainerSettings.roundX,
      'ry': legendContainerSettings.roundY,
      'width': legendContainerSettings.width,
      'height': legendContainerSettings.height,
      'id': 'legend-container'
    });

  var legendBoxSettings = {
    width: 50,
    height: 15,
    y: legendContainerSettings.y + 55
  };

  var legendData = [0, 0.2, 0.4, 0.6, 0.8, 1];

  var legend = svg.selectAll('g.legend')
    .data(legendData)
    .enter().append('g')
    .attr('class', 'legend');

  legend.append('rect')
    .attrs({
      'x': function(d, i) {
        return legendContainerSettings.x + legendBoxSettings.width * i + 20;
      },
      'y': legendBoxSettings.y,
      'width': legendBoxSettings.width,
      'height': legendBoxSettings.height
    })
    .styles({
      'fill': function(d, i) {
        return color(d);
      },
      'opacity': 1
    });

  var formatDecimal = d3.format('.1f');

  function getPopDensity(rangeValue) {
    return formatDecimal(scaleDensity.invertExtent(rangeValue)[1]);
  }

  var legendLabels = [
    '<' + getPopDensity(0),
    '>' + getPopDensity(0),
    '>' + getPopDensity(0.2),
    '>' + getPopDensity(0.4),
    '>' + getPopDensity(0.6),
    '>' + getPopDensity(0.8)
  ];

  legend.append('text')
    .attrs({
      'x': function(d, i) {
        return legendContainerSettings.x + legendBoxSettings.width * i + 30;
      },
      'y': legendContainerSettings.y + 52
    })
    .style('font-size', 12)
    .text(function(d, i) {
      return legendLabels[i];
    });

  legend.append('text')
    .attrs({
      'x': legendContainerSettings.x + 13,
      'y': legendContainerSettings.y + 29
    })
    .styles({
      'font-size': 16,
      'font-weight': 'bold'
    })
    .text('Population Density by County (pop/square mile)');
});
