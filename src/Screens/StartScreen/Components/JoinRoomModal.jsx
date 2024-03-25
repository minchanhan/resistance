import React, { useState } from "react";
import "../../../App.css";
import { Box, Button, Modal, TextField } from "@mui/material";
import "../../../data/Enums.js";

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
        
        <div style={{
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
            sx={{ m: 1.5, width: "90%", mt: 2}}
          />
          <Button onClick={joinRoom}>Join Room</Button>
        </div>
      </Box>
    </Modal>
    
  )
}

export default JoinRoomModal;