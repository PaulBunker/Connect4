import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import fs from 'fs'

const trainingData = JSON.parse(fs.readFileSync('data.json'))

// const model = tf.sequential()

// const input = tf.layers.dense({
//   units: 42,
//   inputShape: [7, 6],
//   activation: 'hardSigmoid',
// })

// const output = tf.layers.dense({
//   units: 7,
//   activation: 'sigmoid',
// })

// model.add(input)

// model.add(tf.layers.flatten())
// model.add(output)

const optimizer = tf.train.adam(0.01)

// model.compile({
//   optimizer,
//   loss: 'categoricalCrossentropy',
//   metrics: ['accuracy'],
// })

const trainingBoards = tf.tensor3d(trainingData.boards)
const trainingWinners = tf.tensor2d(trainingData.winners)

const config = {
  shuffle: true,
  epochs: 3,
}

tf.loadLayersModel(`file://${path.join(__dirname, 'models', '2', 'model.json')}`).then((model) => {
  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  })
  model.fit(trainingBoards, trainingWinners, config).then((info) => {
    console.log('Final accuracy', info.history.acc)
    model.save(`file://${path.join(__dirname, 'models', '3')}`).then(() => {
      console.log('Successfully saved the artifacts.')
    })
  })
})

