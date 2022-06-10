/* eslint-disable no-unused-vars */
import { get, isEmpty, isEqual, reverse } from 'lodash'
import React, { useState, useEffect } from 'react'
import { NotificationManager } from 'react-notifications'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Routes } from '../../constants/routes'
import Loader from '../loading/loader'
import List from './chat/list'
import MessageButton from './chat/send-button'

const NavWrapper = styled.div`
  height: 90px;
  z-index: 2;
  position: absolute;
  top: 0;
  @media only screen and (max-width: 600px) {
    min-width: calc(90vw);
    left: calc(5vw);
  }
  @media only screen and (min-width: 600px) {
    width: 540px;
    left: calc(50vw - 270px);
  }
  display: flex;
  align-items: center;

  .nav-left,
  .nav-right {
    @media only screen and (max-width: 600px) {
      width: 32px;
    }
    @media only screen and (min-width: 600px) {
      width: 32px;
    }
    color: #5db075;
    display: inline-flex;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    padding: 0;
    text-align: center;
    justify-content: center;
  }

  .nav-title {
    display: inline;

    @media only screen and (max-width: 600px) {
      width: calc(90vw - 64px);
    }
    @media only screen and (min-width: 600px) {
      width: calc(540px - 64px);
    }
  }
`

function Room() {
  const params = useParams()
  const { searchParams } = new URL(window.location.href)
  const [loading, setLoading] = useState(true)
  const { roomId } = params
  const username = searchParams.get('u') || undefined

  const [messages, setMessages] = useState([])
  const history = useHistory()
  const [subscribed, setSubscribed] = useState(false)

  const fetchMessages = () => {
    const load = async () => {
      const endpoint = `${
        process.env.REACT_APP_SERVER_API_END_POINT || '/api/v1'
      }/room-message/${roomId}`
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }

      try {
        const fetchResponse = await fetch(endpoint, options)
        const data = await fetchResponse.json()
        const result = get(data, 'data', [])
        setMessages(reverse(result))
        setTimeout(() => {
          scrollToBottom()
        }, 200)
      } catch (e) {
        NotificationManager.error('Something went wrong', undefined, 1500)
        console.log(e)
      }
      setLoading(false)
    }

    load()
  }

  const handleExitRoom = () => {
    // call API to exit room. if success -> call socket.unsubcribe

    const exitRoom = async () => {
      const endpoint = `${
        process.env.REACT_APP_SERVER_API_END_POINT || '/api/v1'
      }/room-user/${roomId}`
      const options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      }

      try {
        const fetchResponse = await fetch(endpoint, options)
        const data = await fetchResponse.json()
        const success = get(data, 'success', false)
        if (success) {
          NotificationManager.success(`You just left ${roomId}`, undefined, 500)
          history.push(`${Routes.HOME}?r=${roomId}&u=${username}`)
          if (subscribed) {
            const socket = window.SOCKET
            socket.emit('unsubscribe', { roomId, username })
          }
        } else {
          NotificationManager.error(
            'Unable to leave. Please try again',
            undefined,
            1500,
          )
        }
      } catch (e) {
        NotificationManager.error('Something went wrong', undefined, 1500)
        console.log(e)
      }
      setLoading(false)
    }

    exitRoom()
  }

  const handleSendMessage = (message) => {
    const send = async () => {
      const endpoint = `${
        process.env.REACT_APP_SERVER_API_END_POINT || '/api/v1'
      }/room-message/${roomId}`
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: username, message }),
      }

      try {
        const fetchResponse = await fetch(endpoint, options)
        const data = await fetchResponse.json()
        const result = get(data, 'data', {})
        const success = get(data, 'success', false)
        if (success && !isEmpty(result))
          window.SOCKET.emit('MESSAGE_SEND', result)
      } catch (e) {
        NotificationManager.error('Something went wrong', undefined, 1500)
        console.log(e)
      }
    }

    send()
  }

  const scrollToBottom = () => {
    const elem = document.getElementById('messages-list')
    if (elem) elem.scrollTop = elem.scrollHeight
  }

  useEffect(() => {
    if (isEmpty(roomId) || isEmpty(username)) {
      NotificationManager.error(
        'Please enter your roomID and username first',
        undefined,
        1500,
      )
      history.push(`${Routes.HOME}`)
    } else {
      // check if user can join
      const join = async () => {
        const endpoint = `${
          process.env.REACT_APP_SERVER_API_END_POINT || '/api/v1'
        }/room-user/${roomId}/find`
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        }

        try {
          const fetchResponse = await fetch(endpoint, options)
          const data = await fetchResponse.json()
          const exist = get(data, 'data.exist', false)
          if (exist) {
            NotificationManager.error(
              'Username exists in room. Please try another username',
              undefined,
              1500,
            )
            history.push(`${Routes.HOME}?r=${roomId}&u=${username}`)
          } else {
            const socket = window.SOCKET
            socket.on('MESSAGE_RECEIVED', (msg) => {
              setMessages((old) => {
                const found = [...old].filter((item) =>
                  isEqual(get(item, '_id'), get(msg, '_id')),
                )
                if (isEmpty(found)) return [...old, msg]
                return [...old]
              })
              setTimeout(() => {
                scrollToBottom()
              }, 200)
            })
            socket.emit('subscribe', { roomId, username })
            setSubscribed(true)
            NotificationManager.success(`Welcome to ${roomId}`, undefined, 500)
            fetchMessages()
          }
        } catch (e) {
          console.log(e)
        }
      }

      join()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, username])
  return (
    <div className="full-screen">
      {loading && <Loader />}
      {!loading && roomId && username && (
        <NavWrapper>
          <button type="button" className="nav-left" onClick={handleExitRoom}>
            Exit
          </button>
          <h2 className="page-title nav-title">{roomId}</h2>
          <div className="nav-right"> </div>
        </NavWrapper>
      )}
      {!loading && !isEmpty(messages) && roomId && username && (
        <List messages={messages} me={username} roomId={roomId} />
      )}
      {!loading && roomId && username && (
        <MessageButton onSubmit={handleSendMessage} />
      )}
    </div>
  )
}

export default Room
