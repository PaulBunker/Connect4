import React, { Component } from 'react'
import Column from '../column/column.jsx'

const RED = 'r'
const YELLOW = 'y'

export const create2DArray = (cols = 7, rows = 7) => [...Array(cols)].map(() => Array(rows).fill(null))

const addChequer = (gameState, column, colour) => {
  const newGameState = [...gameState]
  let activeColumn = newGameState[column]
  let done
  activeColumn = activeColumn.map((position) => {
    if (!position && !done) {
      done = true
      return colour
    }
    return position
  })
  newGameState[column] = activeColumn
  return newGameState
}

const initialGameState = create2DArray()

class Board extends Component {
  render() {
    return (
      <div className="board">
      hello
      </div>
    )
  }
}

export default Board
