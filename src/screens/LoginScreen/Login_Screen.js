// LoginScreen.js
import React, { useState } from "react";
// // import { useDispatch } from 'react-redux';
// import { setUserId } from '../../path/to/actions';
import axios from 'axios';
import "./login-screen.css";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import MainButton from "../../components/MainButton/Main_Button";

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:3001/api/manager/login", { email, password });
  //     const { userId } = response.data;
  //     dispatch(setUserId(userId));
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };

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
          <form>
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
