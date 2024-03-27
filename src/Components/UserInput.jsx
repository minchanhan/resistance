import React from "react";
import "./components.css";

function UserInput({ 
  value, 
  onChange,
  helperText,
  showError,
  placeholder,
  extraStyle={},
}) {

  return (
    <div className="userInputField">
      <input
        className={`userTextInput ${showError ? "inputError" : ""}`}
        type="text" 
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        style={extraStyle}
      />
      {
        <div className="nameHelperText">{helperText}</div>
      }
    </div>
  )
}

export default UserInput;