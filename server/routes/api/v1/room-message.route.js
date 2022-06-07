import express from 'express'
import RoomMessageController from '../../../controllers/room-message.controller.js'

const router = express.Router()

router
    .get('/:id', RoomMessageController.get) // also connect user here
    .post('/:id', RoomMessageController.newMessage)
export default router
