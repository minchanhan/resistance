import React, { useState } from "react";
import "../../../App.css";
import "../../../data/Enums.js";

import { Box, Modal, TextField } from "@mui/material";
import DisplayButton from "../../../Components/DisplayButton.jsx";

function JoinRoomModal({
  socket,
  open, 
  handleJoinClose, 
  style,
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
      <Box sx={style}>
        <div style={modalHeader}>
          Enter Room Code
        </div>
        
        <div 
          style={{
          display: "flex", 
          flexDirection: "column", 
          marginTop: "0.5rem",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <TextField
            error={!validRoom && checkedRoom}
            id={!validRoom && checkedRoom ? "" : "outlined-error-helper-text"}
            label={!validRoom && checkedRoom ? "Warning" : "Room code"}
            defaultValue=""
            helperText={!validRoom && checkedRoom ? roomStatus : ""}
            onChange={ (event) => {
              setRoomCode(event.target.value);
            }}
            sx={{ m: 1.5, mt: 2}}
          />
          <DisplayButton onClick={joinRoom} text="Join Room" />
        </div>
      </Box>
    </Modal>
    
  )
}

export default JoinRoomModal;