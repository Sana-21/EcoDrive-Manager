import "./header.css";
import logo from "../../assets/images/logo-without-title.png";
import MainButton from "../MainButton/Main_Button";
import SignUpButton from "../SignUpBtn/Signup_Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ showButton, showOptions }) {

  const condition = showButton ? (
    <div className="icon-button-container">
      <Link to = "/signup">
      <SignUpButton text="Sign Up" />
      </Link>
      <Link to = "/login">
      <MainButton text="Login" />
      </Link>
    </div>
  ) : (
    <div className="icon-button-container">
    <Link to = "/">
    <MainButton text="Sign Out" />
    </Link>
    </div>
  );

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
      
      {showOptions && (
        <nav>
          <ul className="header-list">
            <li><Link to = "/">Home </Link></li>
            <li><Link to = "/about">About  </Link></li>
            <li><Link to = "/contact">Contact </Link></li>
          </ul>
        </nav>
      )}
      {condition}
    </div>
  );
}

export default Header;
