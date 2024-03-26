import React from "react";
import "../App.css";

function UserInput({ 
  value, 
  onChange,
  helperText,
  showError
}) {

  return (
    <>
      <input
        className={`userInput ${showError ? "inputError" : ""}`}
        type="text" 
        value={value} 
        onChange={onChange}
        placeholder="Username"
      />
      {
        <div className="nameHelperText">{helperText}</div>
      }
    </>
  )
}

export default UserInput;