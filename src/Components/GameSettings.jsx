import React from "react";
import "../App.css";
import { Box, 
  Button, 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
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
    <div className="gameSettings" style={{flex: "35%", height: "100%", width: "100%"}}>
      <FormControl>
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
        sx={{color: "var(--main-text-color)", mb: "1.5em", ml: "1.5em"}}
      />

      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Team Select Time Limit</InputLabel>
        <Select
          id="demo-simple-select-helper"
          labelId="demo-simple-select-helper-label"
          label="Team Select Time Limit"
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

      <Button 
        variant="text" 
        onClick={() => {
          console.log("private room state: ", privateRoom);
          console.log("capacity state: ", capacity);
          console.log("selection time state: ", selectionTime);
          startGame();
        }}
        disabled={curNumPlayers < capacity || !isAdmin}
        sx={{mb: "1.5em", ml: "1.5em"}}
      >
        Start Game
      </Button>
    </div>
  )
}

export default GameSettings;