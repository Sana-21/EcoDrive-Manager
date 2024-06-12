import React from "react";
import "./blockedUserModal.css";
import ListItem from "../ListItem/ListItem";

function BlockedUsersModal({ isOpen, onClose, blockedUsers, onStatusChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Blocked Users</h2>
        <div className="blocked-users-list">
          {blockedUsers.length > 0 ? (
            blockedUsers.map((user) => (
              <ListItem key={user.uid} item={user} onStatusChange={onStatusChange} />
            ))
          ) : (
            <div className="no-items">No blocked users</div>
          )}
        </div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default BlockedUsersModal;
