import mongoose from "mongoose"

const TeamMemberSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    role_id: {
        type: String,
        required: true
    },
})


const TeamMember = mongoose.model('TeamMember', TeamMemberSchema)
export default TeamMember
