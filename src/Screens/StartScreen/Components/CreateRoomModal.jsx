import React, { useState } from "react";
import "../../../App.css";
import { Box, 
  Button, 
  FormControl, 
  FormHelperText, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Modal, 
  Select, 
  Typography 
} from "@mui/material";
import "../../../data/Enums.js";

function CreateRoomModal({
  socket,
  open, 
  handleCreateClose, 
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

  const [capacity, setCapacity] = useState(6);
  const [selectionTime, setSelectionTime] = useState(7);


  const createRoom = () => {
    socket.emit("set_capacity", capacity); // order matters
    socket.emit("set_selection_time", selectionTime);
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
          
          <Grid direction="column">
            <Grid alignItems="flex-end" xs>
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

            <Grid alignItems="flex-end" xs>
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
            
            <Grid xs>
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