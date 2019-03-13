import fs from 'fs'
import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import initialState from '../src/js/helpers/createBoard/createBoard'
import addChequer from '../src/js/helpers/addChequer/addChequer'
import minimax from '../src/js/helpers/minimax/minimax'
import { checkForAWin } from '../src/js/helpers/checkWin/checkWin'
import sanitizeBoard from '../src/js/helpers/sanitizeBoard/sanitizeBoard'
import getModelPrediction from '../src/js/helpers/getModelPrediction/getModelPrediction'

const getMove = (player, gameState, model) => {
  if (player === 'y') {
    return getModelPrediction(model, player, gameState)
  }
  return minimax(gameState, 0, player, -10000, 10000, 2)
}

const writeTheFile = (data) => {
  fs.writeFile('./data.json', data, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
    return false
  })
}

const playGames = (model) => {
  const data = {
    boards: [],
    winners: [],
  }
  for (let game = 0; game < 50000; game++) {
    let gameState = initialState()
    let player = 'y'
    let playing = true
    while (playing) {
      const column = getMove(player, gameState, model)
      const newGamestate = addChequer(gameState, column, player)
      const didWin = checkForAWin(newGamestate)
      if (didWin || didWin === false) {
        // TODO handle draw
        if (didWin) {
          data.boards.push(sanitizeBoard(player, gameState))
          const winner = [0, 0, 0, 0, 0, 0, 0]
          winner[column] = 1
          data.winners.push(winner)
        }
        playing = false
      } else {
        gameState = newGamestate
        player = player === 'y' ? 'r' : 'y'
      }
    }
  }

  writeTheFile(JSON.stringify(data))
}

tf.loadLayersModel(`file://${path.join(__dirname, 'models', '7', 'model.json')}`).then((model) => {
  playGames(model)
})
