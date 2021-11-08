const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    runningFixedTotal: {
        type: Number,
        required: true,
    },
    runningTotal: {
        type: Number,
        required:true,
    }, 
    runningPercentage: {
        type: Number,
        required: true,
        default: 100
    },
    runningFoodCount: {
        type: Number,
        required: true,
        default: 0
    },
    runningCarCount: {
        type: Number,
        required: true,
        default:0 ,
    },
    runningShoppingCount: {
        type: Number,
        required: true,
        default: 0
    },
    runningGroceryCount: {
        type: Number,
        required: true,
        default: 0
    },
    runningMiscCount: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)