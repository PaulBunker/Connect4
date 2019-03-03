export const check4InARow = (array) => {
  let winner = false
  let count = 0
  let potentialWinner
  array.forEach((item) => {
    if (potentialWinner !== item || item === null) {
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

export const checkColumns = (gameState) => {
  let winner
  gameState.forEach((column) => {
    const didWin = check4InARow(column)
    if (didWin) {
      winner = didWin
    }
  })
  return winner
}

export const checkRows = (gameState) => {
  let winner
  gameState[0].forEach((_, rowNumber) => {
    const didWin = check4InARow(gameState.map(column => column[rowNumber]))
    if (didWin) {
      winner = didWin
    }
  })
  return winner
}

export const getDecendingDiagonals = (gameState) => {
  const diagonals = []
  for (let index = 3; index < gameState.length; index++) {
    const diagonal = []
    let upOne = 0
    for (let number = index; number >= 0; number--) {
      diagonal.push(gameState[number][upOne])
      upOne++
    }
    diagonals.push(diagonal)
  }
  for (let index = 1; index < gameState[0].length - 3; index++) {
    const diagonal = []
    const upOne = index
    for (let index = gameState.length - 1; index > 0; index--) {
      diagonal.push(gameState[index][upOne])
      upOne++
      if (upOne > gameState[0].length - 1) break
    }
    diagonals.push(diagonal)
  }
  return diagonals
}

export const getAscendingDiagonals = (gameState) => {
  const diagonals = []
  for (let index = gameState[0].length - 4; index >= 0; index--) {
    const diagonal = []
    let upOne = index
    for (let jindex = 0; jindex < gameState.length; jindex++) {
      diagonal.push(gameState[jindex][upOne])
      upOne++
      if (upOne > gameState[0].length - 1) break
    }
    diagonals.push(diagonal)
  }
  for (let index = 1; index < gameState.length - 3; index++) {
    const diagonal = []
    const upOne = index
    for (let jindex = 0; jindex < gameState[0].length; jindex++) {
      diagonal.push(gameState[upOne][jindex])
      upOne++
      if (upOne === gameState.length) break
    }
    diagonals.push(diagonal)
  }
  return diagonals
}

const checkForAWin = (gameState) => {
  const columnWinner = checkColumns(gameState)
  const rowWinner = checkRows(gameState)
}
