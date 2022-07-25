import { useEffect, useState } from "react";
import Axios from 'axios'
function Input(){
    useEffect(() => {
        fetch("http://localhost:8000/v1/planets")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setplanets(data);
          });
      },[0]);
      const [planets, setplanets] = useState([]);

      const submit = async (e)=>{
        e.preventDefault();
        console.log("Event",e);
        let newLaunchDetails = {}
        const data = new FormData(e.target)
        let launchDate = data.get('launchDate')
        let missionName = data.get('missionName')
        let rocketType = data.get('rocketType')
        let destination = data.get('destination')
        newLaunchDetails = {launchDate,missionName,rocketType,destination}
        //console.log("Detail",JSON.stringify(newLaunchDetails))
        Axios.post('http://localhost:8000/addNewLaunch',newLaunchDetails).then(response=>{
          console.log("Response",response.data)
        }).catch(err=>{
          console.log("Error",err)
        })
        // await fetch('http://localhost:8000/addNewLaunch',{
        //   body:JSON.stringify(newLaunchDetails),
        //   method:'POST',
        //   headers:{
        //     "Content-Type":"application/json"
        //   }
          
        // }).then(response=>{
        //   return response.json()
        // }).then(data=>{
        //   console.log("Successfully added",data)
        // }).catch(err=>{
        //   console.log("Error",err)
        // })
      }
    return(
      <div className="container">
        <br/><br/><br/>
        <form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-2 text-end"><label>Launch Date</label></div>
          <div className="col-lg-3">
              <input type="date" className="form-control" id="launchDate" name="launchDate"/>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-lg-2 text-end"><label>Mission Name</label></div>
          <div className="col-lg-3">
            <input type="text" className="form-control" id="missionName" name="missionName"/>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-lg-2 text-end"><label>Rocket type</label></div>
          <div className="col-lg-3">
            <input type="text" className="form-control" id="rocketType" name="rocketType"/>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-lg-2 text-end"><label>Kapler-Name</label></div>
          <div className="col-lg-3">
          <select className="form-select" id="destination" name="destination">
          <option value="">Select Keplar Name</option>

          {planets.map((item,i) => {
            return <option key={i} value={item}>{item}</option>;
          })}
        </select>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-lg-12">
            <button className="btn btn-success" >Launch Mission</button>
          </div>
        </div>
        </form>
      </div>     
    )
}
export default Input