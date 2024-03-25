// LoginScreen.js
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../redux/userActions";
import "./login-screen.css";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import MainButton from "../../components/MainButton/Main_Button";

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); // Pass an object with email and password
    navigate('/home');
  };
  
  return (
    <div className="login-bg">
      <Header showButton={true} showOptions={true}/>
      <div className="network-box">
        <img className="network-img" src={network} alt="network" />
      </div>
      <div className="login-box">
        <div className="login-title">
          <h3>Login</h3>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Domain Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="btn-container">
              <MainButton type="submit" text="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
