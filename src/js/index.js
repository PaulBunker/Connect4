import React from 'react'
import ReactDOM from 'react-dom'

import Board from './components/board/board.jsx'
const wrapper = document.getElementById('connect4')
wrapper ? ReactDOM.render(<Board />, wrapper) : false