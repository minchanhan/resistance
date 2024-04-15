import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import StartScreen from './Screens/StartScreen/StartScreen';
import EndModal from './Screens/GameScreen/Modals/EndModal';
import GameScreen from './Screens/GameScreen/GameScreen';

const socket = io(process.env.REACT_APP_SERVER || "http://localhost:3001"); // connect to socket server

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
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };
  const goodTeamStyle = {
    filter: 'invert(11%) sepia(92%) saturate(4093%) hue-rotate(234deg) brightness(92%) contrast(104%)'
  };

  const navigate = useNavigate();

  // Modal States
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [youDisconnectedModalOpen, setYouDisconnectedModalOpen] = useState(false);

  // Client States
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [myTeam, setMyTeam] = useState(""); // "badTeam", "goodTeam", ""

  // Game Settings
  const [roomCode, setRoomCode] = useState(""); // logic uses roomCode, params is room
  const [roomAdminName, setRoomAdminName] = useState("");
  const [capacity, setCapacity] = useState(6);
  const [selectionTimeSecs, setSelectionTimeSecs] = useState(7 * 60);
  const [privateRoom, setPrivateRoom] = useState(true);
  const [numGames, setNumGames] = useState(1);
  const [missionTeamSizes, setMissionTeamSizes] = useState([2,3,4,3,4]);

  // Game States
  const [gameStarted, setGameStarted] = useState(false); // is game started

  const [teamSelectHappening, setTeamSelectHappening] = useState(false); // team select
  const [isMissionLeader, setIsMissionLeader] = useState(false); // is leader
  const [disableTeamSubmit, setDisableTeamSubmit] = useState(false);

  const [voteHappening, setVoteHappening] = useState(false); // vote
  const [disableVoteBtns, setDisableVoteBtns] = useState(false);

  const [missionHappening, setMissionHappening] = useState(false); // mission
  const [isGoingOnMission, setIsGoingOnMission] = useState(false);
  const [disableMissionActions, setDisableMissionActions] = useState(false);  

  // Game Screen
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [newMsg, setNewMsg] = useState(false);
  const [showHiddenChat, setShowHiddenChat] = useState(false);

  const [seats, setSeats] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]); // selected players for vote/mission  

  const [missionNumber, setMissionNumber] = useState(1);
  const [curMissionVoteDisapproves, setCurMissionVoteDisapproves] = useState(0);
  const [missionResultTrack, setMissionResultTrack] = useState(["none","none","none","none","none"]); // pass/fail

  // misc.
  const [joinRoomMsg, setJoinRoomMsg] = useState("");
  const [randomRoomMsg, setRandomRoomMsg] = useState(""); // for random room

  // End Game
  const [endMsg, setEndMsg] = useState("");
  const [revealedPlayers, setRevealedPlayers] = useState([]);

  // Timer
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [timerGoal, setTimerGoal] = useState(null); // seconds since jan 1970 + selectionTimeSecs

  /* HELPERS */
  const onChangedUsername = (updatedUsername) => { // StartScreen
    setUsername(updatedUsername);
  };

  const checkInGame = (room) => {
    socket.emit("am_i_in_room", room, (res) => {
      if (!res.inRoom) {
        navigate(`/join/${room}`, { replace: true });
      }
    });
  };

  const createRoom = () => { // StartScreen
    socket.emit("create_room", username, (res) => {
      setIsAdmin(true);
      setRoomCode(res.room);
      setRoomAdminName(username);
      navigate(`/${res.room}`, { replace: true });
    });
  };

  const joinRoom = (enteredRoomCode) => { // StartScreen
    socket.emit("join_room", username, enteredRoomCode, (res) => {
      if (res.roomExists) {
        setUsername(res.uniqueName);
        navigate(`/${res.roomCode}`, { replace: true });
      } else {
        if (enteredRoomCode === "random_join") {
          setRandomRoomMsg(res.joinRoomMsg);
        } else {
          setJoinRoomMsg(res.joinRoomMsg);
        }
      }
    });
  };

  const onChangedCapacity = (updatedCapacity) => { // GameSettings
    setCapacity(updatedCapacity);
    socket.emit("set_capacity", updatedCapacity, roomCode);
  };

  const onChangedSelectionTimeSecs = (updatedSelectionTimeSecs) => { // GameSettings
    setSelectionTimeSecs(updatedSelectionTimeSecs);
    socket.emit("set_selection_time", updatedSelectionTimeSecs, roomCode);
  };

  const onChangedPrivateRoom = () => { // GameSettings
    setPrivateRoom(!privateRoom);
    socket.emit("set_private_room", !privateRoom, roomCode);
  };

  const sendMessage = (msgData) => {
    socket.emit("send_msg", msgData, roomCode, isAdmin, username);
  };

  const startGame = () => { // GameScreen
    socket.emit("admin_start_game");
    socket.emit("get_my_team", username, roomCode, (team) => {
      setMyTeam(team);
    });
  };

  const handleTeamSubmit = () => {
    socket.emit("selected_players_for_vote", { selectedPlayers: selectedPlayers, roomCode: roomCode });
    setDisableTeamSubmit(true); // 1b
  };

  const handleVote = (approve) => {
    socket.emit("vote_is_in", { username: username, selectedPlayers: selectedPlayers, approve: approve, roomCode: roomCode });
    setDisableVoteBtns(true); // 2b
  };

  const handleMission = (pass) => {
    socket.emit("mission_result_is_in", { pass: pass, roomCode: roomCode });
    setDisableMissionActions(true); // 3b
  };

  const handleEndModalClose = () => { // GameScreen
    setEndModalOpen(false);
  };

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
    // functions
    const handleConnect = () => {
      console.log("client connected");
    };

    const handleDisconnect = (reason, details) => {
      if (socket.active) {
        // temporary disconnection, the socket will automatically try to reconnect
      } else {
        // the connection was forcefully closed by the server or the client itself
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log("disconnected fully", reason, details);
      }
    };

    const handleSeatsUpdate = (seats) => {
      setSeats(seats);
    };

    const handleGameSettingsChange = (settings) => { 
      setRoomCode(settings.roomCode);
      setRoomAdminName(settings.roomAdminName);
      setCapacity(settings.capacity);
      setSelectionTimeSecs(settings.selectionTimeSecs);
      setPrivateRoom(settings.privateRoom);
      setNumGames(settings.numGames);
      setMissionTeamSizes(settings.missionTeamSizes);
      console.log("settings updated");
    };

    const handleMsgListUpdate = (msgList) => {
      setMsgList(msgList);
      if (!showHiddenChat) setNewMsg(true);
    };

    
    const handleLeaderSelect = (info) => { 
      setGameStarted(true); // GAME START WHEN LEADER STARTS SELECTING
      setEndModalOpen(false); // If the modal is still up, take it down
      setSelectedPlayers([]); // reset

      setIsMissionLeader(info.isSelecting); // 1a
      setDisableTeamSubmit(false); // 1a
      setTeamSelectHappening(true);
      setVoteHappening(false); // 2c
      setMissionHappening(false); // 3c
      setIsGoingOnMission(false);

      const now = Math.floor(new Date().getTime() / 1000);
      setTimerGoal(now + info.secs);
    };

    const handlePlayerVoteStart = (info) => { 
      setSelectedPlayers(info.selectedPlayers);

      setIsMissionLeader(false); // 1c
      setTeamSelectHappening(false);
      setVoteHappening(true); // 2a
      setDisableVoteBtns(false); // 2a
    };
    
    const handleMissionStart = (onMissionTeam) => {
      setVoteHappening(false); // 2c
      setIsGoingOnMission(onMissionTeam); // 3a
      setMissionHappening(true);
      setDisableMissionActions(false); // 3a
    };


    const handleVoteTrackChange = (newCount) => {
      setCurMissionVoteDisapproves(newCount);
    };

    const handleMissionComplete = (info) => { // only when mission completed AND new one starting
      setIsGoingOnMission(false); // 3c
      setMissionHappening(false);

      // update mission stats
      setMissionResultTrack(info.missionResultTrack);
      setMissionNumber(info.mission);
    };

    const handleKickedPlayer = () => { 
      // reset all states
      // navigate to start screen
      // you were kicked modal
    };

    const handleGameEnd = (info) => {
      // handle end game
      setRevealedPlayers(info.playerRevealArr);
      setEndMsg(info.endMsg);
      if (!info.kicked) setEndModalOpen(true);

    };

    // listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    /*
    socket.io.on("reconnect", handleReconnect);
    socket.io.on("reconnect_attempt", handleReconnectAttempt);
    socket.io.on("reconnect_error", handleReconnectError);
    socket.io.on("reconnect_failed", handleReconnectFailed);
    */

    socket.on("seats_update", handleSeatsUpdate);
    socket.on("game_settings_update", handleGameSettingsChange);
    socket.on("msg_list_update", handleMsgListUpdate);

    socket.on("leader_is_selecting", handleLeaderSelect);
    socket.on("vote_on_these_players", handlePlayerVoteStart);
    socket.on("go_on_mission", handleMissionStart);

    socket.on("vote_track", handleVoteTrackChange);
    socket.on("mission_completed", handleMissionComplete);

    socket.on("kicked_player", handleKickedPlayer);
    socket.on("set_game_end", handleGameEnd);
    
    return () => {
      // cleanup
      socket.off("connect", handleConnect);

      socket.off("seats_update", handleSeatsUpdate);
      socket.off("game_settings_update", handleGameSettingsChange);
      socket.off("msg_list_update", handleMsgListUpdate);

      socket.off("leader_is_selecting", handleLeaderSelect);
      socket.off("vote_on_these_players", handlePlayerVoteStart);
      socket.off("go_on_mission", handleMissionStart);

      socket.off("vote_track", handleVoteTrackChange);
      socket.off("mission_completed", handleMissionComplete);

      socket.off("kicked_player", handleKickedPlayer);
      socket.off("set_game_end", handleGameEnd);
    };
  });

  const startScreenProps = {
    navigate: navigate,
    username: username, 
    onChangedUsername: onChangedUsername,
    createRoom: createRoom,
    joinRoom: joinRoom,
    joinRoomMsg: joinRoomMsg,
    setJoinRoomMsg: setJoinRoomMsg,
    randomRoomMsg: randomRoomMsg,
    goodTeamStyle: goodTeamStyle,
    badTeamStyle: badTeamStyle
  };

  const gameScreenProps = {
    startGame: startGame,
    handleTeamSubmit: handleTeamSubmit,
    handleVote: handleVote,
    handleMission: handleMission,
    sendMessage: sendMessage,
    checkInGame: checkInGame,

    username: username,
    isAdmin: isAdmin,
    myTeam: myTeam,
    roomCode: roomCode,
    roomAdminName: roomAdminName,

    capacity: capacity,
    onChangedCapacity: onChangedCapacity,
    selectionTimeSecs: selectionTimeSecs,
    onChangedSelectionTimeSecs: onChangedSelectionTimeSecs,
    privateRoom: privateRoom,
    onChangedPrivateRoom: onChangedPrivateRoom,
    numGames: numGames,
    missionTeamSizes: missionTeamSizes,

    gameStarted: gameStarted,
    isMissionLeader: isMissionLeader,
    disableTeamSubmit: disableTeamSubmit,
    voteHappening: voteHappening,
    disableVoteBtns: disableVoteBtns,

    missionHappening: missionHappening,
    isGoingOnMission: isGoingOnMission,
    disableMissionActions: disableMissionActions,

    msg: msg,
    setMsg: setMsg,
    msgList: msgList,
    newMsg: newMsg,
    setNewMsg: setNewMsg,
    showHiddenChat: showHiddenChat,
    setShowHiddenChat: setShowHiddenChat,

    seats: seats,
    selectedPlayers: selectedPlayers,
    setSelectedPlayers: setSelectedPlayers,
    goodTeamStyle: goodTeamStyle,
    badTeamStyle: badTeamStyle,

    missionNumber: missionNumber,
    curMissionVoteDisapproves: curMissionVoteDisapproves,
    missionResultTrack: missionResultTrack,
    
    mins: mins,
    secs: secs,
  };

  const endScreenProps = {
    open: endModalOpen,
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
              roomCode !== "" ?
                <>
                  <GameScreen {...gameScreenProps} />
                  <EndModal {...endScreenProps} />
                </> 
                : <StartScreen {...startScreenProps} />
            } 
          />
          <Route
            path="/join/:room"
            element={
              <StartScreen {...{
                ...startScreenProps, 
                hasJoinEmbed: true
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
