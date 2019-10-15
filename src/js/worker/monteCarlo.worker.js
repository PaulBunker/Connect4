import MonteCarlo from '../helpers/monteCarlo/monteCarlo'

const mcts = new MonteCarlo()
self.addEventListener('message', (event) => {
  if (event.data) {
    const { board, player } = event.data
    self.postMessage(mcts.getMove(board, player))
  }
})
