import React from "react";
import "../App.css";

function DisplayButton({ text="click", onClick }) {

  return (
    <button onClick={onClick} className="displayButton">
      {text}
    </button>
  )
}

export default DisplayButton;