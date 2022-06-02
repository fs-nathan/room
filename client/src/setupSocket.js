import io from 'socket.io-client'

export const initSocket = () => {
  const socket = io.connect(process.env.REACT_APP_SERVER_BASE_URI, {
    transports: ['websocket', 'polling', 'flashsocket'],
  })
  return socket
}
