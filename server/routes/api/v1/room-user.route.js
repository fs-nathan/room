import express from 'express'
import RoomUserController from '../../../controllers/room-user.controller.js'

const router = express.Router()

router
    .post('/:roomId/find', RoomUserController.findUser) // also connect user here
    .post('/:roomId', RoomUserController.newUser)
    .delete('/:roomId', RoomUserController.deleteUser)
export default router
