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
    }
})

module.exports = mongoose.models.ToDo || mongoose.model('ToDo', ToDoSchema);