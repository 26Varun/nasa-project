const launchesModel = require('./launches.mongo');
const { getAllPlanetsModel } = require('./planets.model');

const launches = new Map();

let lastestFlightNum = 100
const launch = {
    flightNum:100,
    missionName:"Kepler Explo X",
    rocketType:'exporer IS1',
    launchDate:new Date('04/04/2006'),
    destination:"kepler-442 b",
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}
launches.set(launch.flightNum,launch);

async function getAllLaunchesModel(){
    return await launchesModel.find({upcoming:true},'-_id -__v')

}
async function getLatestFlightNum(){
    //const latestLaunch = await launchesModel.find({$max:"flightNum"})
    
    const latestLaunch = await launchesModel.findOne().sort("-flightNum")
    if(!latestLaunch){
        return 100  
    }
    return latestLaunch.flightNum +1
}
function getHistoryDetail(){
    return Array.from(launches.values())
}
async function removeMission(flightNum){
    const abortResponse =  await launchesModel.update({flightNum},{success:false,upcoming:false})
    console.log("Abort",abortResponse)
    if(abortResponse.modifiedCount === 1){
        return{
            "Message":"SuccessFully Aborted"
        }
    }
    else{
        throw new Error("Abort was not possible")
    }
}
async function doeskeyExist(flightNum){
    return await launchesModel.findOne({flightNum})
}
async function addNewLaunch(newLaunch){
    
    let finalLaunch = {
        ...newLaunch,
        flightNum:await getLatestFlightNum(),
        launchDate:new Date(newLaunch.launchDate),
        upcoming:true,
        customer:['Zero to Mastery','NASA'],
        success:true,
    }
    // const allPlanets = await getAllPlanetsModel()
    // if(allPlanets.includes(finalLaunch.destination)){
    //     return await launchesModel.create(finalLaunch)
    // }
    // else{
    //     return {
    //         Error: `Planet ${finalLaunch.destination} not in DB`
    //         }
    // }
    const newLaunc = await launchesModel.updateOne({
        flightNum:finalLaunch.flightNum
    },finalLaunch,{
        upsert:true
    })
    console.log("FindOneupdate",newLaunc)
    
}
module.exports = {getAllLaunchesModel,addNewLaunch,removeMission,doeskeyExist,getHistoryDetail}