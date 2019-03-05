import minimax from './minimax'

const board1 = [
  ['y', 'y', 'y', null],
  ['r', 'r', 'r', null],
]

describe('test minimax algorithm', () => {
  it('picks the first column to win the game', () => {
    expect(minimax(board1, 1, 'y')).toBe(1)
  })
})
