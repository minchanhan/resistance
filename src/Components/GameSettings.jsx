import React, { useState } from "react";
import "../App.css";
import "../data/Enums.js";
import DisplayButton from "./DisplayButton.jsx";
import CheckIcon from '@mui/icons-material/Check';
import { Modal } from "@mui/material";

function GameSettings({
  capacity,
  curNumPlayers,
  onChangedCapacity,
  selectionTime,
  onChangedSelectionTime,
  privateRoom,
  onChangedPrivateRoom,
  isAdmin,
  startGame
}) {

  const capacityMenuItems = [5,6,7,8,9,10];

  const [openSettings, setOpenSettings] = useState(false);
  const handleSettingsClose = () => {
    setOpenSettings(false);
  };
  
  return (
    <div className="gameSettings">
      <DisplayButton
        onClick={() => {
          setOpenSettings(true);
        }} 
        text="Open Settings"
        btnStyle={{fontSize: "1rem", height: "3rem", width: "10rem", margin: "1rem"}}
      />

      <DisplayButton
        onClick={() => {
          startGame();
        }} 
        text="Start Game"
        disabled={curNumPlayers < capacity || !isAdmin}
        btnStyle={{fontSize: "1rem", height: "3rem", width: "10rem", margin: "1rem"}}
      />

      <Modal
        open={openSettings}
        onClose={handleSettingsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalBox" style={{width: "80%", maxWidth: "25rem"}}>
          <div className="modalHeader" style={{fontSize: "x-large"}}>
            Game Settings
          </div>
          
          <div className="settingsModalContent">
            <div className="settingsSelectContainer">
              <p>Number of Players</p>
              <select
                className="selectBox"
                value={capacity}
                onChange={(event) => {
                  onChangedCapacity(parseInt(event.target.value));
                }}
                disabled={!isAdmin}
                style={{
                  cursor: !isAdmin ? "not-allowed" : ""
                }}
              >
                {
                  capacityMenuItems.map(function(val, i) {
                    return <option key={i} value={val} disabled={val < curNumPlayers}>{val} players</option>
                  })
                }
              </select>
            </div>

            <div className="settingsSelectContainer">
              <p>Team Select Time</p>
              <select
                className="selectBox"
                value={selectionTime}
                onChange={(event) => {
                  onChangedSelectionTime(parseInt(event.target.value))
                }}
                disabled={!isAdmin}
                style={{
                  cursor: !isAdmin ? "not-allowed" : ""
                }}
              >
                  <option value={1}>1 min</option>
                  <option value={3}>3 min</option>
                  <option value={5}>5 min</option>
                  <option value={7}>7 min</option>
                  <option value={10}>10 min</option>
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
              </select>
            </div>
        
            <div 
              className="privRoomSettingsContainer" 
              style={{backgroundColor: !isAdmin ? "#d08c54" : ""}}
            >
              <label 
                className="privRoom" 
                style={{
                  color: !isAdmin ? "#e0dcdc" : "",
                  cursor: !isAdmin ? "not-allowed" : ""
                }}
              >
                Private Room
                <input
                  type="checkbox" 
                  checked={privateRoom} 
                  onChange={(event) => {
                    onChangedPrivateRoom();
                  }}
                  disabled={!isAdmin}
                />
                <span 
                  className="checkbox" 
                  style={{
                    backgroundColor: !isAdmin ? "#e0dcdc" : "",
                    cursor: !isAdmin ? "not-allowed" : ""
                  }}
                >
                  {
                    privateRoom ? <CheckIcon fontSize="x-small" /> : <></>
                  }
                </span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default GameSettings;