import mongoose from "mongoose"

const Schema = new mongoose.Schema(
    {
        message: String,
        roomId: String,
        sender: String
    },
    {
        timestamps: true,
        collection: 'room-message'
    }
)

Schema.statics.getMessagesByRoomId = async function (
    roomId
) {
    try {
        const msgList = await this.find({
            roomId
        }).sort('-createdAt').limit(7)


        return {
            data: msgList || []
        }
    } catch (error) {
        console.log('error: ', error)
        throw error
    }
}

Schema.statics.newMessage = async function (
    roomId, sender, message
) {
    try {
        const newMsg = await this.create({ roomId, sender: sender || '', message })
        return {
            data: newMsg
        }
    } catch (error) {
        console.log('error: ', error)
        throw error
    }
}

export default mongoose.model("RoomMessage", Schema)
