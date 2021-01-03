var salesData = [
  {
    "day": "Monday",
    "sales": 242,
    "bestSeller": "lemonade"
  },
  {
    "day": "Tuesday",
    "sales": 256,
    "bestSeller": "lemonade"
  },
  {
    "day": "Wednesday",
    "sales": 137,
    "bestSeller": "water"
  },
  {
    "day": "Thursday",
    "sales": 343,
    "bestSeller": "iced tea"
  },
  {
    "day": "Friday",
    "sales": 459,
    "bestSeller": "iced tea"
  },
  {
    "day": "Saturday",
    "sales": 578,
    "bestSeller": "lemonade"
  },
  {
    "day": "Sunday",
    "sales": 470,
    "bestSeller": "pink lemonade"
  }
]

d3.select('body')
  .selectAll('p')
  .data(salesData)
  .enter()
  .append('p')
  .text(function(d) {
    return d.day + '\'s best seller was ' + d.bestSeller + '. There were ' + d.sales + ' total sales!';
  });