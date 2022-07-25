import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import History from "./components/History";
import Input from "./components/input";
import LaunchDetail from "./components/launchDetails";
function App() {
  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Input
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/launch">
            Launch Detail
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/history">
            History
          </a>
        </li>
        
      </ul>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input/>}/>
          <Route path="/launch"element={<LaunchDetail/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
      </BrowserRouter>     
    </>
  );
}
export default App;
