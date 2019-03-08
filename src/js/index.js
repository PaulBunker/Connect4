import React from 'react'
import ReactDOM from 'react-dom'
import Splitting from 'splitting'
import 'splitting/dist/splitting.css'
import '../css/index.scss'
import Board from './components/board/board'

Splitting()

const wrapper = document.getElementById('connect4')
wrapper ? ReactDOM.render(<Board />, wrapper) : false
