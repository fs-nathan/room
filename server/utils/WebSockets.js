import _ from 'lodash'

class WebSockets {

    constructor() {
        this.rooms = { randomRoomId: [] }
        this.identities = { randomClientId: [] }
        this.connection = this.connection.bind(this)
    }

    connection(client) {

        console.log('Client connected: ', client.id)

        console.log('\n')

        // event fired when the client is disconnected
        client.on("disconnect", () => {

            console.log('Before disconnect-----------------')
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            const usernames = _.get(this.identities, client.id, [])

            // disconnect all users with username in the array usernames
            if (!_.isEmpty(this.rooms)) Object.keys(this.rooms).forEach(roomId => {
                const activeUsers = _.get(this.rooms, roomId, [])
                this.rooms[roomId] = activeUsers.filter(name => !usernames.includes(name))
                try {
                    client.leave(roomId)
                } catch (e) {
                    console.log(e)
                }
            })

            // identities
            if (!_.isEmpty(this.identities)) this.identities = _.omit(this.identities, client.id)



            console.log('After disconnect-----------------')
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            // call backend to remove all document with username in the array usernames
        })

        // subscribe person to chat & other user as well
        client.on("subscribe", (data) => {
            const { roomId, username } = data
            console.log('Before subscribe-----------------')
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            client.join(roomId)

            // rooms
            const activeUsers = _.get(this.rooms, roomId, [])
            activeUsers.push(username)
            this.rooms[roomId] = activeUsers

            // identities
            const usernames = _.get(this.identities, client.id, [])
            usernames.push(username)
            this.identities[client.id] = usernames

            console.log('After subscribe-----------------')
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            // call backend to update db
        })

        // leave a chat room
        client.on("unsubscribe", (data) => {
            const { roomId, username } = data
            console.log('Before unsubscribe-----------------')
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

            console.log('After unsubscribe-----------------')
            console.log('rooms: ', this.rooms)
            console.log('identities: ', this.identities)
            console.log('\n')

            // call backend to update db
        })
    }

}

export default WebSockets
