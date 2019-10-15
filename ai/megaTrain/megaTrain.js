// import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import playMatch from './playMatch'
import train from './train'
import GetPlayer from './GetPlayer'
// import PolicyAgent from '../PolicyAgent'
import MonteCarlo from '../../src/js/helpers/monteCarlo/monteCarlo'

// get model

// initial train

// get player

// loop through n games against chosen opponent
const playMatches = async (player1, player2, label, matches = 1, games = 10) => {
  const results = {}
  for (let index = 0; index < matches; index++) {
    const { results } = playMatch(player1, player2, games)
    console.log(results)
  }
}

const player1 = new MonteCarlo()
const player2 = new GetPlayer()

const start = async () => {
  playMatches(player1, player2, null)
}
start()

// player1.NN.model.save(`file://${path.join(__dirname, '../models', '8')}`).then(() => {
//   console.log('Successfully saved the artifacts.')
// })
// tf.loadLayersModel(`file://${path.join(__dirname, '..', 'models', '1', 'model.json')}`).then((model) => {
//   const player1 = new GetPlayer(model)
//   const player2 = new GetPlayer(model)
//   playMatches(player1, player2, null)
// })

// save the model

// write the results to a file
