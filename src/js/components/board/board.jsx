import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import Column from '../column/column'
import styles from './board.scss'
import addChequer from '../../helpers/addChequer/addChequer'
import { checkForAWin } from '../../helpers/checkWin/checkWin'
// import Worker from '../../worker/minimax.worker'
import Worker from '../../worker/monteCarlo.worker'
import crateBoard from '../../helpers/createBoard/createBoard'

const RED = 'r'
const YELLOW = 'y'

class Board extends Component {
  constructor() {
    super()
    this.state = {
      board: crateBoard(),
      player: YELLOW,
      difficulty: 7,
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
    if (!newBoard) {
      return null
    }
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
    const {
      board, winner, player, difficulty,
    } = this.state
    return (
      <Fragment>
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
        {/* <label className={styles.difficulty} htmlFor="difficulty">
          {`Difficulty - ${difficulty}`}
        </label>
        <input
          id="difficulty"
          type="range"
          min="0"
          max="10"
          value={difficulty}
          onChange={(e) => { this.setState({ difficulty: e.target.value }) }}
        /> */}

      </Fragment>
    )
  }
}

export default Board
