import React from "react";
import "./list-item.css";
import userIcon from "../../assets/images/user-icon.png";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import CrossButton from "../../assets/images/remove-user-btn.png"
import TickButton from "../../assets/images/tick-icon.png"
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"; 
import { useState } from "react";
import axios from "axios";



function ListItem({ item, onStatusChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async () => {
    const newStatus = item.activeStatus === 'active' ? 'banned' : 'active';
    try {
      const response = await axios.patch(`http://localhost:3001/api/user/${item.uid}/status`, { status: newStatus });
      if (response.data.success) {
        onStatusChange(item.uid, newStatus);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmStatusChange = () => {
    handleStatusChange();
    closeModal();
  };

  return (
    <div className="list-item-holder">
      <div className="list-item-image-holder">
        <img src={item.imageUri || userIcon } alt="user" className="list-item-image" />
      </div>
      <div className="list-item-details">
        <span className="list-item-name">{item.name}</span>
      </div>
      <div className="list-item-cross-image-holder">
        <img  src={item.activeStatus === 'active' ? CrossButton : TickButton}
          alt={item.activeStatus === 'active' ? "ban user" : "unban user"}
          onClick={openModal}
          className={item.activeStatus === 'active' ? "cross-image" : "tick-image"}/>
       </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmStatusChange}
        message={`Are you sure you want to change the status of ${item.name || 'this user'}?`}
      />
    </div>
  );
}

export default ListItem;