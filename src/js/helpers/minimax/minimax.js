import { checkForAWin } from '../checkWin/checkWin'
import addChequer from '../addChequer/addChequer'

const RED = 'r'
const YELLOW = 'y'

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const minItem = data => data.reduce((a, b) => a.value <= b.value ? a : b, {})
const maxItem = data => data.reduce((a, b) => a.value >= b.value ? a : b, {})

const minimax = (board, depth, player) => {
  const didWin = checkForAWin(board)
  if (didWin === null && depth < 6) {
    const values = []

    for (let columnNumber = 0; columnNumber < board.length; columnNumber++) {
      const column = board[columnNumber]
      if (column[column.length - 1] === null) {
        const newGrid = addChequer(board, columnNumber, player)
        const value = minimax(newGrid, depth + 1, (player === RED) ? YELLOW : RED)
        values.push({
          columnNumber,
          value,
        })
      }
    }

    if (player === RED) {
      const { columnNumber, value } = maxItem(shuffle(values))
      if (depth === 0) {
        return columnNumber
      }
      return value
    }
    const { columnNumber, value } = minItem(shuffle(values))
    if (depth === 0) {
      return columnNumber
    }
    return value
  } if (didWin === YELLOW) {
    return depth - 9999
  } if (didWin === RED) {
    return 9999 - depth
  }
  return 0
}

export default minimax
