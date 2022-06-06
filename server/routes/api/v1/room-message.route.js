import express from 'express'
import RoomMessageController from '../../../controllers/room-message.controller'

const router = express.Router()

router
    .getAll('/:id', RoomMessageController.getAll) // also connect user here
    .create('/:id', RoomMessageController.create)
export default router