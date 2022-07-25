import {useState,useEffect} from 'react'

function LaunchDetail() {
  const [launches,setLaunches] = useState([]);
  const [abort,setAbort] = useState(false);
  useEffect(() => {
    fetch('http://localhost:8000/v1/launches').then(response=>{
      return response.json()
      
    })
    .then(data=>{
      setLaunches(data);
    })
  }, [])
  
  useEffect(() => {
    fetch('http://localhost:8000/v1/launches').then(response=>{
      return response.json()
      
    })
    .then(data=>{
      setLaunches(data);
    })
  }, [abort])
  

  function abortMission(flightNum){
    fetch('http://localhost:8000/abortMission/'+flightNum,{
      method:'DELETE',
      headers:{
        "Content-Type":"application/json"
      }
    }).then(response=>{
      return response.json()
    }).then(data=>{ 
      setAbort(true)
    })
  }
  return (
    <>
      <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">No.</th>
            <th scope="col">Date</th>
            <th scope="col">Mission</th>
            <th scope="col">Rocket</th>
            <th scope="col">Customers</th>
          </tr>
        </thead>
        <tbody>
            {launches.map((launch,key)=>{
      return <tr key={key}>
        <td><input type="checkbox" defaultChecked={launch.upcoming} onChange={()=>abortMission(launch.flightNum)}/></td>
        <td>{launch.flightNum}</td>
        <td>{new Date(launch.launchDate).toDateString()}</td>
        <td>{launch.missionName}</td>
        <td>{launch.rocketType}</td>
        <td>{launch.customer.join(', ')}</td>
      </tr>
    })}
        </tbody>
      </table>
      </div>
    </>
  );
}
export default LaunchDetail;
