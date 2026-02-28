import mongoose from "mongoose"

const BoardSchema = new mongoose.Schema({
    name: {
        team_id: String,
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
})


const Board = mongoose.model('Board', BoardSchema)
export default Board
