import Board from '../models/Board.js'
import User from '../models/User.js'

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

const createInvite = async (req, res) => {
    const boardId = req.params.id
     if (ownerId === req.user.userId){
        const { email } = req.body
        const user = await User.findOne({ email })
     }else {

     }

    res.status(200).json({ message: `Invited ${email} to board ${boardId}` });
}

const createTask = (req, res) => {
    const boardId = req.params.id
    const taskData = req.body

    res.status(201).json({
        message: `Task created for board ${boardId}`,
        data: taskData
    })
}

const readBoard = async (req, res) => {
    const boardId = req.params.id

    const tasks = await Task.find({ boardId: boardId });

    res.status(200).json({
        message: `Fetched tasks for board ${boardId}`,
    })
}

export default {createBoard, getBoards, createInvite, createTask, readBoard}