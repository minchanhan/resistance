import React, { useEffect, useState } from "react";
import "./joinRoom.css";

import { Modal } from "@mui/material";
import DisplayButton from "../../../Utils/DisplayButton.jsx";
import UserInput from "../../../Utils/UserInput.jsx";

function JoinRoomModal({
  open, 
  handleJoinClose,
  room="",
  joinRoom,
  joinRoomMsg,
  setJoinRoomMsg
}) {
  const [checkedRoom, setCheckedRoom] = useState(false);
  const [enteredRoomCode, setEnteredRoomCode] = useState("");

  const handleJoinRoom = () => {
    setCheckedRoom(true);
    if (enteredRoomCode.length !== 6) {
      setJoinRoomMsg("Room code must be 6 chars");
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

              if (pastedVal.length !== 6) {
                event.preventDefault();
                return false;
              }
            }}
            helperText={joinRoomMsg}
            showError={joinRoomMsg !== "" && checkedRoom}
            placeholder="Room Code"
          />
          <DisplayButton onClick={handleJoinRoom} text="Join Room" />
        </div>
      </div>
    </Modal>
    
  )
}

export default JoinRoomModal;