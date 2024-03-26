import { React, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
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
  setMsgList,
  newMsg,
  setNewMsg,
  mins,
  secs
}) {
  // const isPortrait = useMediaQuery({ orientation: 'portrait' });
  // const isRetina = useMediaQuery({ minResolution: '2dppx' });
  const isThin = useMediaQuery({ maxWidth: 900 }); // turn to portrait mode
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isReallyThin = useMediaQuery({ maxWidth: 425 });

  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const isShort = useMediaQuery({ maxHeight: 700 });
  const isReallyShort = useMediaQuery({ maxHeight: 450 });

  const isHighRes = useMediaQuery({ minWidth: 1440 });
  const is4K = useMediaQuery({ minWidth: 2560 });

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
    missionResultTrack: missionResultTrack,
    isHighRes: isHighRes,
    is4K: is4K,
    isReallyShort: isReallyShort,
    isReallyThin: isReallyThin
  };

  const infoTableProps = {
    room: room, 
    capacity: capacity, 
    seats: seats, 
    topText: `Room Admin: ${roomAdminName}`,
    missionNumber: missionNumber,
    gameStarted: gameStarted,
    mins: mins,
    secs: secs,
    voteHappening: voteHappening,
    goingOnMission: goingOnMission
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
    newMsg: newMsg,
    setNewMsg: setNewMsg,
    showHiddenChat: showHiddenChat,
    setShowHiddenChat: setShowHiddenChat,
    haveCloseOnWindow: (isLandscape && isShort) || isThin || isPortrait
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
                <div className="showChatBtnBox">
                  {
                    newMsg && !showHiddenChat ? (
                      <NotificationsIcon className="newMsgAlert" />
                    ) : <></>
                  }
                  <Button
                    color="secondary"
                    onClick={() => {
                      setShowHiddenChat(!showHiddenChat);
                      setNewMsg(false);
                    }}
                    sx={{
                      border: `1px solid ${getComputedStyle(document.body).getPropertyValue('--secondary-color')}`,
                    }}
                  >
                    {showHiddenChat ? "Close Chat" : "Show Chat"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : isThin || isPortrait ? (
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
              <div className="showChatBtnBox">
                {
                  newMsg && !showHiddenChat ? (
                    <NotificationsIcon className="newMsgAlert" />
                  ) : <></>
                }
                <Button
                  color="secondary"
                  onClick={() => {
                    setShowHiddenChat(!showHiddenChat);
                    setNewMsg(false);
                  }}
                  sx={{
                    border: `1px solid ${getComputedStyle(document.body).getPropertyValue('--secondary-color')}`,
                  }}
                >
                  {showHiddenChat ? "Close Chat" : "Show Chat"}
                </Button>
              </div>
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