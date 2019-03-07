import React from 'react'
import classNames from 'classnames'
import styles from './column.scss'

const colourClass = (chequer) => {
  switch (chequer) {
    case 'r':
      return styles.red
    case 'y':
      return styles.yellow
    default:
      return null
  }
}

const Column = ({ column, onColumnClick }) => (
  <div
    className={styles.column}
    onClick={onColumnClick}
  >
    {column.map((chequer, index) => (
      <div
        key={index}
        className={classNames(styles.square, colourClass(chequer))}
      />
    ))}
  </div>
)

export default Column
