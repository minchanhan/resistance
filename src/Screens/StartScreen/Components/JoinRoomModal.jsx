import React, { useState } from "react";
import "./joinRoom.css";
import "../../../data/Enums.js";

import { Box, Modal } from "@mui/material";
import DisplayButton from "../../../Components/DisplayButton.jsx";
import UserInput from "../../../Components/UserInput.jsx";

function JoinRoomModal({
  socket,
  open, 
  handleJoinClose, 
  modalStyle,
  modalHeader
}) {
  const [checkedRoom, setCheckedRoom] = useState(false);
  const [validRoom, setValidRoom] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [roomStatus, setRoomStatus] = useState("");

  const joinRoom = () => {
    setCheckedRoom(true);
    socket.emit("join_room", roomCode);
  };

  socket.on("room_with_code", (data) => {
    setValidRoom(data.exists);
    setRoomStatus(data.reason);
  });

  return (
    <Modal
      open={open}
      onClose={handleJoinClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...modalStyle, width: "25rem"}}>
        <div style={{...modalHeader, fontSize: "x-large"}}>
          Enter Room Code
        </div>
        
        <div className="joinRoom">
          <UserInput
            value={roomCode} 
            onChange={ (event) => {
              setRoomCode(event.target.value);
            }}
            helperText={!validRoom && checkedRoom ? roomStatus : ""}
            showError={!validRoom && checkedRoom}
            placeholder="Room Code"
          />
          <DisplayButton onClick={joinRoom} text="Join Room" />
        </div>
      </Box>
    </Modal>
    
  )
}

export default JoinRoomModal;