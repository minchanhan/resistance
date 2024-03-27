import React from "react";
import "./components.css";

function DisplayButton({ text="click", onClick }) {

  return (
    <button onClick={onClick} className="displayButton">
      <p style={{color: "white"}}>{text}</p>
    </button>
  );
}

export default DisplayButton;