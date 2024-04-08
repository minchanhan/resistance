import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from "@mui/material";

import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";
import GameSettings from "../../Components/GameSettings.jsx";

function GameScreen({ 
  socket, 
  username, 
  roomCode, 
  isAdmin,
  seats, 
  capacity,
  onChangedCapacity,
  selectionTime,
  onChangedSelectionTime,
  privateRoom,
  onChangedPrivateRoom,
  gameScreen,
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
  missionHappening,
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
  navigate,
  checkIfInGame
}) {
  const { room } = useParams();

  // const isRetina = useMediaQuery({ minResolution: '2dppx' });
  const isLandscape = useMediaQuery({ orientation: 'landscape' });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const is4Kwidth = useMediaQuery({ minWidth: 1880 });
  const is4Kheight = useMediaQuery({ minHeight: 1000 });
  const is4K = is4Kheight && is4Kwidth;

  const isGettingThin = useMediaQuery({ maxWidth: 1050 });
  const isThin = useMediaQuery({ maxWidth: 950 });
  const isThinning = useMediaQuery({ maxWidth: 650 }); // cap >= 9
  const isPrettyThin = useMediaQuery({ maxWidth: 525 }); // cap >= 7
  const isReallyThin = useMediaQuery({ maxWidth: 425 }); // cap <= 6
  const isMostThin = useMediaQuery({ maxWidth: 325 });

  const isTall = useMediaQuery({ minHeight: 700 }); // i)
  const isShort = useMediaQuery({ maxHeight: 700 }); // ii)
  const isReallyShort = useMediaQuery({ maxHeight: 450 });

  const [showHiddenChat, setShowHiddenChat] = useState(false);

  useEffect(() => {
    if (!gameScreen) {
      if (room == null) {
        navigate("/", { replace: true });
      } else if (room.length === 5) {
        navigate(`/join/${room}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      return;
    }
  }, [gameScreen, room, navigate, checkIfInGame]);

  // Passing props:
  const gameTableProps = {
    socket: socket,
    roomCode: roomCode,
    seats: seats,
    capacity: capacity, 
    username: username,
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
    is4K: is4K,
    isReallyShort: isReallyShort,
    isThinning: isThinning,
    isPrettyThin: isPrettyThin,
    isReallyThin: isReallyThin,
    isMostThin: isMostThin,
  };

  const infoTableProps = {
    roomCode: roomCode, 
    capacity: capacity, 
    seats: seats, 
    topText: `Room Admin: ${roomAdminName}`,
    missionNumber: missionNumber,
    gameStarted: gameStarted,
    mins: mins,
    secs: secs,
    voteHappening: voteHappening,
    missionHappening: missionHappening
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
                    border: `1px solid black`,
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
                      border: `1px solid black`,
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