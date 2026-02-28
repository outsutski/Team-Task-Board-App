import mongoose from "mongoose"

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    memberIds: [
        { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' }
    ],
    visibility: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})


const Board = mongoose.model('Board', BoardSchema)
export default Board
