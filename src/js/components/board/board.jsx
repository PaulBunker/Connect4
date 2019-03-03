import React, { Component } from 'react'
import Column from '../column/column.jsx'
import styles from './board.scss'
import addChequer from '../../helpers/addChequer/addChequer'

const RED = 'r'
const YELLOW = 'y'

export const create2DArray = (cols = 7, rows = 7) => [...Array(cols)].map(() => Array(rows).fill(null))

class Board extends Component {
  constructor() {
    super()
    this.state = {
      board: create2DArray(),
    }
  }

  onColumnClick = (e) => {
    const { board } = this.state
    console.log(e)
    // this.setState({
    //   board: addChequer(board, column, player)
    // })
  }

  render() {
    const { board } = this.state
    return (
      <div className={styles.board}>
        {board.map((column, index) => <Column key={index} column={column} onColumnClick={this.onColumnClick} />)}
      </div>
    )
  }
}

export default Board
