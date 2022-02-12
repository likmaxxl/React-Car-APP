import CarApp from './components/CarApp'
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplaySingleCar from './components/DisplaySingleCar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<CarApp/>}/>
      <Route path="/singleCar/:id" element={<DisplaySingleCar/>}/>
      </Routes>
    </Router>


    </div>
  );
}

export default App;
