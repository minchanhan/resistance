import React from "react";
import "./components.css";

function DisplayButton({ text="click", onClick, disabled=false, btnStyle={} }) {

  return (
    <button 
      onClick={onClick} 
      className="displayButton" 
      disabled={disabled} 
      style={btnStyle}
    >
      <p style={{color: "white"}}>{text}</p>
    </button>
  );
}

export default DisplayButton;