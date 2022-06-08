import React from 'react'
import { useParams } from 'react-router-dom'
import logo from '../logo.svg'

function Room() {
  const params = useParams()
  const { roomId } = params
  console.log(roomId)
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

export default Room
