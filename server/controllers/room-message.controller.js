import RoomMessageModel from '../models/RoomMessage.js'

export default {
    get: async (req, res) => {
        try {
            const { roomId } = req.params
            const msgs = await RoomMessageModel.getMessagesByRoomId(roomId)
            return res.status(200).json({ success: true, ...msgs })
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
    newMessage: async (req, res) => {
        try {
            const { roomId } = req.params
            const sender = req.body.sender
            const message = req.body.message
            const created = await RoomMessageModel.newMessage(roomId, sender, message)
            return res.status(200).json({ success: true, ...created })
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
}
