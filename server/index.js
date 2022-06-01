//Require the express moule
const express = require("express")

//create a new express application
const app = express()

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
    console.log("user connected")
})

//wire up the server to listen to our port process.env.PORT || 8000
http.listen(port, () => {
    console.log("Listening port: " + port)
})
