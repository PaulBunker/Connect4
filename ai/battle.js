import fs from 'fs'
import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import initialState from '../src/js/helpers/createBoard/createBoard'
import addChequer from '../src/js/helpers/addChequer/addChequer'
import minimax from '../src/js/helpers/minimax/minimax'
import { checkForAWin } from '../src/js/helpers/checkWin/checkWin'
import getModelPrediction from '../src/js/helpers/getModelPrediction/getModelPrediction'

const getMove = (player, gameState, model) => {
  if (player === 'y') {
    return getModelPrediction(model, player, gameState)
  }
  return minimax(gameState, 0, player, -10000, 10000, 2)
}

const battle = (model) => {
  const games = {
    modelWins: 0,
    minimaxWins: 0,
    draws: 0,
  }
  let initialPlayer = 'y'

  for (let game = 0; game < 10000; game++) {
    let playing = true
    initialPlayer = initialPlayer === 'y' ? 'r' : 'y'
    let player = initialPlayer
    let gameState = initialState()
    while (playing) {
      const column = getMove(player, gameState, model)
      const newGamestate = addChequer(gameState, column, player)
      const didWin = checkForAWin(newGamestate)
      if (didWin || didWin === false) {
        if (didWin === 'y') {
          games.modelWins++
        } else if (didWin === 'r') {
          games.minimaxWins++
        } else {
          games.draws++
        }
        playing = false
      } else {
        gameState = newGamestate
        player = player === 'y' ? 'r' : 'y'
      }
    }
  }
  console.log(games)
}

tf.loadLayersModel(`file://${path.join(__dirname, 'models', '3', 'model.json')}`).then((model) => {
  battle(model)
})
