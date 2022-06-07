import express from 'express'
import RoomUserController from '../../../controllers/room-user.controller.js'

const router = express.Router()

router
    .post('/:id/find', RoomUserController.findUser) // also connect user here
    .post('/:id', RoomUserController.newUser)
    .delete('/:id', RoomUserController.deleteUser)
export default router
