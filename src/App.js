import 'bootstrap/dist/css/bootstrap.css';
import Nav_bar from './nav_bar';
import Appliance from './appliance/appliance';
import Api_base from './api';
import Client from './client/client';
import Pov from './pov/pov';
import { Route, Routes } from 'react-router-dom';
import Contact from './client/contact';
import Detail_pov from './pov/detali_pov';



function App() {
  return (
    <div className="App">
        <Nav_bar/>
        <Routes>
          <Route path='/clients' element={<Client/>} />
          <Route  path='/' element={<Appliance/>} />
          <Route path='/pov' element={<Pov/>} />
          <Route path='/client/info' element={<Contact/>} />
          <Route path='/pov/detail' element={<Detail_pov/>} />
        </Routes>
        
    </div>
  );
}

export default App;
