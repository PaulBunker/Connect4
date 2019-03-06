export default () => {
  self.minimax = require('../helpers/minimax/minimax') // eslint-disable-line no-restricted-globals
  self.addEventListener('message', (event) => { // eslint-disable-line no-restricted-globals
    if (!event) return
    const { board, player } = event
    postMessage(minimax(board, 0, player))
  })
}
