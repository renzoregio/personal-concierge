const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true
    },
    monday: [
        {startTime: { type: String }, endTime: { type: String }, title: { type: String}}
    ],
    tuesday: [
        { 
            startTime: String,
            endTime: String,
            title: String
        }
    ],
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
    sunday: [
        { 
            startTime: String,
            endTime: String,
            title: String
        }
    ]
})

module.exports = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema)