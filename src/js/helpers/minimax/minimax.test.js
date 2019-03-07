import minimax from './minimax'

const board1 = [
  ['r', 'r', 'r', null],
  [null, null, null, null],
  ['y', 'y', 'y', null],
]

const board2 = [
  ['r', 'r', null, null],
  ['r', null, null, null],
  ['y', 'y', 'y', null],
]

describe('test minimax algorithm', () => {
  it('picks the first column to win the game', () => {
    expect(minimax(board1, 0, 'r')).toBe(0)
  })

  it('should pick the blocking move', () => {
    expect(minimax(board2, 0, 'r')).toBe(2)
  })
})

