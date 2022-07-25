const {getAllLaunchesModel, addNewLaunch, removeMission, doeskeyExist, getHistoryDetail} = require("../../models/launches.model")

async function getAllLaunches(req,res){
    return res.status(200).json(await getAllLaunchesModel());
   
}
async function sendnewLaunch(req,res){
    let newLaunch = req.body;
    if(!newLaunch.launchDate){
        let err = new Error();
        err.message = "Enter a valid Data"
        throw err       
    }
    await addNewLaunch(newLaunch)
    return res.status(201).json(newLaunch)
}
function getHistory(req,res){
    return res.status(200).json(getHistoryDetail())
}
async function abortMission(req,res){
    let flightNum = Number(req.params.flightNum)
    const existLaunch = await doeskeyExist(flightNum)
    if(existLaunch){
        return res.status(200).json(await removeMission(flightNum))
    }
    else{
        return res.status(404).json({
            Error:"Flight Doesnot Exist! Enter a valid Flight Number"
        })
    }
    
}
module.exports={getAllLaunches,sendnewLaunch,abortMission,getHistory}