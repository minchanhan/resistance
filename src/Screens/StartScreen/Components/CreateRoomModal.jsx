import React from "react";
import "../../../App.css";
import { Box, 
  Button, 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Modal, 
  Select, 
  Switch, 
  Typography 
} from "@mui/material";
import "../../../data/Enums.js";

function CreateRoomModal({
  socket,
  open, 
  handleCreateClose,
  capacity,
  setCapacity,
  selectionTime,
  setSelectionTime,
  privateRoom,
  setPrivateRoom
}) {
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

  const handlePrivateRoom = () => {
    setPrivateRoom(!privateRoom);
  };

  const createRoom = () => {
    socket.emit("set_capacity", capacity); // order matters
    socket.emit("set_selection_time", selectionTime);
    socket.emit("set_private", privateRoom);
    socket.emit("create_room");
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
          
          <Grid container direction="column">
            <Grid item alignItems="flex-end" xs>
              <FormControl sx={{ m: 1.5, minWidth: 200, mt: 3.5}} >
                <InputLabel id="demo-simple-select-helper-label"># of Players</InputLabel>
                <Select
                  id="demo-simple-select-helper"
                  labelId="demo-simple-select-helper-label"
                  label="# of Players"
                  value={capacity}
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

            <Grid item alignItems="flex-end" xs>
              <FormControl sx={{ m: 1.5, minWidth: 200, mt: 2.5}} >
                <InputLabel id="demo-simple-select-helper-label">Mission Selection Time Limit</InputLabel>
                <Select
                  id="demo-simple-select-helper"
                  labelId="demo-simple-select-helper-label"
                  label="Mission Selection Time Limit"
                  value={selectionTime}
                  onChange={(event) => {
                    setSelectionTime(event.target.value);
                  }}
                >
                  <MenuItem value={3}>3 mins</MenuItem>
                  <MenuItem value={5}>5 mins</MenuItem>
                  <MenuItem value={7}>7 mins</MenuItem>
                  <MenuItem value={10}>10 mins</MenuItem>
                  <MenuItem value={15}>15 mins</MenuItem>
                  <MenuItem value={200}>Unlimited</MenuItem>
                </Select>
                <FormHelperText>Recommended: 7 mins</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item alignItems="flex-end" xs>
            <FormControlLabel 
              control={
                <Switch
                  checked={privateRoom}
                  onChange={handlePrivateRoom}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              } 
              label="Private Room"
              labelPlacement="start"
              sx={{ marginBottom: 1, color: "white"}}
            />
            </Grid>
            
            <Grid item xs>
              <Button 
                variant="text" 
                onClick={createRoom}
              >
                Create Room
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Modal>
    </div>
    
  )
}

export default CreateRoomModal;