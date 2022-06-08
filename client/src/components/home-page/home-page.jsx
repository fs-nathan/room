/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { get } from 'lodash'
import { useHistory } from 'react-router'
import Loader from '../loading/loader'
import InputField from '../ui/input-text'
import SubmitButton from '../ui/submit-button'
import { Routes } from '../../constants/routes'

function HomePage() {
  const [fields, setFields] = useState({ roomId: '', username: '' })
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const onInputChange = (field) => (e) => {
    const { value } = e.target
    const form = { ...fields }
    form[field] = value
    setFields(form)
  }

  const onSubmit = () => {
    const join = async () => {
      setLoading(true)

      const endpoint = `${process.env.REACT_APP_SERVER_API_END_POINT}/room-user/${fields.roomId}/find`
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: fields.username }),
      }

      try {
        const fetchResponse = await fetch(endpoint, options)
        const data = await fetchResponse.json()
        const exist = get(data, 'data.exist', false)
        if (exist) {
          NotificationManager.error(
            'Username exists. Please try another username',
          )
        } else {
          history.push(Routes.ROOM.replace(':roomId', fields.roomId))
        }
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }

    join()
  }

  return (
    <>
      <h2 className="page-title">Join Chat</h2>
      <InputField
        type="text"
        placeholder="Username"
        onChange={onInputChange('username')}
        value={fields.username}
        key="username"
      />
      <InputField
        type="text"
        placeholder="RoomID"
        onChange={onInputChange('roomId')}
        value={fields.roomId}
        key="roomid"
      />
      {loading && <Loader />}
      {!loading && (
        <SubmitButton
          type="button"
          label="Join"
          disabled={!fields.roomId || !fields.username}
          onClick={onSubmit}
        />
      )}
    </>
  )
}

export default HomePage
