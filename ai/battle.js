import fs from 'fs'
import * as tf from '@tensorflow/tfjs-node'
import path from 'path'
import initialState from '../src/js/helpers/createBoard/createBoard'
import addChequer from '../src/js/helpers/addChequer/addChequer'
import minimax from '../src/js/helpers/minimax/minimax'
import { checkForAWin } from '../src/js/helpers/checkWin/checkWin'

const battle = (model) => {
  const games = {
    modelWins: 0,
    minimaxWins: 0,
    drawWins: 0,
  }
  let initialPlayer = 'y'
  for (let game = 0; game < 1; game++) {
    let playing = true
    initialPlayer = initialPlayer === 'y' ? 'r' : 'y'
    const player = initialPlayer
    const gameState = initialState()
    while (playing) {
      const column = model.predict(tf.tensor([gameState])).argMax([-1]).dataSync()[0]
      console.log(column)
      playing = false
    }
  }
}

tf.loadLayersModel(`file://${path.join(__dirname, 'models', 'model.json')}`).then((model) => {
  battle(model)
})
