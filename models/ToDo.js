const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [20, 'Title cannot be more than 20 characters!']
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: String
})

module.exports = mongoose.models.ToDos || mongoose.model('ToDos', ToDoSchema)