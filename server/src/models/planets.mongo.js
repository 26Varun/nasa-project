const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
    keplerName:{
        type:String,
        require:true
    }
});

const planetsModel = mongoose.model('Planet',planetSchema)



module.exports = planetsModel