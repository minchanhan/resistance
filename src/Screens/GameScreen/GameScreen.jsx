import { React, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";
import GameSettings from "../../Components/GameSettings.jsx";
import { Button } from "@mui/material";

function GameScreen({ 
  socket, 
  username, 
  room, 
  isAdmin,
  seats, 
  capacity,
  onChangedCapacity,
  selectionTime,
  onChangedSelectionTime,
  privateRoom,
  onChangedPrivateRoom,
  gameStarted, 
  gameMasterSpeech, 
  leaderSelecting,
  disableTeamSubmit,
  setDisableTeamSubmit,
  selectedPlayers,
  setSelectedPlayers,
  disableVoteBtns,
  setDisableVoteBtns,
  voteHappening,
  curMissionVoteDisapproves,
  goingOnMission,
  disableMissionActions,
  setDisableMissionActions,
  missionNumber,
  missionResultTrack,
  roomAdminName,
  startGame,
  msg,
  setMsg,
  msgList,
  setMsgList
}) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 770 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isRetina = useMediaQuery({ minResolution: '2dppx' });

  const [showHiddenChat, setShowHiddenChat] = useState(false);

  // Passing props:
  const gameTableProps = {
    socket: socket,
    room: room,
    seats: seats,
    capacity: capacity, 
    username: username, // for testing only
    leaderSelecting: leaderSelecting,
    disableTeamSubmit: disableTeamSubmit,
    setDisableTeamSubmit: setDisableTeamSubmit,
    selectedPlayers: selectedPlayers,
    setSelectedPlayers: setSelectedPlayers,
    disableVoteBtns: disableVoteBtns,
    setDisableVoteBtns: setDisableVoteBtns,
    voteHappening: voteHappening,
    curMissionVoteDisapproves: curMissionVoteDisapproves,
    goingOnMission: goingOnMission,
    disableMissionActions: disableMissionActions,
    setDisableMissionActions: setDisableMissionActions,
    missionNumber: missionNumber,
    missionResultTrack: missionResultTrack
  };

  const infoTableProps = {
    room: room, 
    capacity: capacity, 
    seats: seats, 
    topText: `Room Admin: ${roomAdminName}`,
    missionNumber: missionNumber,
    gameStarted: gameStarted
  };
  
  const gameSettingsProps = {
    capacity: capacity,
    curNumPlayers: seats.length,
    onChangedCapacity: onChangedCapacity,
    selectionTime: selectionTime,
    onChangedSelectionTime: onChangedSelectionTime,
    privateRoom: privateRoom,
    onChangedPrivateRoom: onChangedPrivateRoom,
    isAdmin: isAdmin,
    startGame: startGame,
  };

  const chatBoxProps = {
    socket: socket,
    username: username,
    msg: msg,
    setMsg: setMsg,
    msgList: msgList,
    setMsgList: setMsgList,
  }

  return (
    <>
      {
        showHiddenChat && isPortrait ? (
          <ChatBox {...chatBoxProps} />
        ) : <></>
      }

      {
        isPortrait ? (
          <div className="gameScreen">
            <InfoTable {...infoTableProps} />
            <div>
              {
                gameStarted ? (<GameCommands gameMasterSpeech={gameMasterSpeech} />) : (
                  <div><GameSettings {...gameSettingsProps} /></div>
                )
              }
            </div>
            <div><GameTable {...gameTableProps} /></div>
            <div>
              <Button 
                color="secondary"
                onClick={() => {setShowHiddenChat(!showHiddenChat)}}
                sx={{
                  border: `1px solid ${getComputedStyle(document.body).getPropertyValue('--secondary-color')}`,
                  width: "30svw"
                }}
              >
                {showHiddenChat ? "Close Chat" : "Show Chat"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="gameScreen">
            <div className="gameScreenCol">
              <GameTable {...gameTableProps} />
              <InfoTable {...infoTableProps} />
            </div>
            <div className="gameScreenCol">
              <ChatBox {...chatBoxProps} />
              {
                gameStarted ? (<GameCommands gameMasterSpeech={gameMasterSpeech} />) : (
                  <div><GameSettings {...gameSettingsProps} /></div>
                )
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default GameScreen;