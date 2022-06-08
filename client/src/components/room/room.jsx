import React from 'react'
import { useParams } from 'react-router-dom'

function Room() {
  const params = useParams()
  const { roomId } = params
  console.log(roomId)
  return <div className="full-screen"></div>
}

export default Room
