import React from "react";
import "../App.css";
import { Box, 
  Button, 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  Switch, 
} from "@mui/material";
import "../data/Enums.js";

function GameSettings({
  capacity,
  curNumPlayers,
  onChangedCapacity,
  selectionTime,
  onChangedSelectionTime,
  privateRoom,
  onChangedPrivateRoom,
  isAdmin,
  startGame
}) {

  const capacityMenuItems = [5,6,7,8,9,10];
  
  return (
    <div>
      <Box>        
        <Grid container direction="column">
          <Grid item alignItems="flex-end" xs>
            <FormControl sx={{ m: 1.5, minWidth: 200, mt: 0}} >
              <InputLabel id="demo-simple-select-helper-label"># of Players</InputLabel>
              <Select
                id="demo-simple-select-helper"
                labelId="demo-simple-select-helper-label"
                label="# of Players"
                value={capacity}
                onChange={(event) => {
                  onChangedCapacity(event.target.value);
                }}
                disabled={!isAdmin}
              >
                {
                  capacityMenuItems.map(function(val, i) {
                    return <MenuItem key={i} value={val} disabled={val < curNumPlayers}>{val} players</MenuItem>
                  })
                }
              </Select>
              <FormHelperText>Minimum 5 Players</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item alignItems="flex-end" xs>
            <FormControl sx={{ m: 1.5, minWidth: 200, mt: 0}} >
              <InputLabel id="demo-simple-select-helper-label">Mission Selection Time Limit</InputLabel>
              <Select
                id="demo-simple-select-helper"
                labelId="demo-simple-select-helper-label"
                label="Mission Selection Time Limit"
                value={selectionTime}
                onChange={(event) => {
                  onChangedSelectionTime(event.target.value)
                }}
                disabled={!isAdmin}
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
                onChange={(event) => {
                  onChangedPrivateRoom();
                }}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={!isAdmin}
              />
            } 
            label="Private Room"
            labelPlacement="start"
            sx={{ marginBottom: 0, color: "var(--main-text-color)"}}
          />
          </Grid>

          <Button 
            variant="text" 
            onClick={() => {
              console.log("private room state: ", privateRoom);
              console.log("capacity state: ", capacity);
              console.log("selection time state: ", selectionTime);
              startGame();
            }}
            disabled={curNumPlayers < capacity || !isAdmin}
          >
            Start Game
          </Button>
        </Grid>
      </Box>
    </div>
  )
}

export default GameSettings;