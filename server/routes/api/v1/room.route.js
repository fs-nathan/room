import express from 'express'
import roomController from '../../../controllers/room.controller'

const router = express.Router()

router
    .get('/:id', roomController.getById)
    .post('/', roomController.)
export default router
