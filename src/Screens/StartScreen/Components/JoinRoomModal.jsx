import React, { useState } from "react";
import "../../../App.css";
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import "../../../data/Enums.js";

function JoinRoomModal({
  open, 
  handleJoinClose, 
  joinRoom, 
  setRoomCode
}) {
  const [checkedRoom, setCheckedRoom] = useState(false);
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

  const validRoomCheck = () => {

    return true;
  }

  const joinRoomClicked = () => {
    setCheckedRoom(true);

    
    joinRoom();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleJoinClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" color="white">
            Enter Room Code
          </Typography>
          
          <Grid direction="column">
            <Grid xs alignItems="flex-end">
            <TextField
              error={!validRoomCheck() && checkedRoom}
              id={!validRoomCheck() && checkedRoom ? "" : "outlined-error-helper-text"}
              label={!validRoomCheck() && checkedRoom ? "Warning" : "Room code"}
              defaultValue=""
              helperText={!validRoomCheck() && checkedRoom ? "Room doesn't exist" : ""}
              onChange={ (event) => {
                setRoomCode(event.target.value);
              }}
              sx={{ m: 1.5, minWidth: 200, mt: 2.4}}
            />
            </Grid>
            
            <Grid xs>
              <Button variant="text" onClick={joinRoomClicked}>Join Room</Button>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
    
  )
}

export default JoinRoomModal;