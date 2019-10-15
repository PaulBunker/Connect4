import minimax from '../../src/js/helpers/minimax/minimax'
import getModelPrediction from '../../src/js/helpers/getModelPrediction/getModelPrediction'

export default class GetPlayer {
  constructor(model) {
    if (model) {
      this.model = model
      this.getMove = this.getModelMove
    } else {
      this.getMove = this.getMinMaxMove
    }
  }

  getModelMove = (gameState, playerToken) => (
    getModelPrediction(this.model, playerToken, gameState)
  )

  getMinMaxMove = (gameState, playerToken) => (
    // Math.floor(Math.random() * 7)
    minimax(gameState, 0, playerToken, -10000, 10000, 10)
  )
}
