import React, { useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import Info from "@mui/icons-material/Info";
import PlayArrow from "@mui/icons-material/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
import GameSettingsModal from "../../Modals/GameSettingsModal";
import EndConfirmModal from "../../Modals/EndConfirmModal";

import "../../../../App.css";

function GameMenuBar({
  startGame,
  endGame,
  isAdmin,
  curNumPlayers,
  capacity,
  onChangedCapacity,
  selectionSecs,
  onChangedSelectionSecs,
  privateRoom,
  onChangedPrivateRoom,
  gameStarted,
  handleInstructionsOpen
}) {
  const [openSettings, setOpenSettings] = useState(false);
  const [openEndConfirm, setOpenEndConfirm] = useState(false);

  const handleAdminEndGame = () => {
    endGame();
    setOpenEndConfirm(false);
  };
  
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
      <EndConfirmModal
        open={openEndConfirm}
        setOpenEndConfirm={setOpenEndConfirm}
        handleAdminEndGame={handleAdminEndGame}
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
      <Info 
        onClick={handleInstructionsOpen}
        fontSize="large" 
      />
      {
        gameStarted ? (
          <StopIcon 
            onClick={() => {
              if (isAdmin) setOpenEndConfirm(true);
            }}
            style={{
              cursor: isAdmin ? "pointer" : "not-allowed"
            }}
            fontSize="large" 
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