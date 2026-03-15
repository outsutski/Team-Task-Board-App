import Task from '../models/Task.js'

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title: 'New title', completed: true },
            { new: true } 
            )
            if (!task) {
            return res.status(404).json({ message: 'Task not found' });
            }
        res.status(200).json({ message: 'Task has been updated' })
    } catch (err) {
        
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Task has been deleted' })
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        next(err)
    }
}

export default {updateTask, deleteTask}