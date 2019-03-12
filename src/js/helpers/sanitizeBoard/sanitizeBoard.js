export default (winner, board) => board.map(column => column.map((item) => {
  if (item) {
    return item === winner ? 1 : -1
  }
  return 0
}))
