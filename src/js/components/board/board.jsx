import React, { Component } from 'react'
import Column from '../column/column.jsx'
import styles from './board.scss'
import addChequer from '../../helpers/addChequer/addChequer'
import { checkForAWin } from '../../helpers/checkWin/checkWin'

const RED = 'r'
const YELLOW = 'y'

export const create2DArray = (cols = 7, rows = 7) => [...Array(cols)].map(() => Array(rows).fill(null))

const minItem = data => data.reduce((a, b) => a.value <= b.value ? a : b, {})
const maxItem = data => data.reduce((a, b) => a.value >= b.value ? a : b, {})

const minimax = (board, depth, player) => {
  const didWin = checkForAWin(board)

  if (didWin === null) {
    const values = []

    for (let columnNumber = 0; columnNumber < board.length; columnNumber++) {
      const column = board[columnNumber]
      if (column[column.length - 1] === null) {
        const newGrid = addChequer(board, columnNumber, player)
        const value = minimax(newGrid, depth + 1, (player === RED) ? YELLOW : RED)
        values.push({
          column,
          value,
        })
      }
    }

    if (player === RED) {
      const { column, value } = maxItem(values)
      if (depth === 0) {
        return column
      }
      return value
    }
    const { column, value } = minItem(values)
    if (depth === 0) {
      return column
    }
    return value
  } if (didWin === YELLOW) {
    return depth - 9999
  } if (didWin === RED) {
    return 9999 - depth
  }
  return 0
}

class Board extends Component {
  constructor() {
    super()
    this.i = 2
    this.state = {
      board: create2DArray(),
      player: RED,
    }
  }

  onColumnClick = (columnNumber) => {
    const { board, player } = this.state
    const newBoard = addChequer(board, columnNumber, player)
    const didWin = checkForAWin(newBoard)
    this.setState({
      board: newBoard,
      player: player === RED ? YELLOW : RED,
      winner: didWin,
    }, this.computerMove)
  };

  computerMove() {
    const { board, player, i } = this.state
    this.i++
    if (player === YELLOW) {
      const newBoard = addChequer(board, this.i, player)
      const didWin = checkForAWin(newBoard)
      this.setState({
        board: newBoard,
        player: player === RED ? YELLOW : RED,
        winner: didWin,
      })
    }
  }

  render() {
    const { board, winner } = this.state
    return (
      <div className={styles.container}>
        {winner
        && (
        <div className={styles.winnerOverlay}>
          <p>{`Winner ${winner}`}</p>
        </div>
        )
      }
        <div className={styles.board}>
          {board.map((column, index) => (
            <Column
              key={index}
              column={column}
              onColumnClick={() => this.onColumnClick(index)}
            />
          ))}
        </div>
      </div>

    )
  }
}

export default Board
