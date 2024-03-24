import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/Login_Screen';
import WelcomeScreen from './screens/WelcomeScreen/Welcome_Screen';
import HomeScreen from './screens/HomeScreen/Home_Screen'
import SignUpScreen from "./screens/SignUpScreen/Signup_Screen";
import AboutPage from './screens/About/About';
import ContactPage from './screens/Contact/Contact';
import MapComponent from './components/Map/MapComponent';
import EditScreen from './screens/EditProfile/Edit_Screen';
import React, { useState, useEffect } from "react";
function App() {

   const [selectedLocation, setSelectedLocation] = useState({
      lat: 28.7041,
      lng: 77.1025,
  });


 return(
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element ={<WelcomeScreen/>} />
    <Route path="/home" element={<HomeScreen/>} />
    <Route path="/login" element={<LoginScreen/>} />
    <Route path="/signup" element={<SignUpScreen/>} />
    <Route path="/about" element={<AboutPage/>} />
    <Route path="/contact" element={<ContactPage/>} />
    <Route path="/edit" element={<EditScreen/>} />
    <Route path="/map" element={<MapComponent selectedLocation={selectedLocation}/>} />
    </Routes>
    </BrowserRouter>
 );
}

export default App;
