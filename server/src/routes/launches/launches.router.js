const express = require('express');
const { getAllLaunches, sendnewLaunch, abortMission, getHistory } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches',getAllLaunches)
launchesRouter.post('/addNewLaunch',sendnewLaunch)
launchesRouter.delete('/abortMission/:flightNum',abortMission)
launchesRouter.get('/history',getHistory)
module.exports = launchesRouter