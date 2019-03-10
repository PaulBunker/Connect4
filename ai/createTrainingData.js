import fs from 'fs'
import initialState from '../src/js/helpers/createBoard/createBoard'
import addChequer from '../src/js/helpers/addChequer/addChequer'
import minimax from '../src/js/helpers/minimax/minimax'
import { checkForAWin } from '../src/js/helpers/checkWin/checkWin'

const writeTheFile = (data) => {
  fs.writeFile('./data.json', data, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  })
}

const replaceValues = (winner, board) => board.map(column => column.map((item) => {
  if (item) {
    return item === winner ? 1 : -1
  }
  return 0
}))

const data = {
  boards: [],
  winners: [],
}
for (let game = 0; game < 500000; game++) {
  let gameState = initialState()
  let player = 'y'
  let playing = true
  while (playing) {
    const column = minimax(gameState, 0, player, -10000, 10000, 1)
    const newGamestate = addChequer(gameState, column, player)
    const didWin = checkForAWin(newGamestate)
    if (didWin || didWin === false) {
      // TODO handle draw
      if (didWin) {
        data.boards.push(replaceValues(player, gameState))
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
