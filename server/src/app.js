const express = require('express');

const cors = require('cors')
const jsonData = require('../data/data.json')
const path = require('path')
const app = express();
const fs = require('fs')
const morgan = require('morgan');
const api = require('./routes/api');

app.use(cors({
    origin:'http://localhost:3001'       // security
}));

app.use(morgan('combined'));             //log
app.use('/v1',api)
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")))



app.get('/getjsondata',(req,res)=>{
    res.send(jsonData)
})
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})

module.exports = app;