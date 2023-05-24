import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link
} from "react-router-dom";

import { useNavigate} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import InitialPage from './components/InitialPage';

import {setAuthToken} from './helpers/setAuthToken'
import Docs from './components/User';
import TripPage from './components/Resident';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import User from './components/User';
import ResidentPage from './components/Resident';

function App() {

  const token = localStorage.getItem("token");
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
          <Route exact path='/resident' element={<ResidentPage/>}> </Route>
          <Route exact path='/user' element={<User/>}> </Route>
          <Route exact path='/logout' element={<Logout/>}> </Route>
        </Routes>
    </Router>
  );
  
}
export default App;
