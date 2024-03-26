import React from "react";
import "../App.css";
import { 
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
    <div className="gameSettings">
      <div className="settingsSelect">
        <FormControl style={{ flex: "1 1 auto" }}>
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
          <FormHelperText>5+ Players</FormHelperText>
        </FormControl>
      </div>

      <div className="settingsSelect">
        <FormControl style={{ flex: "1 1 auto" }}>
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
            <MenuItem value={1}>1 min</MenuItem>
            <MenuItem value={3}>3 min</MenuItem>
            <MenuItem value={5}>5 min</MenuItem>
            <MenuItem value={7}>7 min</MenuItem>
            <MenuItem value={10}>10 min</MenuItem>
            <MenuItem value={15}>15 min</MenuItem>
            <MenuItem value={200}>Unlimited</MenuItem>
          </Select>
          <FormHelperText>3 min - Ꝏ</FormHelperText>
        </FormControl>
      </div>
      
      <div className="settingsSwitch">
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
          sx={{color: "var(--main-text-color)", mb: "0.25rem"}}
        />
      </div>

      <div className="settingsStartBtn">
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
      </div>
    </div>
  )
}

export default GameSettings;