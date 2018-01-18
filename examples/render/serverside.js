const Canvas = require('flow-view').Canvas
const path = require('path')

const view = require(path.join(__dirname, 'sample-view.json'))

const canvas = new Canvas()

canvas.load(view)

const width = 600
const height = 400

canvas.toSVG({ width, height }, (err, outputSVG) => {
  if (err) throw err

  console.log(outputSVG)
})
