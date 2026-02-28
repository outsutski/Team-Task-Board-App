import mongoose from "mongoose"

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})


const Team = mongoose.model('Team', TeamSchema)
export default Team
