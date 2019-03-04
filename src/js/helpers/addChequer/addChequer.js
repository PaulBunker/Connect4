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

export default addChequer
