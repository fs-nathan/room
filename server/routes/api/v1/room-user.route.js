import express from 'express'
import RoomUserController from '../../../controllers/room-user.controller'

const router = express.Router()

router
    .get('/:id/users', RoomUserController.getActiveUsers) // also connect user here
    .delete('/:id', RoomUserController.disconnectUser)
export default router
