const http = require('http');
const app = require('./app');
const { loadData } = require('./models/planets.model');
const {mongoConnect} = require('./services/mongo')


const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function initalFun(){
    await mongoConnect();
    await loadData();
    server.listen(PORT,()=>{
        console.log(`Server has started on ${PORT}`)
    })
}
initalFun()

//using this for web socket