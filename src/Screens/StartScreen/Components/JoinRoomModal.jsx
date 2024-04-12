import React, { useEffect, useState } from "react";
import "./joinRoom.css";

import { Modal } from "@mui/material";
import DisplayButton from "../../../Components/DisplayButton.jsx";
import UserInput from "../../../Components/UserInput.jsx";

function JoinRoomModal({
  open, 
  handleJoinClose,
  room="",
  joinRoom,
  isValidRoom,
  setIsValidRoom,
  roomStatus,
  setRoomStatus
}) {
  const [checkedRoom, setCheckedRoom] = useState(false);
  const [enteredRoomCode, setEnteredRoomCode] = useState("");

  const joinRoom = () => {
    setCheckedRoom(true);
    if (enteredRoomCode.length !== 5) {
      setIsValidRoom(false);
      setRoomStatus("Room code must be 5 chars");
    } else {
      joinRoom(enteredRoomCode);
    }
  };

  useEffect(() => {
    setEnteredRoomCode(room);
  }, [room])

  return (
    <Modal
      open={open}
      onClose={handleJoinClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div 
        className="modalBox" 
        style={{width: "80%", maxWidth: "25rem"}}
      >
        <div className="modalHeader" style={{fontSize: "x-large"}}>
          Enter Room Code
        </div>
        
        <div className="joinRoom">
          <UserInput
            value={enteredRoomCode} 
            onChange={ (event) => {
              setEnteredRoomCode(event.target.value);
            }}
            onPaste={(event) => {
              const pastedVal = event.clipboardData.getData('text/plain');

              if (pastedVal.length !== 5) {
                event.preventDefault();
                return false;
              }
            }}
            helperText={!isValidRoom && checkedRoom ? roomStatus : ""}
            showError={!isValidRoom && checkedRoom}
            placeholder="Room Code"
          />
          <DisplayButton onClick={joinRoom} text="Join Room" />
        </div>
      </div>
    </Modal>
    
  )
}

export default JoinRoomModal;