import React, { useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import Info from "@mui/icons-material/Info";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import GameSettingsModal from "../../Modals/GameSettingsModal";

import "../../../../App.css";

function GameMenuBar({
  startGame,
  isAdmin,
  curNumPlayers,
  capacity,
  onChangedCapacity,
  selectionTimeSecs,
  onChangedSelectionTimeSecs,
  privateRoom,
  onChangedPrivateRoom,
}) {
  const [openSettings, setOpenSettings] = useState(false);
  
  return (
    <div className="gameMenuBar">
      <GameSettingsModal
        isAdmin={isAdmin}
        curNumPlayers={curNumPlayers}
        capacity={capacity}
        onChangedCapacity={onChangedCapacity}
        selectionTimeSecs={selectionTimeSecs}
        onChangedSelectionTimeSecs={onChangedSelectionTimeSecs}
        privateRoom={privateRoom}
        onChangedPrivateRoom={onChangedPrivateRoom}
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />

      <TuneIcon 
        onClick={() => {
          setOpenSettings(true);
        }} 
        fontSize="large" 
      />
      <Info fontSize="large" />
      {
        startGame ? 
          <Pause 
            onClick={() => {
              startGame();
            }} 
            fontSize="large" 
            disabled={curNumPlayers < capacity || !isAdmin}
          /> 
          : <PlayArrow fontSize="large" />
      }
    </div>
  )
}

export default GameMenuBar;