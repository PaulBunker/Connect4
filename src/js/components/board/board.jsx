import React, { Component } from 'react'
import Column from '../column/column.jsx'

const RED = 'r'
const YELLOW = 'y'

const create2DArray = (cols = 5, rows = 5) => [...Array(cols)].map(() => Array(rows).fill(null))

const addChecker = (gameState, column, colour) => {
  const newGameState = [...gameState]
  let activeColumn = newGameState[column]
  let done
  activeColumn = activeColumn.map(position => {
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
const state1 = addChecker(initialGameState, 0, RED)



class Board extends Component {
render() {
  return (
    <div className="board">
      hello
    </div>
  )
}
  
  
}
  

export default Board;