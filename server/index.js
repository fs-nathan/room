
import express, { json, urlencoded } from "express"
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io"
import "./config/mongodb.js"
import RoomMessageRouter from "./routes/api/v1/room-message.route.js"
import RoomUserRouter from "./routes/api/v1/room-user.route.js"

import WebSockets from "./utils/WebSockets.js"

//create a new express application
const app = express()

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

app.use(process.env.NODE_ENV == 'production' ? cors() : cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

/* API config */
const API_V1_PREFIX = '/api/v1'
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(`${API_V1_PREFIX}/room-message`, RoomMessageRouter)
app.use(`${API_V1_PREFIX}/room-user`, RoomUserRouter)
/* End API config */

const httpServer = createServer(app)

const port = process.env.PORT || 8000

const SocketServer = new Server(httpServer, {
    path: '/socket.io',
})

//To listen to messages
const WS = new WebSockets()
SocketServer.on("connection", WS.connection)

//wire up the server to listen to our port process.env.PORT || 8000
httpServer.listen(port, () => {
    console.log("Listening port: " + port)
})
