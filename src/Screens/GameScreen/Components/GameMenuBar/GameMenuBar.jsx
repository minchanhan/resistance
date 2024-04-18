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
  selectionSecs,
  onChangedSelectionSecs,
  privateRoom,
  onChangedPrivateRoom,
  gameStarted
}) {
  const [openSettings, setOpenSettings] = useState(false);
  
  return (
    <div className="gameMenuBar">
      <GameSettingsModal
        isAdmin={isAdmin}
        curNumPlayers={curNumPlayers}
        capacity={capacity}
        onChangedCapacity={onChangedCapacity}
        selectionSecs={selectionSecs}
        onChangedSelectionSecs={onChangedSelectionSecs}
        privateRoom={privateRoom}
        onChangedPrivateRoom={onChangedPrivateRoom}
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />

      <TuneIcon
        onClick={() => {
          if (!gameStarted) setOpenSettings(true);
        }} 
        fontSize="large" 
        style={{
          cursor: !gameStarted ? "pointer" : "not-allowed"
        }}
      />
      <Info fontSize="large" />
      {
        gameStarted ? (
          <Pause 
            fontSize="large" 
            style={{
              cursor: isAdmin ? "pointer" : "not-allowed"
            }}
          /> 
        ) : (
          <PlayArrow 
            onClick={() => {
              if ((curNumPlayers >= 5) && isAdmin) {
                onChangedCapacity(curNumPlayers);
                startGame();
              }
            }}
            style={{
              cursor: (curNumPlayers >= 5) && isAdmin ? "pointer" : "not-allowed"
            }}
            fontSize="large" 
          />
        )
      }
    </div>
  )
}

export default GameMenuBar;