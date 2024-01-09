import React from "react";
import Header from "../../components/Header/Header";
import "./home-screen.css";
import List from "../../components/List/List";
import LocationImage from "../../assets/images/map-location.png"
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import Building from "../../assets/images/building.png"
function Dashboard() {
  return (
    <div>
      <Header showButton={false} showOptions={false} />
      <div className="dashboard-bg">
        <div className="dashboard-content">
          <div className="left-box">
            <List title={"Members"} quantity={"15"} />
          </div>
          <div className="right-box">
          <img src={LocationImage} alt="location" className="location-img"/>
          <div className="change-btn"><SecondaryButton text="Change" backgroundColor="#92e3a9" /> </div>
          <div className="home-bottom">
            <div className="rounded-container bottom-col-1">
                <div className="head-text c-head">Reduced Carbon Emissions</div>
                <div className="bottom-round">40<span id = "percent">%</span></div>
            </div>

            <div className="rounded-container bottom-col-2">
                <div className="head-text">Active Users</div>
                <div className="bottom-round active-head">20</div>
            </div>

            <div className="rounded-container bottom-col-3">
                <div className="head-text">Organisation Name</div>
                <img src={Building} alt="building" className="building-img"/>
                <div className="edit-btn"><SecondaryButton text="Edit Profile" backgroundColor="#92e3a9" /> </div>
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;