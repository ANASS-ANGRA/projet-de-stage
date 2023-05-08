import 'bootstrap/dist/css/bootstrap.css';
import Nav_bar from './nav_bar';
import Appliance from './appliance/appliance';
import Api_base from './api';
import Client from './client/client';
import Pov from './pov/pov';
import { Route, Routes ,Navigate } from 'react-router-dom';
import Contact from './client/contact';
import Detail_pov from './pov/detali_pov';
import Recherch from './appliance/recherch';
import Login from './login';
import { useSelector } from 'react-redux';
import SignIn from './Sign_in';



function App() {
   const token= useSelector(state=>state.utilisateur.tokens)
   const utilisateur= useSelector(state=>state.utilisateur.utilisateur)
   const isAdmin = utilisateur == "admin"
   const isAuthenticated = token !== null;
   

  return (
    <div className="App">
        <Nav_bar/>
        <Routes>
          <Route path="sinIn" element={<SignIn/>} />
          <Route path='/login' element={ <Login/>}/>
          <Route path='/clients' element={isAuthenticated  ? isAdmin ? <Client/> : <Navigate to="/pov"/> : <Navigate to="/sinIn" />} />
          <Route  path='/' element={isAuthenticated  ? isAdmin ? <Appliance/> : <Navigate to="/pov"/> : <Navigate to="/sinIn" /> } />
          <Route path='/pov' element={isAuthenticated ?  <Pov/> : <Navigate to="/login" />  } />
          <Route path='/client/info' element={isAuthenticated ? isAdmin ? <Contact/>: <Navigate to="/pov"/> : <Navigate to="/sinIn" />} />
          <Route path='/pov/detail' element={isAuthenticated ? isAdmin ? <Detail_pov/> : <Navigate to="/pov"/>  : <Navigate to="/sinIn" />} />
          <Route path='/appliance/recherch' element={isAuthenticated ? isAdmin ? <Recherch/>  : <Navigate to="/pov" /> :<Navigate to="/sinIn" />} />
        </Routes>
        
    </div>
  );
}

export default App;
