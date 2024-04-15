import { React, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox.jsx";
import GameArea from "./Components/GameArea/GameArea.jsx";
import InfoBox from "./Components/InfoBox/InfoBox.jsx";
import GameMenuBar from "./Components/GameMenuBar/GameMenuBar.jsx";
import RebellionLogo from "../../assets/RebellionLogo.jsx";
import ShowChatButton from "../../Utils/ShowChatButton.jsx";

function GameScreen({ 
  startGame,
  handleTeamSubmit,
  handleVote,
  handleMission,
  sendMessage,
  checkInGame,

  username,
  isAdmin,
  myTeam,
  roomCode,
  roomAdminName,

  capacity,
  onChangedCapacity,
  selectionTimeSecs,
  onChangedSelectionTimeSecs,
  privateRoom,
  onChangedPrivateRoom,
  numGames,
  missionTeamSizes,

  gameStarted,
  isMissionLeader,
  disableTeamSubmit,
  voteHappening,
  disableVoteBtns,

  missionHappening,
  isGoingOnMission,
  disableMissionActions,

  msg,
  setMsg,
  msgList,
  newMsg,
  setNewMsg,
  showHiddenChat,
  setShowHiddenChat,

  seats,
  selectedPlayers,
  setSelectedPlayers,
  goodTeamStyle,
  badTeamStyle,

  missionNumber,
  curMissionVoteDisapproves,
  missionResultTrack,
  
  mins,
  secs,
}) {
  // const { room } = useParams();

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

  /*
  useEffect(() => {
    checkInGame(room);
  });*/

  // Passing props:
  const gameAreaProps = {
    handleTeamSubmit: handleTeamSubmit,
    handleVote: handleVote,
    handleMission: handleMission,

    username: username,
    myTeam: myTeam,
    capacity: capacity, 
    missionTeamSizes: missionTeamSizes,

    isMissionLeader: isMissionLeader,
    disableTeamSubmit: disableTeamSubmit,
    voteHappening: voteHappening,
    disableVoteBtns: disableVoteBtns,
    isGoingOnMission: isGoingOnMission,
    disableMissionActions: disableMissionActions,

    seats: seats,
    selectedPlayers: selectedPlayers,
    setSelectedPlayers: setSelectedPlayers,
    goodTeamStyle: goodTeamStyle,
    badTeamStyle: badTeamStyle,
    
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

  const infoBoxProps = {
    roomCode: roomCode,
    capacity: capacity, 
    roomAdminName: roomAdminName,
    numGames: numGames,
    missionNumber: missionNumber,
    gameStarted: gameStarted,
    mins: mins,
    secs: secs,
    voteHappening: voteHappening,
    missionHappening: missionHappening,
    seats: seats, 
  };
  
  const gameMenuBarProps = {
    startGame: startGame,
    isAdmin: isAdmin,
    curNumPlayers: seats.length,
    capacity: capacity,
    onChangedCapacity: onChangedCapacity,
    selectionTimeSecs: selectionTimeSecs,
    onChangedSelectionTimeSecs: onChangedSelectionTimeSecs,
    privateRoom: privateRoom,
    onChangedPrivateRoom: onChangedPrivateRoom,
  };

  const chatBoxProps = {
    username: username,
    msg: msg,
    setMsg: setMsg,
    msgList: msgList,
    showHiddenChat: showHiddenChat,
    setShowHiddenChat: setShowHiddenChat,
    haveCloseOnWindow: (isLandscape && isShort) || isThin || isPortrait,
    sendMessage: sendMessage,
  };
  
  const showChatBtnProps = {
    showHiddenChat: showHiddenChat, 
    setShowHiddenChat: setShowHiddenChat,
    newMsg: newMsg, 
    setNewMsg: setNewMsg,
  };

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
            <div className="titleLogo">
              <RebellionLogo />
            </div>
            <GameMenuBar {...gameMenuBarProps} />

            <InfoBox {...infoBoxProps} />
            <GameArea {...gameAreaProps} />
            <ShowChatButton {...showChatBtnProps} />
          </div>
        ) : (isLandscape && isShort) || isGettingThin ? (
          <div className="gameScreen">
            {
              showHiddenChat ? (
                <ChatBox {...chatBoxProps} />
              ) : <></>
            }

            <div className="colLeft">
              <div className="titleLogo">
                <RebellionLogo />
              </div>
              <GameMenuBar {...gameMenuBarProps} />
              <InfoBox {...infoBoxProps} />
            </div>
            <div className="colRight">
              <GameArea {...gameAreaProps} />
              <ShowChatButton {...showChatBtnProps} />
            </div>
          </div>
        ) : (
          <div className="gameScreen">
            <div className="colLeft">
              <div className="titleLogo">
                <RebellionLogo />
              </div>
              <GameMenuBar {...gameMenuBarProps} />
              <GameArea {...gameAreaProps} />
            </div>
            <div className="colRight">
              <ChatBox {...chatBoxProps} />
              <InfoBox {...infoBoxProps} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default GameScreen;