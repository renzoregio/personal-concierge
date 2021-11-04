const mongoose = require('mongoose');

const NotePasswordSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        maxlength: [20, "Password cannot be more than 20 characters"]
    }
})

module.exports = mongoose.models.NotePassword || mongoose.model("NotePassword", NotePasswordSchema)