import React from "react";
import "./list-item.css";
import userIcon from "../../assets/images/user-icon.png";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import CrossButton from "../../assets/images/remove-user-btn.png"

function ListItem() {
  return (
    <div className="list-item-holder">
      <div className="list-item-image-holder">
        <img src={userIcon} alt="user" className="list-item-image" />
      </div>
      <div className="list-item-details">
        <span className="list-item-name">Anonymous User</span>
        <div>
          {/* <SecondaryButton text="Users: 15" backgroundColor="#F9B7EE" /> */}
         <img src={CrossButton} alt="cross" className="list-item-image" />
        </div>
      </div>
    </div>
  );
}

export default ListItem;