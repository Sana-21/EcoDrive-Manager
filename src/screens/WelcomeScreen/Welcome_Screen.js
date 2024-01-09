import React from "react";
import Header from "../../components/Header/Header";
import HomeNetwork from "../../assets/images/network-image-home.jpg";
import PhoneImage from "../../assets/images/iphone.png";
import AppStoreImage from "../../assets/images/app-store.png";
import PlaystoreImage from "../../assets/images/google-play.png";
import BlueImage from "../../assets/images/bluebox.png";
import GreenImage from "../../assets/images/greenbox.png";
import "./welcome_screen.css";
function WelcomeScreen() {
  return (
    <div>
      <Header showButton={true} showOptions={true} />
      <div className="home-bg welcome-page">
        <div class="network-box">
              <div className = "home-text">
                <div className="home-heading">
                A Green Ride Sharing 
                Platform
                </div>
                <div className="home-description">
                Discover the future of carpooling for organizations–
                reducing emissions, easing congestion, and strengthening connections.
                </div>
              </div>
              <img class="network-img" src={HomeNetwork} alt="network" />
        </div>
        <div className="phone-content">
          <div>
          <img className="phone-img" src={PhoneImage} alt="iphone image" />
          <img className="blue-img" src={BlueImage} alt="image" />
          <img className="green-img" src={GreenImage} alt="image" />
          </div>
          <div className="download-btns">
          <img className="appstore-img" src={AppStoreImage} alt="iphone image" />
          <img className="playstore-img" src={PlaystoreImage} alt="iphone image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;