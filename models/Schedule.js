const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    user: String,
    monday: [{
        type: String
    }],
    tuesday: [{
        type: String
    }],
    wednesday: [{
        type: String
    }],
    thursday: [{
        type: String
    }],
    friday: [{
        type: String
    }],
    saturday: [{
        type: String
    }],
    sunday: [{
        type: String
    }]
})

module.exports = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema)