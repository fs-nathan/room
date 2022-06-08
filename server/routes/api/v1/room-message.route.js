import express from 'express'
import RoomMessageController from '../../../controllers/room-message.controller.js'

const router = express.Router()

router
    .get('/:roomId', RoomMessageController.get) // also connect user here
    .post('/:roomId', RoomMessageController.newMessage)
export default router
