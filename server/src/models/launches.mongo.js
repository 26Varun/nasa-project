const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    flightNum: {
        type:Number,
        required: true,
    },
    missionName:  {
        type:String,
        required:true,
    },
    rocketType:  {
        type:String,
        required:true,
    },
    launchDate: {
        type:Date,
        required:true,
    },
    destination: {
        type:String,
        required:true,
    },
    customer:[String],
    upcoming:  {
        type:Boolean,
        required:true,
    },
    success:  {
        type:Boolean,
        required:true,
        default: true,
    },
})

// collection will be launches
const launchesModel = mongoose.model('Launch',launchesSchema)

module.exports = launchesModel