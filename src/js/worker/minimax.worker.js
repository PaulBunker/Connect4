import minimax from '../helpers/minimax/minimax'

self.addEventListener('message', (event) => {
  if (event.data) {
    const { board, player, difficulty } = event.data
    self.postMessage(minimax(board, 0, player, -99999, 99999, difficulty))
  }
})
