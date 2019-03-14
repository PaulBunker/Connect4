import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import playMatch from './playMatch'
import train from './train'
import GetPlayer from './GetPlayer'

// get model

// initial train

// get player

// loop through n games against chosen opponent
const playMatches = async (player1, player2, label, matches = 5, games = 10000) => {
  const trainingPlayer = player1
  const results = {}
  for (let index = 0; index < matches; index++) {
    const { results, trainingData } = playMatch(player1, player2, games)
    console.log(results)
    results[index] = results
    if (trainingPlayer.model) {
      trainingPlayer.model = await train(trainingPlayer.model, trainingData)
    }
  }
  // save(trainingPlayer, label)
  // logResults(results)
}

const start = async () => {
  const model1 = await tf.loadLayersModel(`file://${path.join(__dirname, '..', 'models', '1', 'model.json')}`)
  const model2 = await tf.loadLayersModel(`file://${path.join(__dirname, '..', 'models', '3', 'model.json')}`)
  const player1 = new GetPlayer(model1)
  const player2 = new GetPlayer(model2)
  playMatches(player1, player2, null)
}
start()
// tf.loadLayersModel(`file://${path.join(__dirname, '..', 'models', '1', 'model.json')}`).then((model) => {
//   const player1 = new GetPlayer(model)
//   const player2 = new GetPlayer(model)
//   playMatches(player1, player2, null)
// })

// save the model

// write the results to a file
