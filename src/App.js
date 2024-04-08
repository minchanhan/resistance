import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import StartScreen from './Screens/StartScreen/StartScreen';
import EndScreen from './Screens/EndScreen/EndScreen';
import GameScreen from './Screens/GameScreen/GameScreen';

const socket = io.connect(process.env.REACT_APP_SERVER || "http://localhost:3001"); // connect to socket server

function App() {
  useEffect(() => { // confirmation before leaving
    window.onbeforeunload = function(e) {
      var dialogText = 'Dialog text here';
      e.returnValue = dialogText;
      return dialogText;
    };
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main: "#000000"
      },
      green: {
        main: "#8BBD8B"
      },
      red: {
        main: "#DF4730"
      },
    },
    colors: {
      text: {
        body: 'white',
        link: '#FF8C00'
      }
    }
  });

  const navigate = useNavigate();

  // Screen States
  const [gameScreen, setGameScreen] = useState(false); // Start screen or lobby/game screen
  const [gameEnd, setGameEnd] = useState(false); // is end modal showing
  const [youDisconnectedModalOpen, setYouDisconnectedModalOpen] = useState(false);

  // Client Settings
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [roomCode, setRoomCode] = useState("");
  const [validRoom, setValidRoom] = useState(true);
  const [roomStatus, setRoomStatus] = useState("");
  const [randomStatusMsg, setRandomStatusMsg] = useState(""); // for random room

  // Game Settings
  const [capacity, setCapacity] = useState(6);
  const [selectionTime, setSelectionTime] = useState(7);
  const [privateRoom, setPrivateRoom] = useState(true);

  // Game Screen
  const [roomAdminName, setRoomAdminName] = useState("");
  const [gameMasterSpeech, setGameMasterSpeech] = useState("Welcome... to the rebellion");

  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [newMsg, setNewMsg] = useState(false);

  const [seats, setSeats] = useState([]);

  // Game States
  const [gameStarted, setGameStarted] = useState(false); // is game started

  const [teamSelectHappening, setTeamSelectHappening] = useState(false);
  const [leaderSelecting, setLeaderSelecting] = useState(false); // leader selecting
  const [disableTeamSubmit, setDisableTeamSubmit] = useState(false);

  const [voteHappening, setVoteHappening] = useState(false); // vote
  const [disableVoteBtns, setDisableVoteBtns] = useState(false);

  const [missionHappening, setMissionHappening] = useState(false);
  const [goingOnMission, setGoingOnMission] = useState(false); // mission
  const [disableMissionActions, setDisableMissionActions] = useState(false);

  const [missionNumber, setMissionNumber] = useState(1);
  const [curMissionVoteDisapproves, setCurMissionVoteDisapproves] = useState(0);
  const [missionResultTrack, setMissionResultTrack] = useState(["none","none","none","none","none"]); // pass/fail
  const [selectedPlayers, setSelectedPlayers] = useState([]); // selected players for vote/mission  

  // End Game
  const [endMsg, setEndMsg] = useState("");
  const [revealedPlayers, setRevealedPlayers] = useState([]);

  // Timer
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [timerGoal, setTimerGoal] = useState(null); // seconds since jan 1970 + selectionTime

  /* HELPERS */
  const startGame = () => {
    socket.emit("admin_start_game");
  }

  const onChangedUsername = (updatedUsername) => { // from StartScreen
    setUsername(updatedUsername);
  };

  const onChangedCapacity = (updatedCapacity) => { // from StartScreen
    setCapacity(updatedCapacity);
    socket.emit("set_capacity", updatedCapacity);
  };

  const onChangedSelectionTime = (updatedSelectionTime) => { // from StartScreen
    setSelectionTime(updatedSelectionTime);
    socket.emit("set_selection_time", updatedSelectionTime);
  };

  const onChangedPrivateRoom = () => { // from StartScreen
    socket.emit("set_private", !privateRoom);
    setPrivateRoom(!privateRoom);
  };

  const handleEndModalClose = () => {
    setGameEnd(false);
  }

  const checkIfInGame = (room) => {
    socket.emit("am_i_in_game", room);
  }

  // timer
  useEffect(() => {
    let interval = setInterval(() => {
      if (!teamSelectHappening) {
        setSecs(0);
        setMins(0);
        clearInterval(interval);
        return;
      } else {
        const now = Math.floor(new Date().getTime() / 1000);
        const mins = Math.floor((timerGoal - now) / 60);
        const secs = (timerGoal - now) - (mins * 60);
        setSecs(secs);
        setMins(mins);
        if (mins < 0) {
          setSecs(0);
          setMins(0);
          clearInterval(interval);
          return;
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timerGoal, teamSelectHappening]);

  /* --- Listening for socket messages --- */
  useEffect(() => {
    // helper
    const resetActionLobbyTimer = () => {
      // reset game actions to defaults
      setTeamSelectHappening(false);
      setLeaderSelecting(false);
      setDisableTeamSubmit(false);
  
      setVoteHappening(false);
      setDisableVoteBtns(false);
  
      setMissionHappening(false);
      setGoingOnMission(false);
      setDisableMissionActions(false);
  
      // reset lobby
      setGameStarted(false);
      setMissionNumber(1);
      setCurMissionVoteDisapproves(0);
      setMissionResultTrack(["none","none","none","none","none"]);
      setSelectedPlayers([]);
  
      // reset team select timer
      setSecs(0);
      setMins(0);
    };

    // functions
    const handlePlayerJoin = (lobbyInfo) => {
      setSeats(lobbyInfo.seats);
      setRoomCode(lobbyInfo.room);
      setRoomAdminName(lobbyInfo.roomAdmin);
      setGameScreen(true);
      setRandomStatusMsg("");
      navigate(`/${lobbyInfo.room}`, { replace: true });
    };

    const handleUsernameSet = (username) => {
      setUsername(username);
    };

    const handleRandomStatus = (msg) => {
      setRandomStatusMsg(msg);
    };

    const handleGameSettingsChange = (settings) => { 
      setCapacity(settings.capacity);
      setSelectionTime(settings.selectionTime);
      setPrivateRoom(settings.privateRoom);
    };

    const handleKickedPlayer = () => { 
      setGameScreen(false);
      setRoomAdminName("");
      setRoomCode("");
    };

    const handleRoomAdminChange = (adminInfo) => { 
      setIsAdmin(adminInfo.isAdmin);
      setRoomAdminName(adminInfo.adminName);
      socket.emit("set_room_admin", adminInfo.isAdmin);
    };

    const handleGameEnd = (info) => {
      // handle end game
      setRevealedPlayers(info.playerRevealArr);
      setEndMsg(info.endMsg);
      if (!info.kicked) setGameEnd(true);

      resetActionLobbyTimer();
    };

    const handleSeats = (seats) => {
      setSeats([...seats]);
    };

    const handleGameMaster = (speech) => {
      setGameMasterSpeech(speech);
    };
    
    const handleLeaderSelect = (info) => { 
      setGameStarted(true); // GAME START WHEN LEADER STARTS SELECTING
      setGameEnd(false); // If the modal is still up, take it down
      setSelectedPlayers([]); // reset

      setLeaderSelecting(info.isSelecting); // 1a
      setDisableTeamSubmit(false); // 1a
      setTeamSelectHappening(true);
      setVoteHappening(false); // 2c
      setMissionHappening(false); // 3c
      setGoingOnMission(false);

      const now = Math.floor(new Date().getTime() / 1000);
      setTimerGoal(now + (info.mins * 60));
    };

    const handlePlayerVoteStart = (info) => { 
      setSelectedPlayers(info.selectedPlayers);

      setLeaderSelecting(false); // 1c
      setTeamSelectHappening(false);
      setVoteHappening(true); // 2a
      setDisableVoteBtns(false); // 2a
    };

    const handleVoteTrackChange = (newCount) => {
      setCurMissionVoteDisapproves(newCount);
    };

    const handleMissionStart = (onMissionTeam) => {
      setVoteHappening(false); // 2c
      setGoingOnMission(onMissionTeam); // 3a
      setMissionHappening(true);
      setDisableMissionActions(false); // 3a
    };

    const handleMissionComplete = (info) => { // only when mission completed AND new one starting
      setGoingOnMission(false); // 3c
      setMissionHappening(false);

      // update mission stats
      setMissionResultTrack(info.missionResultTrack);
      setMissionNumber(info.mission);
    };

    const handleRoomWithCode = (data) => {
      setValidRoom(data.exists);
      setRoomStatus(data.reason);
    };

    const handleReceiveMsg = (msgData) => {
      setMsgList((msgList) => [...msgList, msgData]);
      setNewMsg(true);
    };

    const handleInGameCallback = (info) => {
      if (!info.inGame) {
        setYouDisconnectedModalOpen(true);

        // reset all states to default because they should be considered a new user:
        setGameScreen(false); // will cause navigation
        setUsername("");
        setIsAdmin(false);
        setRoomAdminName("");
        setValidRoom(true);
        setRoomStatus("");
        setCapacity(6);
        setSelectionTime(7);
        setPrivateRoom(true);
        setRoomCode("");
        setRandomStatusMsg("");
        setGameMasterSpeech("Welcome... to the rebellion");
        setMsg("");
        setMsgList([]);
        setNewMsg(false);
        setSeats([]);
        setGameStarted(false);
        setGameEnd(false);
        setTimerGoal(null);

        setRevealedPlayers([]);
        setEndMsg("");
        setGameEnd(false);

        resetActionLobbyTimer();
      }
    };
    
    // listeners
    socket.on("player_joined_lobby", handlePlayerJoin);
    socket.on("final_username_set", handleUsernameSet);
    socket.on("no_random_game", handleRandomStatus);
    socket.on("game_settings_changed", handleGameSettingsChange);
    socket.on("kicked_player", handleKickedPlayer);
    socket.on("room_admin_changed", handleRoomAdminChange);
    socket.on("set_game_end", handleGameEnd);
    socket.on("seats_info_share", handleSeats);
    socket.on("game_master_speech", handleGameMaster);
    socket.on("leader_is_selecting", handleLeaderSelect);
    socket.on("vote_on_these_players", handlePlayerVoteStart);
    socket.on("vote_track", handleVoteTrackChange);
    socket.on("go_on_mission", handleMissionStart);
    socket.on("mission_completed", handleMissionComplete);
    socket.on("room_with_code", handleRoomWithCode);
    socket.on("receive_msg", handleReceiveMsg);
    
    socket.on("are_you_in_game", handleInGameCallback); // special

    return () => {
      // cleanup
      socket.off("player_joined_lobby", handlePlayerJoin);
      socket.off("final_username_set", handleUsernameSet);
      socket.off("no_random_game", handleRandomStatus);
      socket.off("game_settings_changed", handleGameSettingsChange);
      socket.off("kicked_player", handleKickedPlayer);
      socket.off("room_admin_changed", handleRoomAdminChange);
      socket.off("set_game_end", handleGameEnd);
      socket.off("seats_info_share", handleSeats);
      socket.off("game_master_speech", handleGameMaster);
      socket.off("leader_is_selecting", handleLeaderSelect);
      socket.off("vote_on_these_players", handlePlayerVoteStart);
      socket.off("vote_track", handleVoteTrackChange);
      socket.off("go_on_mission", handleMissionStart);
      socket.off("mission_completed", handleMissionComplete);
      socket.off("room_with_code", handleRoomWithCode);
      socket.off("receive_msg", handleReceiveMsg);

      socket.on("are_you_in_game", handleInGameCallback); // special
    };
  });

  const startScreenProps = {
    socket: socket, 
    username: username, 
    onChangedUsername: onChangedUsername,
    setIsAdmin: setIsAdmin,
    randomStatusMsg: randomStatusMsg,
    navigate: navigate,
    validRoom: validRoom,
    setValidRoom: setValidRoom,
    roomStatus: roomStatus,
    setRoomStatus: setRoomStatus
  };

  const gameScreenProps = {
    socket: socket,
    username: username,
    roomCode: roomCode,
    isAdmin: isAdmin,
    seats: seats,
    capacity: capacity,
    onChangedCapacity: onChangedCapacity,
    selectionTime: selectionTime,
    onChangedSelectionTime: onChangedSelectionTime,
    privateRoom: privateRoom,
    onChangedPrivateRoom: onChangedPrivateRoom,
    gameScreen: gameScreen,
    gameStarted: gameStarted,
    gameMasterSpeech: gameMasterSpeech,
    leaderSelecting: leaderSelecting,
    disableTeamSubmit: disableTeamSubmit,
    setDisableTeamSubmit: setDisableTeamSubmit,
    selectedPlayers: selectedPlayers,
    setSelectedPlayers: setSelectedPlayers,
    disableVoteBtns: disableVoteBtns,
    setDisableVoteBtns: setDisableVoteBtns,
    voteHappening: voteHappening,
    curMissionVoteDisapproves: curMissionVoteDisapproves,
    missionHappening: missionHappening,
    goingOnMission: goingOnMission,
    disableMissionActions: disableMissionActions,
    setDisableMissionActions: setDisableMissionActions,
    missionNumber: missionNumber,
    missionResultTrack: missionResultTrack,
    roomAdminName: roomAdminName,
    startGame: startGame,
    msg: msg,
    setMsg: setMsg,
    msgList: msgList,
    setMsgList: setMsgList,
    newMsg: newMsg,
    setNewMsg: setNewMsg,
    mins: mins,
    secs: secs,
    navigate: navigate,
    checkIfInGame: checkIfInGame,
  };

  const endScreenProps = {
    open: gameEnd,
    handleEndModalClose: handleEndModalClose,
    revealedPlayers: revealedPlayers,
    endMsg: endMsg
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <Routes>
          <Route path="/" element={<StartScreen {...startScreenProps} />} />
          <Route 
            path="/:room" 
            element={
              <>
                <GameScreen {...gameScreenProps} />
                <EndScreen {...endScreenProps} />
              </>
            } 
          />
          <Route 
            path="/join/:room" 
            element={
              <StartScreen {...{
                ...startScreenProps, 
                hasJoinEmbed: true, 
                youDisconnectedModalOpen: youDisconnectedModalOpen,
                setYouDisconnectedModalOpen: setYouDisconnectedModalOpen,
              }} />
            } 
          />
          <Route path="*" element={<StartScreen {...startScreenProps} />} />
        </Routes>
      </div>
    </ThemeProvider> 
  );
}

export default App;
