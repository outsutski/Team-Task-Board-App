import Task from '../models/Task.js'
import Board from '../models/Board.js'

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ error: 'Task not found' })

        const board = await Board.findById(task.boardId)
        const isMember = board.memberIds.map(id => id.toString()).includes(req.user.userId)
        if (!isMember) return res.status(403).json({ error: 'Not authorized' })

        const { title, completed } = req.body
        if (title !== undefined) task.title = title
        if (completed !== undefined) task.completed = completed
        await task.save()

        res.json(task)
    } catch (err) { next(err) }
}

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ error: 'Task not found' })

        const board = await Board.findById(task.boardId)
        const isOwner = board.ownerId.toString() === req.user.userId
        const isCreator = task.createdBy.toString() === req.user.userId
        if (!isOwner && !isCreator) return res.status(403).json({ error: 'Not authorized' })

        await task.deleteOne()
        res.json({ message: 'Task deleted' })
    } catch (err) { next(err) }
}

export {updateTask, deleteTask}