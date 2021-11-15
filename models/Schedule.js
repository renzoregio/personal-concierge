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
    wednesday: [
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
    thursday: [
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
    friday: [
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