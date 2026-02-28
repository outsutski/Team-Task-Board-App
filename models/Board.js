import mongoose from "mongoose"

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
        },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        default: 'public',
        enum: ['public', 'team', 'private']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})


const Board = mongoose.model('Board', BoardSchema)
export default Board
