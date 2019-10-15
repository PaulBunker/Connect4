import initialState from '../../src/js/helpers/createBoard/createBoard'
import addChequer from '../../src/js/helpers/addChequer/addChequer'
import { checkForAWin } from '../../src/js/helpers/checkWin/checkWin'

const PLAYER_1_TOKEN = 'y'
const PLAYER_2_TOKEN = 'r'

export default (player1, player2, games) => {
  const playData = {
    results: {
      player1: 0,
      player2: 0,
      draws: 0,
    },
  }
  let initialPlayer = PLAYER_2_TOKEN
  for (let game = 0; game < games; game++) {
    player1.newGame()
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
        if (didWin === PLAYER_1_TOKEN) {
          playData.results.player1++
        } else if (didWin === PLAYER_2_TOKEN) {
          playData.results.player2++
        } else {
          playData.results.draws++
        }
        // player1.gameComplete(didWin)
        playing = false
      } else {
        gameState = newGamestate
        playerToken = playerToken === PLAYER_1_TOKEN ? PLAYER_2_TOKEN : PLAYER_1_TOKEN
      }
    }
  }
  return playData
}
