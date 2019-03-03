import {
  check4InARow, checkDecendingDiagonals, getDecendingDiagonals, getAscendingDiagonals, checkRows, checkColumns,
} from './checkWin'

import gameStates from './gameStates'

test('checks if there is 4 in a row and returns winner', () => {
  expect(check4InARow(['r', 'r', 'r', 'r'])).toBe('r')
  expect(check4InARow([null, null, null, null])).toBe(false)
  expect(check4InARow(['r', null, 'r', 'r', 'r'])).toBe(false)
})

describe('getAscendingDiagonals', () => {
  it('should get all the ascending diagonals in a 7 x 7 board excluding diagonals less than 4 in length', () => {
    const expectedResult = [
      [4, 12, 20, 28],
      [3, 11, 19, 27, 35],
      [2, 10, 18, 26, 34, 42],
      [1, 9, 17, 25, 33, 41, 50],
      [8, 16, 24, 32, 40, 49],
      [15, 23, 31, 39, 48],
      [22, 30, 38, 47],
    ]
    expect(getAscendingDiagonals(gameStates.numberedBoard)).toStrictEqual(expectedResult)
  })
})

describe('getDecendingDiagonals', () => {
  it('should get all the descending diagonals in a 7 x 7 board excluding diagonals less than 4 in length', () => {
    const expectedResult = [
      [22, 16, 10, 4],
      [29, 23, 17, 11, 5],
      [36, 30, 24, 18, 12, 6],
      [44, 37, 31, 25, 19, 13, 7],
      [45, 38, 32, 26, 20, 14],
      [46, 39, 33, 27, 21],
      [47, 40, 34, 28],
    ]
    expect(getDecendingDiagonals(gameStates.numberedBoard)).toStrictEqual(expectedResult)
  })
})

describe('checkRows', () => {
  it('should return false', () => {
    const result = checkRows(gameStates.nullBoard)
    expect(result).toBeFalsy()
  })

  it('should be "r"', () => {
    const result = checkRows(gameStates.rowWinner)
    expect(result).toBe('r')
  })
})

describe('checkColumns', () => {
  it('should return false', () => {
    const result = checkColumns(gameStates.nullBoard)
    expect(result).toBeFalsy()
  })

  it('should be "y"', () => {
    const result = checkColumns(gameStates.columnWinner)
    expect(result).toBe('y')
  })
})

