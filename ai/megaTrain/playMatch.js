import initialState from '../../src/js/helpers/createBoard/createBoard'
import addChequer from '../../src/js/helpers/addChequer/addChequer'
import { checkForAWin } from '../../src/js/helpers/checkWin/checkWin'
import sanitizeBoard from '../../src/js/helpers/sanitizeBoard/sanitizeBoard'

const PLAYER_1_TOKEN = 'y'
const PLAYER_2_TOKEN = 'r'

export default (player1, player2, games) => {
  const playData = {
    trainingData: {
      boards: [],
      winners: [],
    },
    results: {
      player1: 0,
      player2: 0,
      draws: 0,
    },
  }
  let initialPlayer = PLAYER_2_TOKEN
  for (let game = 0; game < games; game++) {
    initialPlayer = initialPlayer === PLAYER_1_TOKEN ? PLAYER_2_TOKEN : PLAYER_1_TOKEN
    let gameState = initialState()
    let playerToken = initialPlayer
    let playing = true
    while (playing) {
      const column = playerToken === PLAYER_1_TOKEN
        ? player1.getMove(gameState, playerToken)
        : player2.getMove(gameState, playerToken)

      const newGamestate = addChequer(gameState, column, playerToken)
      const didWin = checkForAWin(newGamestate)
      if (didWin || didWin === false) {
        // console.log(newGamestate)
        // TODO handle draw
        if (didWin) {
          playData.trainingData.boards.push(sanitizeBoard(playerToken, gameState))
          const winner = [0, 0, 0, 0, 0, 0, 0]
          winner[column] = 1
          playData.trainingData.winners.push(winner)
        }
        if (didWin === PLAYER_1_TOKEN) {
          playData.results.player1++
        } else if (didWin === PLAYER_2_TOKEN) {
          playData.results.player2++
        } else {
          playData.results.draws++
        }
        playing = false
      } else {
        gameState = newGamestate
        playerToken = playerToken === PLAYER_1_TOKEN ? PLAYER_2_TOKEN : PLAYER_1_TOKEN
      }
    }
  }
  return playData
}
