import React from "react";
import "./header.css";
import logo from "../../assets/images/logo-without-title.png";
import MainButton from "../Main Button/Main_Button";
import SignUpButton from "../SignUpBtn/Signup_Button";

function Header({ showButton }) {
  return (
    <div className="header-bg">
        <div className="logo-container">
        <div className="logo-box">
            <img className="logo-img" src={logo} alt="logo" />
        </div>
        <div className="header-title">
            <h3>EcoDrive</h3>
        </div>
        </div>
      <nav>
      <ul className="header-list">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
     </nav>

      {showButton && (
        <div className="icon-button-container">
          <SignUpButton text= "Sign Up"/>
          <MainButton text="Login" />
        </div>
      )}
      
    </div>
  );
}

export default Header;