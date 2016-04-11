import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import barchart from '../src/index'

const randomData = _ => {
  const data = []

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    if (Math.random() > .2) {
      data.push({ letter: letter, frequency: (Math.random() * .1) })
    }
  })

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
