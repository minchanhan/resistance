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
  navigate,
  startGame,
  handleTeamSubmit,
  handleVote,
  handleMission,
  sendMessage,

  username,
  isAdmin,
  roomCode,
  roomAdminName,

  capacity,
  onChangedCapacity,
  selectionTime,
  onChangedSelectionTime,
  privateRoom,
  onChangedPrivateRoom,

  gameStarted,
  teamSelectHappening,
  isMissionLeader,
  disableTeamSubmit,
  setDisableTeamSubmit,
  voteHappening,
  disableVoteBtns,
  setDisableVoteBtns,

  missionHappening,
  isGoingOnMission,
  disableMissionActions,
  setDisableMissionActions,

  msg,
  setMsg,
  msgList,
  setMsgList,
  newMsg,
  setNewMsg,

  seats,
  selectedPlayers,
  setSelectedPlayers,

  missionNumber,
  curMissionVoteDisapproves,
  missionResultTrack,
  
  mins,
  secs,
}) {
  const { room } = useParams();

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
    if (room == null) {
      navigate("/", { replace: true });
    } else if (room.length === 5) {
      navigate(`/join/${room}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
    return;
  }, [room, navigate]);

  // Passing props:
  const gameTableProps = {
    handleTeamSubmit: handleTeamSubmit,
    handleVote: handleVote,
    handleMission: handleMission,
    sendMessage: sendMessage,

    username: username,
    roomCode: roomCode,
    capacity: capacity, 

    teamSelectHappening: teamSelectHappening,
    isMissionLeader: isMissionLeader,
    disableTeamSubmit: disableTeamSubmit,
    setDisableTeamSubmit: setDisableTeamSubmit,
    voteHappening: voteHappening,
    disableVoteBtns: disableVoteBtns,
    setDisableVoteBtns: setDisableVoteBtns,
    missionHappening: missionHappening,
    isGoingOnMission: isGoingOnMission,
    disableMissionActions: disableMissionActions,
    setDisableMissionActions: setDisableMissionActions,

    seats: seats,
    selectedPlayers: selectedPlayers,
    setSelectedPlayers: setSelectedPlayers,
    
    missionNumber: missionNumber,
    curMissionVoteDisapproves: curMissionVoteDisapproves,
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
    topText: `Room Admin: ${roomAdminName}`,
    missionNumber: missionNumber,
    gameStarted: gameStarted,
    mins: mins,
    secs: secs,
    voteHappening: voteHappening,
    missionHappening: missionHappening,
    seats: seats, 
  };
  
  const gameSettingsProps = {
    startGame: startGame,
    isAdmin: isAdmin,
    curNumPlayers: seats.length,
    capacity: capacity,
    onChangedCapacity: onChangedCapacity,
    selectionTime: selectionTime,
    onChangedSelectionTime: onChangedSelectionTime,
    privateRoom: privateRoom,
    onChangedPrivateRoom: onChangedPrivateRoom,
  };

  const chatBoxProps = {
    username: username,
    msg: msg,
    setMsg: setMsg,
    msgList: msgList,
    setMsgList: setMsgList,
    showHiddenChat: showHiddenChat,
    setShowHiddenChat: setShowHiddenChat,
    haveCloseOnWindow: (isLandscape && isShort) || isThin || isPortrait,
    sendMessage: sendMessage,
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