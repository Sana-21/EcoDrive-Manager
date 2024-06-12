import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link, Navigate } from 'react-router-dom';
import "./home-screen.css";
import List from "../../components/List/List";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useSelector, useDispatch } from 'react-redux';
import MapComponent from "../../components/Map/MapComponent"; // Import the MapComponent
import { fetchUserData } from '../../redux/userActions';
import BlockedUserModal from "../../components/BlockedUserModal/BlockedUserModal";
import axios from "axios";
function Dashboard() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const [loading, setLoading] = useState(true);


  const officeLongitude = useSelector(state => state.user.userData?.manager?.officeLocation.Longitude);
  const officeLatitude = useSelector(state => state.user.userData?.manager?.officeLocation.Latitude);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const userData = useSelector(state => state.user.userData);

  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userId]);

  const { manager } = userData;
  // const { manager } = userData;
  useEffect(() => {
    if (manager) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/user/${userId}/users`);
          if (response.data.success) {
            setUsers(response.data.users);
          }
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }
  }, [userData, userId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!userData.manager) {
    return <div>No manager data found</div>; 
  }

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.uid === userId ? { ...user, activeStatus: newStatus } : user))
    );
  };

  const activeUsers = users.filter(user => user.activeStatus === 'active');
  const blockedUsers = users.filter(user => user.activeStatus === 'banned');
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const defaultLocation = { lat: 28.7041, lng: 77.1025 };
  const selectedLocation = { lat: parseFloat(manager.officeLocation.latitude) || defaultLocation.lat, lng: parseFloat(manager.officeLocation.longitude) || defaultLocation.lng };


  return (
    <div>
      <Header showButton={false} showOptions={false} />
      <div className="dashboard-bg">
        <div className="dashboard-content">
          <div className="left-box">
            <List title={"Members"} quantity={activeUsers.length} items={activeUsers} onStatusChange={handleStatusChange} />
          </div>
          <div className="right-box">
            <div className="map-rounded-container">
            <div className="map-div ">
            <MapComponent selectedLocation={selectedLocation} zoom = {18} height = "305px"  className="map-container" />
            </div>
            </div>
            
            <div className="home-bottom">
              <div className="rounded-container bottom-col-1"onClick={openModal}>
                <div className="head-text c-head">Blocked Users</div>
                <div className="bottom-round">{blockedUsers.length}</div>
              </div>
              <div className="rounded-container bottom-col-2">
                <div className="head-text">Active Users</div>
                <div className="bottom-round active-head">{activeUsers.length}</div>
              </div>
              <div className="rounded-container bottom-col-3">
                <div className="head-text">{manager.companyName}</div>
                {manager.officeImage && (
                  <img src={manager.officeImage} alt="building" className="building-img" />
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
      <BlockedUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        blockedUsers={blockedUsers}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default Dashboard;
