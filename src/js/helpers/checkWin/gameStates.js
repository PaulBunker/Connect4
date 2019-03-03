/* eslint array-bracket-spacing: 0  no-multi-spaces:0 */
const numberedBoard = [
  [ 1,  2,  3,  4,  5,  6, 7],
  [ 8,  9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42],
  [44, 45, 46, 47, 48, 49, 50],
]

const nullBoard = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]

const rowWinner = [
  [null, null, null, null, null, null, null],
  [null, null, 'r',  null, null, null, null],
  [null, null, 'r',  null, null, null, null],
  [null, null, 'r',  null, null, null, null],
  [null, null, 'r',  null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]

const columnWinner = [
  [null, 'y',  'y',  'y',  'y',  null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]

const gameStates = {
  numberedBoard,
  nullBoard,
  columnWinner,
  rowWinner,
}

export default gameStates
