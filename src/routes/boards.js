// src/routes/boards.js
import express from 'express'
import { createBoard } from '../controllers/boardController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
router.use(protect)

router.post('/', createBoard)

export default router