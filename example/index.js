import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import barchart from '../src/index'

let selectionNumber = 0

const randomData = _ => {
  let data = []

  'ABCDEFGHIJKLMNOPQRSTUVWX'.split('').forEach(letter => {
    data.push({ x: letter, y: (Math.random() * .1) })
  })

  const startIndex = selectionNumber % 3 * 8
  data = data.slice(startIndex, startIndex + 8)
  selectionNumber++

  return data
}

class App extends Component {
  componentDidMount() {
    this.chart = barchart({
      target: '.chart',
      data: randomData()
    })
  }

  updateData = _ => {
    this.chart.setData(randomData())
  }

  render() {
    return (
      <div>
        <div id='actions'>
          <button onClick={this.updateData}>Animate</button>
        </div>

        <div className='chart'></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
