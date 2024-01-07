import React from "react";
import "./main_button.css";

function MainButton({ text, onClick }) {
  return (
    <button className="btn btn-primary main" onClick={onClick}>
      {text}
    </button>
  );
}

export default MainButton;