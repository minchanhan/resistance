import React, { useState } from "react";

function MenuBox() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // no refresh
  }


  return (
    <div>
      <div className="menu">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Enter Username"
            required
          />
          <div align="center">
            <button type="submit" className="startButton">
              <span>Join With Code</span>
            </button>
          </div>
          <div align="center">
            <button type="submit" className="startButton">
              <span>Create Lobby</span>
            </button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default MenuBox;