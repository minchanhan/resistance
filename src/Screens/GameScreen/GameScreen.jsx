import { React, useEffect, useState } from "react";
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
  secs,
  modalStyle,
  modalHeader
}) {
  // const isPortrait = useMediaQuery({ orientation: 'portrait' });
  // const isRetina = useMediaQuery({ minResolution: '2dppx' });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const is4K = useMediaQuery({ minWidth: 2400 });
  const isHighRes = useMediaQuery({ minWidth: 1440 });

  const isGettingThin = useMediaQuery({ maxWidth: 1050 });
  const isThin = useMediaQuery({ maxWidth: 950 });
  const isThinning = useMediaQuery({ maxWidth: 625 }); // cap >= 9
  const isPrettyThin = useMediaQuery({ maxWidth: 525 }); // cap >= 7
  const isReallyThin = useMediaQuery({ maxWidth: 425 }); // cap <= 6
  const isMostThin = useMediaQuery({ maxWidth: 325 });

  const isTall = useMediaQuery({ minHeight: 700 }); // i)
  const isShort = useMediaQuery({ maxHeight: 700 }); // ii)
  const isReallyShort = useMediaQuery({ maxHeight: 450 });

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
    isMostThin: isMostThin,
    isReallyThin: isReallyThin,
    isPrettyThin: isPrettyThin,
    isThinning: isThinning
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
    modalStyle: modalStyle,
    modalHeader: modalHeader
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
        (isThin && isTall) || isPortrait ? (
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
                    fontWeight: 600
                  }}
                >
                  {showHiddenChat ? "Close Chat" : "Show Chat"}
                </Button>
              </div>
            </div>
          </div>
        ) : (isLandscape && isShort) || isGettingThin ? (
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
                      fontWeight: 600
                    }}
                  >
                    {showHiddenChat ? "Close Chat" : "Show Chat"}
                  </Button>
                </div>
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