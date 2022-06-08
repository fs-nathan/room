import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationContainer } from 'react-notifications'
import './index.css'
import 'react-notifications/lib/notifications.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { initSocket } from './setupSocket'

initSocket()
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <NotificationContainer />
    <App />
  </>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
