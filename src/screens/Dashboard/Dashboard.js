import React from "react";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import "./dashboard.css";
function Dashboard() {
  return (
    <div>
      <Header showButton={true} />
      <div className="dashboard-bg">
        <div className="dashboard-content">
            <div class="network-box">
            <img class="network-img" src={network} alt="network" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;