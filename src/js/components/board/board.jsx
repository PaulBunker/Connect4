import React, { Component } from 'react'
import classNames from 'classnames'
import Column from '../column/column'
import styles from './board.scss'
import addChequer from '../../helpers/addChequer/addChequer'
import { checkForAWin } from '../../helpers/checkWin/checkWin'
import Worker from '../../worker/minimax.worker'

const RED = 'r'
const YELLOW = 'y'

export const create2DArray = (cols = 7, rows = 6) => [...Array(cols)].map(() => Array(rows).fill(null))

class Board extends Component {
  constructor() {
    super()
    this.state = {
      board: create2DArray(),
      player: YELLOW,
    }
  }

  componentDidMount() {
    this.w = new Worker()
    this.w.addEventListener('message', (event) => {
      const column = event.data
      this.computerMove(column)
    })
  }

  onColumnClick = (columnNumber) => {
    const { board, player } = this.state
    const newBoard = addChequer(board, columnNumber, player)
    const didWin = checkForAWin(newBoard)
    this.setState({
      board: newBoard,
      player: player === RED ? YELLOW : RED,
      winner: didWin,
    }, () => this.w.postMessage(this.state))
  };

  computerMove(column) {
    const {
      board, player, winner,
    } = this.state

    if (player === RED && !winner) {
      const newBoard = addChequer(board, column, player)
      const didWin = checkForAWin(newBoard)
      this.setState({
        board: newBoard,
        player: player === RED ? YELLOW : RED,
        winner: didWin,
      })
    }
  }

  render() {
    const { board, winner, player } = this.state
    return (
      <div className={styles.container}>
        {(winner || player === RED) && (
          <div className={classNames(styles.overlay, { [styles.pulse]: !winner })}>
            <p className={styles[winner]}>{winner ? `${winner === RED ? 'Red' : 'Yellow'} Wins` : 'Thinking...' }</p>
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
