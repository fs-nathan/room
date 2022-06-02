//Require the express moule
const express = require("express")
const cors = require('cors')

//create a new express application
const app = express()

app.use(process.env.NODE_ENV == 'production' ? cors() : cors({
    origin: 'localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

//require the http module
const http = require("http").Server(app)

// require the socket.io module
const io = require("socket.io")

const port = process.env.PORT || 8000

const socket = io(http, {
    path: '/socket.io',
})
//create an event listener

//To listen to messages
socket.on("connection", (socket) => {
    console.log("user connected: ", socket.id)
})

//wire up the server to listen to our port process.env.PORT || 8000
http.listen(port, () => {
    console.log("Listening port: " + port)
})
