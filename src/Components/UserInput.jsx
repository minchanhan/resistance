import React from "react";
import "./components.css";

function UserInput({ 
  value, 
  onChange,
  onPaste,
  helperText,
  showError,
  placeholder,
  inputStyle={},
}) {

  return (
    <div className="userInputField">
      <input
        className={`userTextInput ${showError ? "inputError" : ""}`}
        type="text" 
        value={value} 
        onChange={onChange}
        onPaste={onPaste}
        placeholder={placeholder}
        style={inputStyle}
      />
      {
        <div className="nameHelperText">{helperText}</div>
      }
    </div>
  )
}

export default UserInput;