import Board from '../models/Board.js'
import User from '../models/User.js'
import Task from '../models/Task.js'

const createBoard = async (req, res, next) => {
    try {
        const { title } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })

        const board = await Board.create({
            title,
            ownerId: req.user.userId,    
            memberIds: [req.user.userId]   
        })

    res.status(201).json(board)
    } catch (err) {
        next(err) 
    }
}

const getBoards = async (req, res, next) => {
    try {
        const boards = await Board.find({ memberIds: req.user.userId })
        res.json(boards)
    } catch (err) { next(err) }
}

const createInvite = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ error: 'Email is required' })

        const board = await Board.findById(req.params.id)
        if (!board) return res.status(404).json({ error: 'Board not found' })

        if (board.ownerId.toString() !== req.user.userId)
            return res.status(403).json({ error: 'Not authorized' })

        const userToInvite = await User.findOne({ email })
        if (!userToInvite) return res.status(404).json({ error: 'User not found' })

        if (board.memberIds.map(id => id.toString()).includes(userToInvite._id.toString()))
            return res.status(400).json({ error: 'User is already a member' })

        board.memberIds.push(userToInvite._id)
        await board.save()

        res.json({ message: `${email} added to board` })
    } catch (err) { next(err) }
}


const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })

        const board = await Board.findById(req.params.id)
        if (!board) return res.status(404).json({ error: 'Board not found' })

        if (!board.memberIds.map(id => id.toString()).includes(req.user.userId))
            return res.status(403).json({ error: 'Not a board member' })

        const task = await Task.create({
            title,
            description,
            boardId: board._id,
            createdBy: req.user.userId
        })

        res.status(201).json(task)
    } catch (err) { next(err) }
}

const readBoard = async (req, res, next) => {
    try {
        const board = await Board.findById(req.params.id)
        if (!board) return res.status(404).json({ error: 'Board not found' })

        if (!board.memberIds.map(id => id.toString()).includes(req.user.userId))
            return res.status(403).json({ error: 'Not a board member' })

        const tasks = await Task.find({ boardId: req.params.id })
        res.json(tasks)
    } catch (err) { next(err) }
}

export { createBoard, getBoards, createInvite, createTask, readBoard }