//Require the express moule
const express = require("express")
const cors = require('cors')

//create a new express application
const app = express()

app.use(process.env.NODE_ENV == 'production' ? cors() : cors({
    origin: 'localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

/* API config */
const API_V1_PREFIX = '/api/v1/'
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* End API config */

//require the http module
const http = require("http").Server(app)

// require the socket.io module
const io = require("socket.io")

const port = process.env.PORT || 8000

const SocketServer = io(http, {
    path: '/socket.io',
})
//create an event listener

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
http.listen(port, () => {
    console.log("Listening port: " + port)
})
