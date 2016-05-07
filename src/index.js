import d3 from 'd3'

const defaults = {
  frame: {
    width: 960,
    height: 500
  },

  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }
}

/**
 * Exports barchart factory
 */

export default function barchart(options) {
  let { barWidth, borderRadius } = Object.assign(defaults, options)
  const { target, frame, margin, data } = Object.assign(defaults, options)
  const { width, height } = chartSize(frame, margin)
  const barPadding = 0.1 * width

  // Create the chart
  const chart = d3.select(target).append('svg')
      .attr('width', frame.width)
      .attr('height', frame.height)
    .append('g')
      .attr('transform', `translate(${margin.left} ${margin.top})`)

  chart.append('clipPath')
      .attr('id', 'graph-area-clip')
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)

  const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)

  const y = d3.scale.linear()
    .range([height, 0])

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')

  const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10, '%')

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0 ${height})`)

  chart.append('g')
    .attr('class', 'y axis')

  /**
   * Chart size using d3 margin convention
   * https://bl.ocks.org/mbostock/3019563
   */

  function chartSize(frame, margin) {
    const width = frame.width - margin.left - margin.right
    const height = frame.height - margin.top - margin.bottom

    return { width, height }
  }

  function renderAxes(data) {
    // Update domain
    x.domain(data.map((d) => d.letter))
    y.domain([0, d3.max(data, (d) => d.frequency)])

    // Update axes
    chart.select('.x.axis')
      .transition().ease('linear')
      .call(xAxis)

    chart.select('.y.axis')
      .transition().ease('linear')
      .call(yAxis)
  }

  function renderBars(data) {
    borderRadius = (x.rangeBand() - barPadding) / 2
    barWidth = x.rangeBand() - barPadding

    const bars = chart.selectAll('.bar')
      .data(data, (d) => d.letter)

    bars.enter().append('rect')
      .attr('class', 'bar')
      .call(onEnter)
      .transition()
      .call(slideIn)

    bars.exit().remove()
  }

  function onEnter() {
    this
      .attr('clip-path', 'url(#graph-area-clip)')
      .attr('x', function(d) { return x(d.letter) + barPadding / 2 + width })
      .attr('y', function(d) { return y(d.frequency) + borderRadius })
      .attr('width', barWidth)
      .attr('height', function(d) { return height - y(d.frequency) })
      .attr('rx', borderRadius)
      .attr('ry', borderRadius)
  }

  function growUp() {
    this
      .duration(600)
      .attr('y', function(d) { return y(d.frequency) + borderRadius })
      .attr('height', function(d) { return height - y(d.frequency) })
      .style('fill-opacity', 1)
  }

  function slideIn() {
    this
      .duration(800)
      .attr('x', function(d) { return x(d.letter) + barPadding / 2 })
  }

  function setData(data) {
    renderAxes(data)
    renderBars(data)
  }

  // Render if data is passeed as an option on init
  if (data) setData(data)

  // return public interface
  return { setData }
}
