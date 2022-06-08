import mongoose from "mongoose"

const Schema = new mongoose.Schema(
    {
        username: String,
        roomId: String
    },
    {
        timestamps: true,
        collection: 'room-user'
    }
)

Schema.statics.findUser = async function (
    roomId, username
) {
    try {
        const found = await this.findOne({
            username, roomId
        })
        if (found) return {
            exist: true,
            ...found._doc
        }
        else return {
            exist: false
        }
    } catch (error) {
        console.log('error: ', error)
        throw error
    }
}

Schema.statics.newUser = async function (
    roomId, username
) {
    try {
        const newUser = await this.create({ roomId, username })
        return {
            data: newUser
        }
    } catch (error) {
        console.log('error: ', error)
        throw error
    }
}

Schema.statics.deleteUser = async function (roomId, username) {
    try {
        const result = await this.remove({ roomId, username })
        return result
    } catch (error) {
        throw error
    }
}

export default mongoose.model("RoomUser", Schema)
