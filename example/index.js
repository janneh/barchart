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

const randomTimeData = () => {
  return [
    {
      x: new Date('2016-1-1'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-2'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-3'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-4'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-5'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-6'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-7'),
      y: (Math.random() * .1)
    },
    {
      x: new Date('2016-1-8'),
      y: (Math.random() * .1)
    }
  ]
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
