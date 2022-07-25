import {useEffect,useState} from 'react'
function History(){
  useEffect(() => {
    fetch('http://localhost:8000/v1/history').then(response=>{
      return response.json()
      
    })
    .then(data=>{
      setLaunches(data);
    })
  }, [])
  
  const [launches,setLaunches] = useState([]);

    return(
        <>
      <div className="container">
      <table className="table">
        <thead>
          <tr>
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
        <td><input type="checkbox" /></td>
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
    )
}
export default History