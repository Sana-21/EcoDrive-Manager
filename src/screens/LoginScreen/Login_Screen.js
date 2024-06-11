// LoginScreen.js
import React, { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../redux/userActions";
import { setUserId } from "../../redux/userSlice";
import "./login-screen.css";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import MainButton from "../../components/MainButton/Main_Button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from "../../redux/userActions";

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const error = useSelector(state => state.user.error);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(loginUser({ email, password }));
      const userId = actionResult.payload; // Extract userId from the action payload
      console.log("handle submit");
      console.log(userId);
      await dispatch(setUserId(userId));
      await dispatch(fetchUserData(userId)); 
      navigate('/home'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        // Clear the error message after 5 seconds
        dispatch({ type: 'CLEAR_ERROR' }); // Assuming you have a clear error action
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="login-bg">
      <Header showSignUp = {true} showSignIn = {false} showOptions={true}/>
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
            <div className="login-btn-container">
              <MainButton type="submit" text="Login" />
            </div>
          </form>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default LoginScreen;
