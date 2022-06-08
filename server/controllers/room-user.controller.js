import RoomUserModel from '../models/RoomUser.js'

export default {
    findUser: async (req, res) => {
        try {
            const { roomId } = req.params
            const username = req.body.username
            const found = await RoomUserModel.findUser(roomId, username)
            return res.status(200).json({ success: true, data: found })
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
    newUser: async (req, res) => {
        try {
            const { roomId } = req.params
            const username = req.body.username
            console.log('Trying to add new user: ', username, roomId)
            const found = await RoomUserModel.findUser(roomId, username)
            if (found && found.exist) return res.status(200).json({ success: true, data: found })
            const created = await RoomUserModel.newUser(roomId, username)
            return res.status(200).json({ success: true, ...created })
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await RoomUserModel.deleteUser(req.params.roomId, req.body.username);
            return res.status(200).json({
                success: true,
                message: `Deleted user from room`,
                user
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
}
