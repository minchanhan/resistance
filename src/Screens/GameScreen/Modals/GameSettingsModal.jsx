import React from "react";
import { Modal } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "../../../App.css";

function GameSettingsModal({
  isAdmin,
  curNumPlayers,
  capacity,
  onChangedCapacity,
  selectionSecs,
  onChangedSelectionSecs,
  privateRoom,
  onChangedPrivateRoom,
  openSettings,
  setOpenSettings
}) {
  const capacityMenuItems = [5,6,7,8,9,10];
  const selectionTimeItems = [1,3,5,7,10,15,30];

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  return (
    <Modal
      open={openSettings}
      onClose={handleSettingsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox" style={{ minWidth: "35%" }}>
        <div className="modalHeader" style={{fontSize: "x-large"}}>
          Game Settings
          <CloseIcon 
            className="closeModal" 
            onClick={handleSettingsClose} 
          />
        </div>
        
        <div className="modalContent">
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
              value={selectionSecs/60}
              onChange={(event) => {
                onChangedSelectionSecs(parseInt(event.target.value)*60);
              }}
              disabled={!isAdmin}
              style={{
                cursor: !isAdmin ? "not-allowed" : ""
              }}
            >
              {
                selectionTimeItems.map(function(val, i) {
                  return <option key={i} value={val}>{val} mins</option>
                })
              }
            </select>
          </div>
      
          <div 
            className="privRoomSettingsContainer" 
            style={{backgroundColor: !isAdmin ? "var(--disabled-priv-bg)" : ""}}
          >
            <label 
              className="privRoom" 
              style={{
                color: !isAdmin ? "var(--disabled-priv-text)" : "",
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
                  backgroundColor: !privateRoom ? "var(--disabled-priv-text)" : "",
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
  )
}

export default GameSettingsModal;
