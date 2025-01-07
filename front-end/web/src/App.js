import '././userfriendly_page/App.css';

import React, { } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import InitialPage from './components/InitialPage';

import {setAuthToken} from './helpers/setAuthToken'
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import Employee from './components/Employee';
import Resident from './components/Resident';
import Room from './components/Rooms';
import CarePlanForm from './components/CarePlan';
import ContactPerson from './components/ContactPerson';
import AddContactPerson from './components/AddContactPersonForm';
import MedicalAlertPage from './components/MedicalAlert';
import AddMedicalAlert from './components/AddMedicalAlert';
import Visits from './components/Visits';
import VisitManagement from './components/VisitManagement';

function App() {
  
  const token = localStorage.getItem("token")
  if (token) {
      setAuthToken(token);
  }

  return (
    <Router>
      <Navbar/>
        <Routes>
        <Route exact path='/' element={<InitialPage/>}>
          </Route>
          <Route exact path='/login' element={<Login/>}>
          </Route>
          <Route exact path='/register' element={<Register/>}>
          </Route>
          <Route exact path='/home' element={<Home/>}> </Route>
          <Route exact path='/resident' element={<Resident/>}> </Route>
          <Route exact path='/employee' element={<Employee/>}> </Route>
          <Route exact path='/room' element={<Room/>}> </Route>
          <Route exact path='/careplan' element={<CarePlanForm/>}> </Route>
          <Route exact path='/contactperson' element={<ContactPerson/>}> </Route>
          <Route exact path='/add-contact-person' element={<AddContactPerson/>}> </Route>
          <Route exact path='/medical-alert' element={<MedicalAlertPage/>}> </Route>
          <Route exact path='/add-medical-alert' element={<AddMedicalAlert/>}> </Route>
          <Route exact path='/visits' element={<Visits/>}> </Route>
          <Route exact path='/visits-management' element={<VisitManagement/>}> </Route>
          <Route exact path='/logout' element={<Logout/>}> </Route>
        </Routes>
    </Router>
  );
  
}
export default App;
