import io from 'socket.io-client'

export const initSocket = () => {
  const connect = async () => {
    const socket = await io.connect(process.env.REACT_APP_SERVER_BASE_URI, {
      transports: ['websocket', 'polling', 'flashsocket'],
    })
    window.SOCKET = socket
    socket.emit('hi', {})
  }
  connect()
}
