import React, { useState } from "react";
import "../../../App.css";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import "../../../data/Enums.js";

function JoinRoomModal({
  socket,
  open, 
  handleJoinClose, 
}) {
  const [checkedRoom, setCheckedRoom] = useState(false);
  const [validRoom, setValidRoom] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [roomStatus, setRoomStatus] = useState("");

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const joinRoom = () => {
    setCheckedRoom(true);
    socket.emit("join_room", roomCode);
  };

  socket.on("room_with_code", (data) => {
    setValidRoom(data.exists);
    setRoomStatus(data.reason);
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleJoinClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" color="var(--main-text-color)">
            Enter Room Code
          </Typography>
          
          <Grid container direction="column">
            <Grid item alignItems="flex-end" xs>
            <TextField
              error={!validRoom && checkedRoom}
              id={!validRoom && checkedRoom ? "" : "outlined-error-helper-text"}
              label={!validRoom && checkedRoom ? "Warning" : "Room code"}
              defaultValue=""
              helperText={!validRoom && checkedRoom ? roomStatus : ""}
              onChange={ (event) => {
                setRoomCode(event.target.value);
              }}
              sx={{ m: 1.5, minWidth: 200, mt: 0}}
            />
            </Grid>
            
            <Grid item xs>
              <Button variant="text" onClick={joinRoom}>Join Room</Button>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
    
  )
}

export default JoinRoomModal;