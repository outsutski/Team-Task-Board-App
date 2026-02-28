import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignee_id: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})


const Task = mongoose.model('Task', TaskSchema)
export default Task
