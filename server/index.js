
import express, { json, urlencoded } from "express"
import cors from 'cors'
import { createServer } from "http"
import { Server } from "socket.io"
import "./config/mongodb.js"
import RoomMessageRouter from "./routes/api/v1/room-message.route.js"
import RoomUserRouter from "./routes/api/v1/room-user.route.js"
//create a new express application
const app = express()

app.use(process.env.NODE_ENV == 'production' ? cors() : cors({
    origin: 'localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

/* API config */
const API_V1_PREFIX = '/api/v1/'
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(`${API_V1_PREFIX}/room-message`, RoomMessageRouter)
app.use(`${API_V1_PREFIX}/room-user`, RoomUserRouter)
/* End API config */

const httpServer = createServer()

const port = process.env.PORT || 8000

const SocketServer = new Server(httpServer, {
    path: '/socket.io',
})

//To listen to messages
SocketServer.on("connection", (socket) => {
    console.log("user connected: ", socket.id)

    socket.on("hi", () => {
        console.log('say hi: ', socket.id)
    })

    socket.on("disconnect", (reason) => {
        console.log("socket disconnected : ", socket.id)
    })
})
SocketServer.on("hi", (socket) => {
    console.log(socket.id)
})

//wire up the server to listen to our port process.env.PORT || 8000
httpServer.listen(port, () => {
    console.log("Listening port: " + port)
})
