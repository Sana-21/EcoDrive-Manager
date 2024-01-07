import React from "react";
import "./signup_button.css";

function SignUpButton({ text, onClick }) {
  return (
    <button className="btn btn-primary signup-btn" onClick={onClick}>
      {text}
    </button>
  );
}

export default SignUpButton;