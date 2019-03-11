import fs from 'fs'
import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import initialState from '../src/js/helpers/createBoard/createBoard'
import addChequer from '../src/js/helpers/addChequer/addChequer'
import minimax from '../src/js/helpers/minimax/minimax'
import { checkForAWin } from '../src/js/helpers/checkWin/checkWin'

const getMove = (player, gameState, model) => {
  if (player === 'y') {
    const preds = model.predict(tf.tensor([initialState()])).dataSync()
    const list = []
    preds.forEach((pred, i) => {
      list.push({
        column: i,
        pred,
      })
    })
    const orderedPredictions = [...list].sort((a, b) => {
      if (a.pred < b.pred) { return 1 }
      if (a.pred > b.pred) { return -1 }
      return 0
    })
    for (let index = 0; index < orderedPredictions.length; index++) {
      const prediction = orderedPredictions[index]
      if (gameState[prediction.column].indexOf(null) !== -1) {
        return prediction.column
      }
    }
  }
  return minimax(gameState, 0, player, -10000, 10000, 3)
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
        console.log(newGamestate)
        playing = false
      } else {
        gameState = newGamestate
        player = player === 'y' ? 'r' : 'y'
      }
    }
  }
  console.log(games)
}

tf.loadLayersModel(`file://${path.join(__dirname, 'models', 'model.json')}`).then((model) => {
  battle(model)
})
