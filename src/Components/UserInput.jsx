import React from "react";
import "./components.css";

function UserInput({ 
  value, 
  onChange,
  helperText,
  showError
}) {

  return (
    <div className="usernameField">
      <input
        className={`usernameInput ${showError ? "inputError" : ""}`}
        type="text" 
        value={value} 
        onChange={onChange}
        placeholder="Username"
      />
      {
        <div className="nameHelperText">{helperText}</div>
      }
    </div>
  )
}

export default UserInput;