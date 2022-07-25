const mongoose = require('mongoose')

const password = 'udeplQ79s5vWHAqZ'
const MONGO_URL = `mongodb+srv://nasa-api:${password}@nasacluster.ayh886e.mongodb.net/nasa?retryWrites=true&w=majority`

mongoose.connection.once('open',()=>{
    console.log("MongoDB connection ready!")
})
mongoose.connection.on('error',(err)=>{
    console.error(err)
})
async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}
async function mongoDisconnect(){
    await  mongoose.disconnect();
}
module.exports = {mongoConnect, mongoDisconnect}