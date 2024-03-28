import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link, Navigate } from 'react-router-dom';
import "./home-screen.css";
import List from "../../components/List/List";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useSelector, useDispatch } from 'react-redux';
import MapComponent from "../../components/Map/MapComponent"; // Import the MapComponent
import { fetchUserData } from '../../redux/userActions';

function Dashboard() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const [loading, setLoading] = useState(true); 


  const officeLongitude = useSelector(state => state.user.userData?.manager?.officeLongitude);
  const officeLatitude = useSelector(state => state.user.userData?.manager?.officeLatitude);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const userData = useSelector(state => state.user.userData);

  useEffect(() => {
      if (userId) {
          dispatch(fetchUserData(userId));
      }
  }, [dispatch, userId]);

   

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  
  // Check if manager data is available
  if (!userData.manager) {
    return <div>No manager data found</div>; // or handle accordingly
  }

  const defaultLocation = { lat: 28.7041, lng: 77.1025 };
  const selectedLocation = { lat: officeLatitude || defaultLocation.lat, lng: officeLongitude || defaultLocation.lng };

  return (
    <div>
      <Header showButton={false} showOptions={false} />
      <div className="dashboard-bg">
        <div className="dashboard-content">
          <div className="left-box">
            <List title={"Members"} quantity={"15"} />
          </div>
          <div className="right-box">
            <div className="map-container"> {/* Wrap MapComponent in a div to maintain UI layout */}
              {/* Pass selectedLocation to MapComponent */}
              <MapComponent selectedLocation={selectedLocation} />
            </div>
            <div className="home-bottom">
              <div className="rounded-container bottom-col-1">
                <div className="head-text c-head">Reduced Carbon Emissions</div>
                <div className="bottom-round">40<span id="percent">%</span></div>
              </div>
              <div className="rounded-container bottom-col-2">
                <div className="head-text">Active Users</div>
                <div className="bottom-round active-head">20</div>
              </div>
              <div className="rounded-container bottom-col-3">
                <div className="head-text">Organisation Name</div>
                {/* Check if userData.manager.officeImage exists before rendering the image */}
                {userData.manager.officeImage && (
                  <img src={userData.manager.officeImage} alt="building" className="building-img" />
                )}
                <div className="edit-btn">
                  <Link to="/edit">
                    <SecondaryButton text="Edit Profile" backgroundColor="#92e3a9" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Dashboard;
