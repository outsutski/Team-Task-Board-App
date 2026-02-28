import mongoose from "mongoose"

const ListSchema = new mongoose.Schema({
    board_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
})


const List = mongoose.model('List', ListSchema)
export default List
