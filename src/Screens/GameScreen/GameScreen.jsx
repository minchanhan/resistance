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
  // const isPortrait = useMediaQuery({ orientation: 'portrait' });
  // const isRetina = useMediaQuery({ minResolution: '2dppx' });
  const isThin = useMediaQuery({ maxWidth: 900 }); // turn to portrait mode

  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const isShort = useMediaQuery({ maxHeight: 600 });

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
        isLandscape && isShort ? (
          <div className="gameScreen">
            {
              showHiddenChat ? (
                <ChatBox {...chatBoxProps} />
              ) : <></>
            }

            <div className="colLeft">
              <InfoTable {...infoTableProps} />
              {
                gameStarted ? (<GameCommands gameMasterSpeech={gameMasterSpeech} />) : (
                  <GameSettings {...gameSettingsProps} />
                )
              }
            </div>
            <div className="colRight">
              <GameTable {...gameTableProps} />
              <div className="showChatBtn">
                <Button
                  color="secondary"
                  onClick={() => {setShowHiddenChat(!showHiddenChat)}}
                  sx={{
                    border: `1px solid ${getComputedStyle(document.body).getPropertyValue('--secondary-color')}`,
                  }}
                >
                  {showHiddenChat ? "Close Chat" : "Show Chat"}
                </Button>
              </div>
            </div>

            
          </div>
        ) : isThin ? (
          <div className="gameScreen">
            {
              showHiddenChat ? (
                <ChatBox {...chatBoxProps} />
              ) : <></>
            }
            <InfoTable {...infoTableProps} />
            <GameTable {...gameTableProps} />
            {
              gameStarted ? (<GameCommands gameMasterSpeech={gameMasterSpeech} />) : (
                <GameSettings {...gameSettingsProps} />
              )
            }
            <div className="showChatBtn">
              <Button
                color="secondary"
                onClick={() => {setShowHiddenChat(!showHiddenChat)}}
                sx={{
                  border: `1px solid ${getComputedStyle(document.body).getPropertyValue('--secondary-color')}`,
                }}
              >
                {showHiddenChat ? "Close Chat" : "Show Chat"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="gameScreen">
            <div className="colLeft">
              <InfoTable {...infoTableProps} />
              <GameTable {...gameTableProps} />
            </div>
            <div className="colRight">
              <ChatBox {...chatBoxProps} />
              {
                gameStarted ? (<GameCommands gameMasterSpeech={gameMasterSpeech} />) : (
                  <GameSettings {...gameSettingsProps} />
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