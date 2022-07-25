const fs = require('fs')
const path = require('path')
const {parse} = require('csv-parse')
const planetsModel = require('./planets.mongo')


const isHabitablePlanet = (planet)=>{
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 
    && planet['koi_insol'] <1.11 && planet['koi_prad'] < 1.6;
}
function loadData(){
    new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname,'..','..','data','keplar_data.csv'))
    .pipe(parse({
        comment:'#',
        columns:true
    }))
    .on('data',async (chunk)=>{
        if(isHabitablePlanet(chunk)){         
            await savePlanet(chunk)                                     
        }            
    })
    .on('end',async()=>{
        let planets = await getAllPlanetsModel()
        console.log(`Total ${planets.length} planets are habitable`)
    })
    resolve()
    })
}
async function getAllPlanetsModel(){
    let allPlanets = []
    const planets = await planetsModel.find({},'keplerName -_id')
    planets.forEach(planet=>{
        allPlanets.push(planet["keplerName"])
    })
   return allPlanets
}
async function savePlanet(planet){
    try{
        const response = await planetsModel.updateOne(
            {keplerName:planet["kepler_name"]},
            {keplerName:planet["kepler_name"]},
            {upsert:true})
        console.log("Update Response",response)
    }
    catch(err){
        console.error(`Could Not Save the Planet ${err}`)
    }
}
module.exports = {getAllPlanetsModel,loadData}