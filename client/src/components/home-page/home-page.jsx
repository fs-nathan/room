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
  const { searchParams } = new URL(window.location.href)
  const [fields, setFields] = useState({
    roomId: searchParams.get('r') || '',
    username: '',
  })

  const history = useHistory()

  const onInputChange = (field) => (e) => {
    const { value } = e.target
    const form = { ...fields }
    form[field] = value
    setFields(form)
  }

  const onSubmit = () => {
    history.push(
      `${Routes.ROOM.replace(':roomId', fields.roomId)}?u=${fields.username}`,
    )
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
      {true && (
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
