import 'bootstrap/dist/css/bootstrap.css';
import Nav_bar from './nav_bar';
import Appliance from './appliance/appliance';
import Api_base from './api';
import Client from './client/client';
import Pov from './pov/pov';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
        <Nav_bar/>
        <Routes>
          <Route path='/client' element={<Client/>} />
          <Route path='/appliance' element={<Appliance/>} />
          <Route path='/pov' element={<Pov/>} />
        </Routes>
        
    </div>
  );
}

export default App;
