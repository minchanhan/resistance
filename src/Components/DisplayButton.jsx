import React from "react";
import "./components.css";

function DisplayButton({ text="click", onClick }) {

  return (
    <button onClick={onClick} className="displayButton">
      {text}
    </button>
  )
}

export default DisplayButton;