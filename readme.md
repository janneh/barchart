barchart
=====================

Playing around with d3 barcharts

### Usage

To create and update one

```js
const chart = barchart({
  target: '.chart',
  data: randomData()
})

chart.setData(randomData())
```

To run the example

```bash
npm install
npm start
```

Open `http://localhost:3000`
