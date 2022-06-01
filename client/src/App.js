import React from 'react'
import { io } from 'socket.io-client'
import logo from './logo.svg'
import './App.css'

function App() {
  const socket = io.connect(process.env.REACT_APP_SERVER_BASE_URI)

  console.log(socket)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
