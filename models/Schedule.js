const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true
    },
    monday: [
        {
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
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
    saturday: [
        {
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ],
    sunday: [
        { 
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema)