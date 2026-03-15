import express from 'express'
import { createBoard, getBoards } from '../controllers/boardController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
router.use(protect)
router.use(express.json())


router.get('/', getBoards)
router.post('/', createBoard)

// POST /boards/:id/invite
router.post('/:id/invite', createInvite)  

// POST /boards/:id/tasks
router.post('/:id/tasks', createTask)

// GET /boards/:id/tasks
router.get('/:id/tasks', readBoard)




export default router