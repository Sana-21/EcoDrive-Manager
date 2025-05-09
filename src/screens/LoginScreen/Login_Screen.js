import React from "react";
import "./login-screen.css";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import MainButton from "../../components/Main Button/Main_Button";

function LoginScreen() {
  return (
    <div class="login-bg">
      <Header showButton={false} />
      <div class="network-box">
        <img class="network-img" src={network} alt="network" />
      </div>
      <div class="login-box">
        <div class="login-title">
          <h3>Login</h3>
        </div>
        <div class="login-form">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                class="form-control"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                class="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div class="btn-container">
              <MainButton text="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;