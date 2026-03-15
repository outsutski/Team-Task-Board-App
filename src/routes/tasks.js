import express from "express";
import { updateTask, deleteTask } from '../controllers/taskController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
router.use(protect)

// PATCH /tasks/:id
router.patch('/:id', updateTask)

// DELETE /tasks/:id
router.delete('/:id', deleteTask)