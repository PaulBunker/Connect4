import React, { Component } from 'react'
import Column from '../column/column.jsx'
import styles from './board.scss'
import addChequer from '../../helpers/addChequer/addChequer'
import { checkForAWin } from '../../helpers/checkWin/checkWin'

const RED = 'r'
const YELLOW = 'y'

export const create2DArray = (cols = 7, rows = 7) => [...Array(cols)].map(() => Array(rows).fill(null))

const minimax = (board, depth, player) => {
  const didWin = checkForAWin(board)

  if (!didWin) {

  }

}

class Board extends Component {
  constructor() {
    super()
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
    })
  };

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
