const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    runningFixedTotal: {
        type: Number,
        default: 0
    },
    runningTotal: {
        type: Number,
    }, 
    runningPercentage: {
        type: Number,
    },
    runningFoodCount: {
        type: Number,
        default: 0
    },
    runningCarCount: {
        type: Number,
        default:0 ,
    },
    runningShoppingCount: {
        type: Number,
        default: 0
    },
    runningGroceryCount: {
        type: Number,
        default: 0
    },
    runningMiscCount: {
        type: Number,
        default: 0
    },
    user: String
})

module.exports = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)