/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { checkForAWin } from '../checkWin/checkWin'
import addChequer from '../addChequer/addChequer'

const RED = 'r'
const YELLOW = 'y'

const otherSide = (side) => {
  switch (side) {
    case RED:
      return YELLOW
    case YELLOW:
      return RED
    default:
      return false
  }
}

class Play {
  constructor(row, col) {
    this.row = row
    this.col = col
  }

  hash() {
    return `${this.row.toString()},${this.col.toString()}`
  }
}

class State {
  constructor(board, player) {
    this.board = board
    this.player = player
    this.plays = this.getLegalPlays()
    this.winner = checkForAWin(board)
  }

  getLegalPlays() {
    const plays = []
    this.board.forEach((column, i) => {
      const row = column.indexOf(null)
      if (row !== -1) plays.push(new Play(row, i))
    })
    return plays
  }

  isPlayer(player) {
    return (player === this.player)
  }

  hash() {
    return JSON.stringify(this.board)
  }

  // Note: If hash uses board, multiple parents possible
}

class MonteCarloNode {
  constructor(parent, play, state) {
    this.play = play
    this.state = state
    // Monte Carlo stuff
    this.n_plays = 0
    this.n_wins = 0
    // Tree stuff
    this.parent = parent
    this.children = new Map()
    state.plays.forEach((play) => {
      this.children.set(play.hash(), { play, node: null })
    })
  }

  /** Get the MonteCarloNode corresponding to the given play. */
  childNode(play) {
    const child = this.children.get(play.hash())
    if (child === undefined) {
      throw new Error('No such play!')
    } else if (child.node === null) {
      throw new Error('Child is not expanded!')
    }
    return child.node
  }

  /** Expand the specified child play and return the new child node. */
  expand(play, childState) {
    if (!this.children.has(play.hash())) throw new Error('No such play!')
    const childNode = new MonteCarloNode(this, play, childState)
    this.children.set(play.hash(), { play, node: childNode })
    return childNode
  }

  /** Get all legal plays from this node. */
  allPlays() {
    const ret = []
    for (const child of this.children.values()) {
      ret.push(child.play)
    }
    return ret
  }

  /** Get all unexpanded legal plays from this node. */
  unexpandedPlays() {
    const ret = []
    for (const child of this.children.values()) {
      if (child.node === null) ret.push(child.play)
    }
    return ret
  }

  /** Whether this node is fully expanded. */
  isFullyExpanded() {
    for (const child of this.children.values()) {
      if (child.node === null) return false
    }
    return true
  }

  /** Whether this node is terminal in the game tree,
      NOT INCLUSIVE of termination due to winning. */
  isLeaf() {
    if (this.children.size === 0) return true
    return false
  }

  /** Get the UCB1 value for this node. */
  getUCB1(biasParam) {
    return (this.n_wins / this.n_plays) + Math.sqrt(biasParam * Math.log(this.parent.n_plays) / this.n_plays)
  }
}

export default class MonteCarlo {
  constructor(UCB1ExploreParam = 2) {
    this.UCB1ExploreParam = UCB1ExploreParam
    this.nodes = new Map() // map: State.hash() => MonteCarloNode
  }

  newGame() {
    this.nodes = new Map()
  }

  makeNode(state) {
    if (!this.nodes.has(state.hash())) {
      const node = new MonteCarloNode(null, null, state)
      this.nodes.set(state.hash(), node)
    }
  }

  runSearch(state, timeout = 3) {
    this.makeNode(state)
    const end = Date.now() + timeout * 1000
    while (Date.now() < end) {
      let node = this.select(state)
      let { winner } = node.state
      // console.log(winner)
      if (node.isLeaf() === false && winner === null) {
        node = this.expand(node)
        winner = this.simulate(node)
      }
      this.backpropagate(node, winner)
    }
  }

  getMove = (board, player) => {
    const state = new State(board, player)
    this.runSearch(state, 1)
    // console.log(this.bestPlay(state))
    return this.bestPlay(state).col
  }

  /** Get the best move from available statistics. */
  bestPlay(state) {
    this.makeNode(state)
    // If not all children are expanded, not enough information
    // console.log(this.nodes.get(state.hash()))
    if (this.nodes.get(state.hash()).isFullyExpanded() === false) {
      throw new Error('Not enough information!')
    }
    const node = this.nodes.get(state.hash())
    const allPlays = node.allPlays()
    // console.log('all', allPlays)
    let bestPlay
    let max = -Infinity
    for (const play of allPlays) {
      const childNode = node.childNode(play)
      if (childNode.n_plays > max) {
        bestPlay = play
        max = childNode.n_plays
      }
    }
    return bestPlay
  }

  select(state) {
    let node = this.nodes.get(state.hash())
    while (node.isFullyExpanded() && !node.isLeaf()) {
      const plays = node.allPlays()
      let bestPlay
      let bestUCB1 = -Infinity
      for (const play of plays) {
        const childUCB1 = node.childNode(play)
          .getUCB1(this.UCB1ExploreParam)
        if (childUCB1 > bestUCB1) {
          bestPlay = play
          bestUCB1 = childUCB1
        }
      }
      node = node.childNode(bestPlay)
    }
    return node
  }

  nextState = (state, play) => {
    // console.log(state, play)
    const newBoard = addChequer(state.board, play.col, state.player)
    const newPlayer = otherSide(state.player)
    return new State(newBoard, newPlayer)
  }

  /** Phase 2, Expansion: Expand a random unexpanded child node */
  expand(node) {
    const plays = node.unexpandedPlays()
    const index = Math.floor(Math.random() * plays.length)
    const play = plays[index]
    const childState = this.nextState(node.state, play)
    const childUnexpandedPlays = childState.plays
    const childNode = node.expand(play, childState, childUnexpandedPlays)
    this.nodes.set(childState.hash(), childNode)
    return childNode
  }

  /** Phase 3, Simulation: Play game to terminal state, return winner */
  simulate(node) {
    let { state } = node
    let winner = checkForAWin(state.board)
    while (winner === null) {
      const { plays } = state
      const play = plays[Math.floor(Math.random() * plays.length)]
      state = this.nextState(state, play)
      winner = checkForAWin(state.board)
    }
    return winner
  }

  /** Phase 4, Backpropagation: Update ancestor statistics */
  backpropagate = (node, winner) => {
    while (node !== null) {
      node.n_plays += 1
      // Parent's choice
      if (winner === false || node.state.isPlayer(otherSide(winner))) {
        const score = winner === false ? 0.5 : 1
        node.n_wins += score
      }
      node = node.parent
    }
  }
}

