import * as tf from '@tensorflow/tfjs-node'
import path from 'path'

const RED = 'r'
const YELLOW = 'y'

const isLegal = (gameState, index) => gameState[index].indexOf(null) !== -1

const otherSide = (side) => {
  switch (side) {
    case RED:
      return YELLOW
    case YELLOW:
      return RED
    default:
      throw `${side} is not a valid side`
  }
}

class NN {
  constructor(learning_rate = 0.001, modelNumber) {
    this.learning_rate = learning_rate
    if (modelNumber) {
      this.model = this.loadModel(modelNumber)
    } else {
      this.model = this.createModel()
    }
  }

  loadModel = async (modelNumber) => {
    console.log(modelNumber)
    const model = await tf.loadLayersModel(`file://${path.join(__dirname, '..', 'models', `${modelNumber}`, 'model.json')}`)
    console.log('model')
    return model
  }

  train(actions, rewards, boards) {
    const optimizer = tf.train.adam(this.learning_rate, 0.999)
    const oneHotLabels = tf.oneHot(actions, 7)
    const loss = optimizer.minimize(() => tf.tidy(() => {
      const logits = this.model.predict(tf.tensor(boards))
      const crossEntropies = tf.losses.sigmoidCrossEntropy(oneHotLabels, logits)
      const loss = tf.sum(tf.tensor(rewards).mul(crossEntropies))
      return loss
    }), true)
    // loss.print()
  }

  createModel = () => {
    const model = tf.sequential()

    model.add(
      tf.layers.dense({
        units: 7 * 6 * 3 * 7,
        activation: 'relu',
        inputShape: [7 * 6 * 3],
      }),
    )
    model.add(
      tf.layers.dense({
        units: 7 * 6 * 3,
        activation: 'relu',
      }),
    )

    model.add(
      tf.layers.dense({
        units: 7,
      }),
    )

    return model
  }
}

export default class PolicyAgent {
  constructor(modelNumber) {
    this.NN = new NN(0.001, modelNumber)
    this.winValue = 10
    this.drawValue = 5
    this.lossValue = 0
  }

  newGame(side) {
    this.side = side
    this.boards = []
    this.actions = []
  }

  getLegalMove(gameState, nnInput) {
    return tf.tidy(() => {
      const logits = this.NN.model.predict(tf.tensor([nnInput])).dataSync().filter((e, i) => isLegal(gameState, i))
      let index = logits.length === 1 ? 0 : tf.multinomial(tf.tensor(logits), 1).dataSync()[0]
      for (let i = 0; i < 7; i++) {
        if (isLegal(gameState, i)) {
          if (index === 0) {
            return i
          }
          index--
        }
      }
    })
  }

  boardToNNInput(state) {
    const flat = state.flat()
    // console.log(flat)
    return [
      ...flat.map(space => space === this.side ? 1 : 0),
      ...flat.map(space => space === otherSide(this.side) ? 1 : 0),
      ...flat.map(space => space === null ? 1 : 0),
    ]
  }

  getMove(gameState) {
    const nnInput = this.boardToNNInput(gameState)
    const move = this.getLegalMove(gameState, nnInput)
    this.boards.push(nnInput)
    this.actions.push(move)
    return move
  }

  gameComplete(result) {
    let reward
    if (
      (result === YELLOW && this.side === YELLOW)
      || (result === RED && this.side === RED)
    ) {
      reward = this.winValue
    } else if (
      (result === YELLOW && this.side === RED)
      || (result === RED && this.side === YELLOW)
    ) {
      reward = this.lossValue
    } else {
      reward = this.drawValue
    }

    const rewards = []
    this.actions.forEach(() => {
      rewards.push(reward)
      reward *= 0.5
    })
    rewards.reverse()
    // console.log(this.actions, rewards, this.boards)
    this.NN.train(this.actions, rewards, this.boards)
    return null
  }
}
