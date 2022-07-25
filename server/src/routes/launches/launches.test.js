const request = require('supertest');
const app = require('../../app');
const {mongoConnect,mongoDisconnect} = require('../../services/mongo')

describe("Launches API",()=>{
    beforeAll(async()=>{
        await mongoConnect()
    });
    afterAll(async()=>{
        await mongoDisconnect()
    })
    describe('Test GET /launches',()=>{
        test('It should respond with 200 success',async ()=>{
            const response = await request(app)
            .get('/launches')
            .expect('Content-Type',/json/)
            .expect(200);
        })
    })
    
    describe('Test POST /launch',()=>{
        let input = {
            missionName:"Kepler Explo X",
            rocketType:'exporer IS1',
            launchDate:'January 1,2993',
            destination:"kepler-62 f",
        }
        let inputWithOutDate = {
            missionName:"Kepler Explo X",
            rocketType:'exporer IS1',
            destination:"kepler-62 f",
        }
        test('It should respond with 200 success',async()=>{
            const response = await request(app)
            .post('/addNewLaunch')
            .send(input)
            .expect('Content-Type',/json/)
            .expect(201)
    
            let requestDate = new Date(input.launchDate);
            let responseDate = new Date(response.body.launchDate);
    
            expect(requestDate).toStrictEqual(responseDate)
            expect(response.body).toMatchObject(inputWithOutDate)
        })
    
        // test('It should catch missing required',async()=>{
        //     const response = await request(app)
        //     .post('/addNewLaunch')
        //     .send(inputWithOutDate)
            
        //     expect(response.body).toMatchObject({
        //         "name":"err",
        //         "message":"Enter a valid Dat a"
        //     })
        // })
    })
    
})
