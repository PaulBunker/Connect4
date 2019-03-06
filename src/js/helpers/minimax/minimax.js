import { checkForAWin } from '../checkWin/checkWin'
import addChequer from '../addChequer/addChequer'

const RED = 'r'
const YELLOW = 'y'

const minItem = data => data.reduce((a, b) => a.value <= b.value ? a : b, {})
const maxItem = data => data.reduce((a, b) => a.value >= b.value ? a : b, {})

const minimax = (board, depth, player) => {
  const didWin = checkForAWin(board)

  if (didWin === null && depth < 8) {
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
      const { columnNumber, value } = maxItem(values)
      if (depth === 0) {
        return columnNumber
      }
      return value
    }
    const { columnNumber, value } = minItem(values)
    if (depth === 0) {
      return columnNumber
    }
    return value
  } if (didWin === YELLOW) {
    return depth - 9999
  } if (didWin === RED) {
    return 9999 - depth
  }
  return 3
}

export default minimax
