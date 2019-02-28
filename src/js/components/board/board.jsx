import React, { Component } from 'react'
import Column from '../column/column.jsx'

const RED = 'r'
const YELLOW = 'y'

export const create2DArray = (cols = 5, rows = 5) => [...Array(cols)].map(() => Array(rows).fill(null))

const addChequer = (gameState, column, colour) => {
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

export const check4InARow = (array) => {
  let winner = false
  let count = 0
  let potentialWinner
  array.forEach(item => {
    if(potentialWinner !== item || item === null) {
      count = 1
      potentialWinner = item
    } else {
      count += 1
    }
    if (count === 4) {
      winner = potentialWinner
    }
  })
  return winner
}

const checkColumns = (gameState) => {
  gameState.some(column => {
    winner = check4InARow(column)
    if(winner){
      return winner
    }
  });
}

const checkRows = (gameState) => {
  gamesState[0].some((_,rowNumber) => {
    winner = check4InARow(gamestate.map(column => column[rowNumber]))
    if(winner){
      return winner
    }
  })
}

const checkForAWin = (gameState) => {
  columnWinner = checkColumns(gameState) 
  rowWinner = checkRows(gameState)
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
  

export default Board;