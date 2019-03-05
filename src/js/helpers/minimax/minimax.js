import { checkForAWin } from '../checkWin/checkWin'

const minItem = data => data.reduce((a, b) => a.value <= b.value ? a : b, {})
const maxItem = data => data.reduce((a, b) => a.value >= b.value ? a : b, {})

const minimax = (board, depth, player) => {
  const didWin = checkForAWin(board)
  console.log(didWin)

  if (didWin === null) {

  }
  //   const values = []

  //   for (let columnNumber = 0; columnNumber < board.length; columnNumber++) {
  //     const column = board[columnNumber]
  //     if (column[column.length - 1] === null) {
  //       const newGrid = addChequer(board, columnNumber, player)
  //       const value = minimax(newGrid, depth + 1, (player === RED) ? YELLOW : RED)
  //       values.push({
  //         column,
  //         value,
  //       })
  //     }
  //   }

  // if (player === RED) {
  //   const { column, value } = maxItem(values)
  //   if (depth === 0) {
  //     return column
  //   }
  //   return value
  // }
  // const { column, value } = minItem(values)
  // if (depth === 0) {
  //   return column
  // }
  // return value
  // } if (didWin === YELLOW) {
  //   return depth - 9999
  // } if (didWin === RED) {
  //   return 9999 - depth
  // }
  // return 0
  // return 1
}

export default minimax
