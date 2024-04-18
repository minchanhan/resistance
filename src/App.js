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
    reconnectionDelayMax: 3000, // defaults to 5000
    transports: ["websocket"],
  }
); 

function App() {
  useEffect(() => {
    const onPageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
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
  const [leaderUsername, setLeaderUsername] = useState("");
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

  const resetStatesAfterDisconnect = () => {
    if (roomCode !== "") {
      setYouDisconnectedMsg("You've unfortunately been disconnected, please rejoin!");
      setYouDisconnectedModalOpen(true);
    }

    // frontend states to reset on disconnect:
    setMsgList([]);
    setSeats([]);
    setIsAdmin(false);
    setGameStarted(false);
    setDisableVoteBtns(false);
    setDisableMissionActions(false);
    setSelectedPlayers([]);
    setRoomCode(""); // will take them to start screen room embeded
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
        socket.emit("i_reconnected");
      } else {
        console.log(`brand new connection with id: ${socket.id}`);
        resetStatesAfterDisconnect(); // called in case a disconnect happened
      }

      // test connection state recovery
      /* setTimeout(() => {
        // close the low-level connection and trigger a reconnection
        socket.io.engine.close();
      }, 2000); */
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
    const handleCapacityChange = (newCapacity, newMissionTeamSizes) => {
      setCapacity(newCapacity);
      setMissionTeamSizes(newMissionTeamSizes);
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
    const handlePlayerLeftSeat = () => {
      socket.emit("request_seats", username, roomCode);
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
      setLeaderUsername(info.leaderUsername);
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
      setLeaderUsername("");

      setVoteHappening(true); // 2a
      setDisableVoteBtns(false); // 2a
    };
    
    const handleMissionStart = (onMissionTeam) => {
      setVoteHappening(false); // 2c
      setMissionHappening(true);
      setIsGoingOnMission(onMissionTeam); // 3a
      setDisableMissionActions(false); // 3a
    };

    const handleAdminChange = (newIsAdmin) => {
      setIsAdmin(newIsAdmin);
    };

    const handleKickedPlayer = () => {
      console.log("you've been kicked");
      resetStatesAfterDisconnect();
      setYouDisconnectedMsg("Reason: kicked");
      setYouDisconnectedModalOpen(true);
      socket.emit("leave_room", roomCode);
    };
    const handleDisconnectedPlayer = () => {
      console.log("you've been disconnected");
      resetStatesAfterDisconnect();
      
    };

    const handleRestartSelect = () => {
      setSelectedPlayers([]);
    };

    const handleGameEnd = (info) => {
      setGameStarted(false);
      setRevealedPlayers(info.playerRevealArr);
      setEndMsg(info.endMsg);
      setLeaderUsername("");
    };

    // listeners
    socket.on("connect", handleConnect);
    
    socket.on("game_settings_update", handleGameSettingsChange);
    socket.on("capacity_change", handleCapacityChange);
    socket.on("selection_secs_change", handleSelectionSecsChange);
    socket.on("private_room_change", handlePrivateRoomChange);
    
    socket.on("msg_list_update", handleMsgListUpdate);
    socket.on("seats_update", handleSeatsUpdate);
    socket.on("player_left_seat", handlePlayerLeftSeat);

    socket.on("team_select_happening", handleTeamSelectStart);
    socket.on("vote_happening", handlePlayerVoteStart);
    socket.on("mission_happening", handleMissionStart);

    socket.on("is_admin_update", handleAdminChange);
    socket.on("kicked_player", handleKickedPlayer);
    socket.on("disconnected_player", handleDisconnectedPlayer);
    socket.on("restart_select", handleRestartSelect);
    socket.on("set_game_end", handleGameEnd);
    
    return () => {
      // cleanup
      socket.off("connect", handleConnect);

      socket.off("game_settings_update", handleGameSettingsChange);
      socket.off("capacity_change", handleCapacityChange);
      socket.off("selection_secs_change", handleSelectionSecsChange);
      socket.off("private_room_change", handlePrivateRoomChange);

      socket.off("msg_list_update", handleMsgListUpdate);
      socket.off("seats_update", handleSeatsUpdate);
      socket.off("player_left_seat", handlePlayerLeftSeat);

      socket.off("team_select_happening", handleTeamSelectStart);
      socket.off("vote_happening", handlePlayerVoteStart);
      socket.off("mission_happening", handleMissionStart);

      socket.off("is_admin_update", handleAdminChange);
      socket.off("kicked_player", handleKickedPlayer);
      socket.off("disconnected_player", handleDisconnectedPlayer);
      socket.off("restart_select", handleRestartSelect); // on player leave
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
    leaderUsername: leaderUsername,
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
