import _ from 'lodash'
import RoomMessageModel from '../models/RoomMessage.js'
import RoomUserModel from '../models/RoomUser.js'
class WebSockets {

    constructor() {
        this.rooms = { randomRoomId: [] }
        this.identities = { randomClientId: [] }
        this.connection = this.connection.bind(this)
    }

    connection(client) {

        console.log('Client connected: ', client.id)

        console.log('\n')

        const sendSystemMessage = async (roomId, message) => {
            const msg = await RoomMessageModel.newMessage(roomId, '', message)
            if (global.SS && roomId && msg.data) {
                global.SS.to(roomId).emit('MESSAGE_RECEIVED', msg.data)
                console.log(`Broadcasting this to room ${roomId} ...`)
                console.log('\n')
            } else {
                console.log('SocketServer undefined ...')
            }
        }

        // event fired when the client is disconnected
        client.on("disconnect", () => {

            console.log(`Before ${client.id} disconnect-----------------`)
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            const room_user = []

            const usernames = _.get(this.identities, client.id, [])

            // disconnect all users with username in the array usernames
            if (!_.isEmpty(this.rooms)) Object.keys(this.rooms).forEach(roomId => {
                const activeUsers = _.get(this.rooms, roomId, [])
                this.rooms[roomId] = activeUsers.filter(name => !usernames.includes(name))
                activeUsers.filter(name => usernames.includes(name)).map(name => {
                    room_user.push({ roomId, username: name})
                    return name // no need
                })
                try {
                    client.leave(roomId)
                } catch (e) {
                    console.log(e)
                }
            })

            // identities
            if (!_.isEmpty(this.identities)) this.identities = _.omit(this.identities, client.id)



            console.log(`After ${client.id} disconnect-----------------`)
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            // call backend to remove all room-user documents with username in the array usernames
            const removeUsers = async () => {
                await RoomUserModel.deleteUsers(usernames)
            }

            if (!_.isEmpty(usernames)) {
                removeUsers()
            }

            if (!_.isEmpty(room_user)) {
                room_user.map(async (item) => {
                    sendSystemMessage(item.roomId, `${item.username} has left`)
                    return item
                })
            }
        })

        // subscribe person to chat & other user as well
        client.on("subscribe", (data) => {
            const { roomId, username } = data
            console.log(`Before ${username} subscribe-----------------`)
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            client.join(roomId)

            // rooms
            const activeUsers = _.get(this.rooms, roomId, [])
            if(!activeUsers.includes(username)) activeUsers.push(username)
            this.rooms[roomId] = activeUsers

            // identities
            const usernames = _.get(this.identities, client.id, [])
            if(!usernames.includes(username)) usernames.push(username)
            this.identities[client.id] = usernames

            console.log(`After ${username} subscribe-----------------`)
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            // call backend to update db
            const addUserToRoom = async () => {
                await RoomUserModel.newUser(roomId, username)
            }

            addUserToRoom()
            sendSystemMessage(roomId, `${username} has joined`)
        })

        // leave a chat room
        client.on("unsubscribe", (data) => {
            const { roomId, username } = data
            console.log(`Before ${username} unsubscribe-----------------`)
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')


            client.leave(roomId)

            // rooms
            const activeUsers = _.get(this.rooms, roomId, [])
            this.rooms[roomId] = activeUsers.filter(name => name != username)

            // identities
            const usernames = _.get(this.identities, client.id, [])
            this.identities[client.id] = usernames.filter(name => name != username)

            console.log(`After ${username} unsubscribe-----------------`)
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            // call backend to update db
            const removeUserFromRoom = async () => {
                await RoomUserModel.deleteUser(roomId, username)
            }

            removeUserFromRoom()
            sendSystemMessage(roomId, `${username} has left`)
        })

        client.on("MESSAGE_SEND", (data) => {
            console.log('\n')
            console.log('Received from client: ', data)

            // broadcast to room
            const {roomId} = data
            if (global.SS && roomId) {

                global.SS.to(roomId).emit('MESSAGE_RECEIVED', data)
                console.log(`Broadcasting this to room ${roomId} ...`)
                console.log('\n')
            } else {
                console.log('SocketServer undefined ...')
            }

        })
    }

}

export default WebSockets
