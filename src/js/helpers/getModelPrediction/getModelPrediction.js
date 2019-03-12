import * as tf from '@tensorflow/tfjs-node'
import sanitizeBoard from '../sanitizeBoard/sanitizeBoard'

export default (model, player, gameState) => {
  const predictions = model.predict(tf.tensor([sanitizeBoard(player, gameState)])).dataSync()
  const list = []
  predictions.forEach((pred, i) => {
    list.push({
      column: i,
      pred,
    })
  })
  const orderedPredictions = [...list].sort((a, b) => {
    if (a.pred < b.pred) { return 1 }
    if (a.pred > b.pred) { return -1 }
    return 0
  })
  for (let index = 0; index < orderedPredictions.length; index++) {
    const prediction = orderedPredictions[index]
    if (gameState[prediction.column].indexOf(null) !== -1) {
      return prediction.column
    }
  }
}
