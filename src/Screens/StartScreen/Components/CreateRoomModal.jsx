import React, { useState } from "react";
import "../../../App.css";
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import "../../../data/Enums.js";

function CreateRoomModal({open, handleCreateClose, capacity=5, setCapacity, createRoom}) {
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" color="white">
            Room Settings
          </Typography>
          
          <Grid direction="column">
            <Grid xs alignItems="flex-end">
              <FormControl sx={{ m: 1.5, minWidth: 200, mt: 3.5}} >
                <InputLabel id="demo-simple-select-helper-label"># of Players</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={capacity}
                  label="# of Players"
                  onChange={(event) => {
                    setCapacity(event.target.value);
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
                <FormHelperText>Minimum 5 Players</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid xs>
              <Button variant="text" onClick={createRoom}>Create Room</Button>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
    
  )
}

export default CreateRoomModal;