import * as tf from '@tensorflow/tfjs-node'

export default async (model, trainingData) => {
  const trainingBoards = tf.tensor3d(trainingData.boards)
  const trainingWinners = tf.tensor2d(trainingData.winners)

  const optimizer = tf.train.adam(0.01)
  const config = {
    shuffle: true,
    epochs: 3,
  }

  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  })

  const history = await model.fit(trainingBoards, trainingWinners, config)
  // console.log(history)
  return model
}
