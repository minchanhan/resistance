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
    reconnectionDelay: 5000, // defaults to 1000
    reconnectionDelayMax: 5000, // defaults to 5000
    // retries: 3, for exactly once
    // ackTimeout: 5000, for exactly once
    transports: ["websocket"],
  }
); // connect to socket server

function App() {
  useEffect(() => {
    const onBeforeUnload = (e) => {
      e.preventDefault();
      console.log("onbeforeunload");
    };

    const handleUnload = () => {
      socket.emit("remove_me", username, roomCode, isAdmin);
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  });

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
  const [youDisconnectedMsg, setYouDisconnectedMsg] = useState("");

  // Client States
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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
  const [msg, setMsg] = useState(""); // used to track
  const [msgList, setMsgList] = useState([]); // client's current msg (NEED TO RESET ON DISCONNECT)
  const [newMsg, setNewMsg] = useState(false);
  const [showHiddenChat, setShowHiddenChat] = useState(false);

  const [seats, setSeats] = useState([]); // (NEED TO RESET ON DISCONNECT)
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const [missionNumber, setMissionNumber] = useState(1);
  const [curMissionVoteDisapproves, setCurMissionVoteDisapproves] = useState(0);
  const [missionResultTrack, setMissionResultTrack] = useState(["none","none","none","none","none"]); // pass/fail
  const [missionHistory, setMissionHistory] = useState([[],[],[],[],[]]);

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
    socket.emit("join_room", username, enteredRoomCode, (res) => {
      if (res.roomExists) {
        setUsername(res.uniqueName);
        setRoomCode(res.roomCode);
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
    socket.emit("send_msg", msgData, roomCode, username, isAdmin);
  };

  const startGame = () => { // GameScreen
    socket.emit("admin_start_game", roomCode);
  };

  const handleTeamSubmit = () => {
    socket.emit("team_submitted_for_vote", { 
      selectedPlayers: selectedPlayers, roomCode: roomCode 
    });
    setDisableTeamSubmit(true); // 1b
  };

  const handleVote = (approve) => {
    socket.emit(
      "vote_is_in", 
      { 
        username: username, 
        roomCode: roomCode,
        approve: approve, 
      }
    );
    setDisableVoteBtns(true); // 2b
  };

  const handleMissionIn = (pass) => {
    socket.emit("mission_entry_is_in", { 
      pass: pass, roomCode: roomCode 
    });
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
      }

      // test connection state recovery
      /* setTimeout(() => {
        // close the low-level connection and trigger a reconnection
        socket.io.engine.close();
      }, Math.random() * 5000 + 1000); */
    };

    const handleDisconnect = (reason, details) => {
      if (socket.active) {
        // temporary disconnection, the socket will automatically try to reconnect
        console.log("temporary disconnection, try to reconnect", reason, details);
      } else {
        // the connection was forcefully closed by the server or the client itself
        console.log("disconnected fully", reason, details);
        // maybe show a are you still here? and if not responding, then close socket connection
        // and remove from game
        // but shouldn't call from here, should call from beforeunload
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
      if (!gameStarted) {
        setGameStarted(true);
      }
      socket.emit("request_seats", username, roomCode);

      setEndModalOpen(false); // If the modal is still up, take it down
      setSelectedPlayers([]); // reset

      setTeamSelectHappening(true); // 1
      setIsMissionLeader(info.isLeader); // 1a
      setDisableTeamSubmit(false); // 1a

      setVoteHappening(false); // 2c
      setMissionHappening(false); // 3c
      setIsGoingOnMission(false);

      // update mission stats
      setMissionNumber(info.curMission);
      setCurMissionVoteDisapproves(info.curMissionVoteDisapproves);
      setMissionResultTrack(info.missionResultTrack);
      setMissionHistory(info.missionHistory);
      console.log(info.missionHistory);

      const now = Math.floor(new Date().getTime() / 1000); // in secs
      setTimerGoal(now + selectionSecs);
    };

    const handlePlayerVoteStart = (info) => {
      socket.emit("request_seats", username, roomCode);
      
      setSelectedPlayers(info.selectedPlayers);
      setTeamSelectHappening(false);
      setIsMissionLeader(false); // 1c

      setVoteHappening(true); // 2a
      setDisableVoteBtns(false); // 2a
    };
    
    const handleMissionStart = (onMissionTeam) => {
      console.log("mission_happening")
      setVoteHappening(false); // 2c
      setMissionHappening(true);
      setIsGoingOnMission(onMissionTeam); // 3a
      setDisableMissionActions(false); // 3a
    };

    const handleKickedPlayer = () => { 
      // frontend states to reset on disconnect:
      setMsgList([]);
      setSeats([]);

      setRoomCode(""); // will take them to start screen room embeded
      setYouDisconnectedMsg("Reason: kicked");
      setYouDisconnectedModalOpen(true);
      socket.emit("leave_room", roomCode);
    };

    const handleAdminChange = (newIsAdmin) => {
      setIsAdmin(newIsAdmin);
    };

    const handleGameEnd = (info) => {
      setGameStarted(false);
      setRevealedPlayers(info.playerRevealArr);
      setEndMsg(info.endMsg);
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

    socket.on("kicked_player", handleKickedPlayer);
    socket.on("is_admin_update", handleAdminChange);
    socket.on("set_game_end", handleGameEnd);
    
    return () => {
      // cleanup
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

      socket.off("game_settings_update", handleGameSettingsChange);
      socket.off("capacity_change", handleCapacityChange);
      socket.off("selection_secs_change", handleSelectionSecsChange);
      socket.off("private_room_change", handlePrivateRoomChange);

      socket.off("msg_list_update", handleMsgListUpdate);
      socket.off("seats_update", handleSeatsUpdate);

      socket.off("team_select_happening", handleTeamSelectStart);
      socket.off("vote_happening", handlePlayerVoteStart);
      socket.off("mission_happening", handleMissionStart);

      socket.off("kicked_player", handleKickedPlayer);
      socket.off("is_admin_update", handleAdminChange);
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
    badTeamStyle: badTeamStyle,
    youDisconnectedModalOpen: youDisconnectedModalOpen,
    setYouDisconnectedModalOpen: setYouDisconnectedModalOpen,
    youDisconnectedMsg: youDisconnectedMsg,
  };

  const gameScreenProps = {
    startGame: startGame,
    handleTeamSubmit: handleTeamSubmit,
    handleVote: handleVote,
    handleMissionIn: handleMissionIn,
    sendMessage: sendMessage,
    checkInGame: checkInGame,

    username: username,
    isAdmin: isAdmin,
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
    teamSelectHappening: teamSelectHappening,
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
    missionHistory: missionHistory,
    
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
                : <StartScreen {...{
                    ...startScreenProps, 
                    hasRoomParam: true
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
