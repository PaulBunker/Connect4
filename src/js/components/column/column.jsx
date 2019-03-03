import React from 'react'
import styles from './column.scss'

const Column = ({ column, onColumnClick }) => (
  <div onClick={onColumnClick}>
    {column.map((square, index) => <div key={index} className={styles.square}>{square || 'o' }</div>)}
  </div>
)

export default Column
