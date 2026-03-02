import Board from '../models/Board.js'

export const createBoard = async (req, res, next) => {
    try {
        const { title } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })

        const board = await Board.create({
            title,
            ownerId: req.user.userId,       // ← comes from the JWT via protect middleware
            memberIds: [req.user.userId]    // ← owner is automatically a member
        })

        res.status(201).json(board)
    } catch (err) {
        next(err)  // ← pass to centralized error handler, don't inline it
    }
}