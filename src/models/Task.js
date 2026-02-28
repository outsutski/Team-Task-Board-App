import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
    },
    due_date: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})


const Task = mongoose.model('Task', TaskSchema)
export default Task
