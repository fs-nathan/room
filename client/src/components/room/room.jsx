import { get, isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { NotificationManager } from 'react-notifications'
import { useHistory, useParams } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import Loader from '../loading/loader'

function Room() {
  const params = useParams()
  const { searchParams } = new URL(window.location.href)
  const [loading, setLoading] = useState(true)
  const { roomId } = params
  const username = searchParams.get('u') || undefined

  const history = useHistory()

  useEffect(() => {
    if (isEmpty(roomId) || isEmpty(username)) {
      NotificationManager.error('Please enter your roomID and username first')
      history.push(`${Routes.HOME}`)
    } else {
      // check if user can join
      const join = async () => {
        const endpoint = `${process.env.REACT_APP_SERVER_API_END_POINT}/room-user/${roomId}/find`
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
            )
            history.push(`${Routes.HOME}?r=${roomId}`)
          } else {
            setLoading(false)
          }
        } catch (e) {
          console.log(e)
        }
      }

      join()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, username])
  return <div className="full-screen">{loading && <Loader />}</div>
}

export default Room
