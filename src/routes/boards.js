import express from 'express'
import { createBoard } from '../controllers/boardController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
router.use(protect)
router.use(express.json())

// GET /boards
router.get('/', (req, res) => {
    const boardId = req.params.id
    res.status(200).send('data')
})


router.post('/', createBoard)

// POST /boards/:id/invite
router.post('/:id/invite', (req, res) => {
    const boardId = req.params.id 
    const { email } = req.body

    res.status(200).json({ message: `Invited ${email} to board ${boardId}` });
})

// POST /boards/:id/tasks
router.post('/:id/tasks', (req, res) => {
    const boardId = req.params.id
    const taskData = req.body

    res.status(201).json({
        message: `Task created for board ${boardId}`,
        data: taskData
    })
})

// GET /boards/:id/tasks
router.get('/:id/tasks', async (req, res) => {
    const boardId = req.params.id

    const tasks = await Task.find({ boardId: boardId });

    res.status(200).json({
        message: `Fetched tasks for board ${boardId}`,
    })
})



export default router