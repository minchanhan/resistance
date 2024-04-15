import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import StartScreen from './Screens/StartScreen/StartScreen';
import EndModal from './Screens/GameScreen/Modals/EndModal';
import GameScreen from './Screens/GameScreen/GameScreen';

const socket = io(
  process.env.REACT_APP_SERVER || "http://localhost:3001",
  {
    reconnectionDelay: 1000, // defaults to 1000
    reconnectionDelayMax: 5000, // defaults to 5000
    // retries: 3,
    // ackTimeout: 5000,
  }
); // connect to socket server

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
  const [selectionSecs, setSelectionSecs] = useState(7 * 60);
  const [privateRoom, setPrivateRoom] = useState(true);
  const [numGames, setNumGames] = useState(1);
  const [missionTeamSizes, setMissionTeamSizes] = useState([2,3,4,3,4]);

  // Game States
  const [gameStarted, setGameStarted] = useState(false); // is game started

  const [teamSelectHappening, setTeamSelectHappening] = useState(false); // show buttons?
  const [isMissionLeader, setIsMissionLeader] = useState(false); // is leader
  const [disableTeamSubmit, setDisableTeamSubmit] = useState(false); // used by client only

  const [voteHappening, setVoteHappening] = useState(false); // // show buttons!
  const [disableVoteBtns, setDisableVoteBtns] = useState(false); // used by client only

  const [missionHappening, setMissionHappening] = useState(false); // mission
  const [isGoingOnMission, setIsGoingOnMission] = useState(false); // show buttons?
  const [disableMissionActions, setDisableMissionActions] = useState(false); // used by client only 

  // Game Screen
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [newMsg, setNewMsg] = useState(false);
  const [showHiddenChat, setShowHiddenChat] = useState(false);

  const [seats, setSeats] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]); // used only by LEADER when selecting team to send

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
  const [timerGoal, setTimerGoal] = useState(null); // seconds since jan 1970 + selectionSecs

  /* --- HELPERS --- */
  const checkInGame = (room) => {
    socket.emit("am_i_in_room", room, (res) => {
      if (!res.inRoom) {
        navigate(`/join/${room}`, { replace: true });
      }
    });
  };

  const onChangedUsername = (updatedUsername) => { // StartScreen
    setUsername(updatedUsername);
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
    console.log("join room with ", enteredRoomCode);
    socket.emit("join_room", username, enteredRoomCode, (res) => {
      if (res.roomExists) {
        setUsername(res.uniqueName);
        navigate(`/${res.roomCode}`, { replace: true });
      } else {
        if (enteredRoomCode === "random_join") {
          setRandomRoomMsg(res.msg);
        } else {
          setJoinRoomMsg(res.msg);
        }
      }
    });
  };

  const onChangedCapacity = (updatedCapacity) => { // GameSettings
    setCapacity(updatedCapacity);
    socket.emit("set_capacity", updatedCapacity, roomCode);
  };

  const onChangedSelectionSecs = (updatedSelectionSecs) => { // GameSettings
    setSelectionSecs(updatedSelectionSecs);
    socket.emit("set_selection_secs", updatedSelectionSecs, roomCode);
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
    socket.emit("team_submitted_for_vote", { selectedPlayers: selectedPlayers, roomCode: roomCode });
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

  /* --- TIMER --- */
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

  /* --- EVENT LISTENERS --- */
  useEffect(() => {
    // functions
    const handleConnect = () => {
      if (socket.recovered) {
        console.log(`socket recovered with id: ${socket.id}`);
      } else {
        console.log(`brand new connection with id: ${socket.id}`);
        console.log("private room on join: ", privateRoom);
      }
    };

    const handleDisconnect = (reason, details) => {
      if (socket.active) {
        // temporary disconnection, the socket will automatically try to reconnect
        console.log("temporary disconnection, try to reconnect", reason, details);
      } else {
        // the connection was forcefully closed by the server or the client itself
        console.log("disconnected fully", reason, details);
        // show you disconnected modal?
      }
    };

    const handleGameSettingsChange = (settings) => { 
      setRoomCode(settings.roomCode);
      setRoomAdminName(settings.roomAdminName);
      setCapacity(settings.capacity);
      setSelectionSecs(settings.selectionSecs);
      setPrivateRoom(settings.privateRoom);
      setNumGames(settings.numGames);
      setMissionTeamSizes(settings.missionTeamSizes);
    };
    const handleCapacityChange = (newCapacity) => {
      setCapacity(newCapacity);
    };
    const handleSelectionSecsChange = (newSecs) => {
      setSelectionSecs(newSecs);
    };
    const handlePrivateRoomChange = (newPrivateRoom) => {
      setPrivateRoom(newPrivateRoom);
    };

    const handleMsgListUpdate = (msgList) => {
      setMsgList(msgList);
      if (!showHiddenChat) setNewMsg(true);
    };

    const handleSeatsUpdate = (seats) => {
      setSeats(seats);
    };

    const handleTeamSelectStart = (info) => { 
      setGameStarted(true); // GAME START WHEN LEADER STARTS SELECTING
      setEndModalOpen(false); // If the modal is still up, take it down
      setSelectedPlayers([]); // reset

      setIsMissionLeader(info.isSelecting); // 1a
      setDisableTeamSubmit(false); // 1a
      setTeamSelectHappening(true);
      setVoteHappening(false); // 2c
      setMissionHappening(false); // 3c
      setIsGoingOnMission(false);

      // update mission stats
      setMissionResultTrack(info.missionResultTrack);
      setMissionNumber(info.mission);

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
    socket.io.on("ping", () => {
      console.log("ping from pingInterval");
    });
    socket.on("ping", () => {
      console.log("ping from interval");
    });

    socket.io.on("reconnect", () => {
      console.log("reconnect called");
      console.log("from reconnect: ", socket.id);
    });
    socket.io.on("reconnect_attempt", () => {
      console.log("reconnect attempt called");
      console.log("from reconnect attempt: ", socket.id);
    });
    socket.io.on("reconnect_error", () => {
      console.log("reconnect error called");
      console.log("from reconnect error: ", socket.id);
    });
    socket.io.on("reconnect_failed", () => {
      console.log("reconnect failed called");
      console.log("from reconnect failed: ", socket.id);
    });*/
    
    socket.on("game_settings_update", handleGameSettingsChange);
    socket.on("capacity_change", handleCapacityChange);
    socket.on("selection_secs_change", handleSelectionSecsChange);
    socket.on("private_room_change", handlePrivateRoomChange);
    
    socket.on("msg_list_update", handleMsgListUpdate);
    socket.on("seats_update", handleSeatsUpdate);

    socket.on("team_select_happening", handleTeamSelectStart);
    socket.on("vote_happening", handlePlayerVoteStart);
    socket.on("mission_happening", handleMissionStart);
    socket.on("vote_track", handleVoteTrackChange);

    socket.on("kicked_player", handleKickedPlayer);
    socket.on("set_game_end", handleGameEnd);
    
    return () => {
      // cleanup
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

      socket.off("seats_update", handleSeatsUpdate);
      socket.off("game_settings_update", handleGameSettingsChange);
      socket.off("msg_list_update", handleMsgListUpdate);

      socket.off("team_select_happening", handleTeamSelectStart);
      socket.off("vote_happening", handlePlayerVoteStart);
      socket.off("mission_happening", handleMissionStart);
      socket.off("vote_track", handleVoteTrackChange);

      socket.off("kicked_player", handleKickedPlayer);
      socket.off("set_game_end", handleGameEnd);
    };
  });

  /* --- PROPS TO CHILDREN --- */
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
    selectionSecs: selectionSecs,
    onChangedSelectionSecs: onChangedSelectionSecs,
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
