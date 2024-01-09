import React from "react";
import PropTypes from "prop-types";
import "./secondary-button.css";

function SecondaryButton({ text, backgroundColor, width }) {
  const buttonStyle = {
    backgroundColor,
    width: width || "130px",
  };

  return (
    <button className="secondary-button" style={buttonStyle}>
      {text}
    </button>
  );
}

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
};

SecondaryButton.defaultProps = {
  backgroundColor: "#e0e0e0",
  width: "130px",
};

export default SecondaryButton;