import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

import StartScreen from './Screens/StartScreen/StartScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EndScreen from './Screens/EndScreen/EndScreen';
import GameScreen from './Screens/GameScreen/GameScreen';

const socket = io.connect("http://localhost:3001"); // connect to socket server

function App() {
  useEffect(() => {
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
        main: getComputedStyle(document.body).getPropertyValue('--secondary-color')
      },
      green: {
        main: getComputedStyle(document.body).getPropertyValue('--my-green')
      },
      red: {
        main: getComputedStyle(document.body).getPropertyValue('--my-red')
      },
    },
    colors: {
      text: {
        body: '#F4F4F4',
        link: '#FF8C00'
      }
    },
    typography: {
      "fontFamily": `'Impact', 'Arial Narrow Bold', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,   
     }
  });

  // Screen States
  const [gameScreen, setGameScreen] = useState(false); // Start screen or lobby/game screen

  // Client Settings
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [roomAdminName, setRoomAdminName] = useState("");

  // Game Settings
  // Mutable before game start 
  const [capacity, setCapacity] = useState(6);
  const [selectionTime, setSelectionTime] = useState(7);
  const [privateRoom, setPrivateRoom] = useState(true);

  // Immuatable before game start 
  const [room, setRoom] = useState("");
  
  // End Game
  const [endMsg, setEndMsg] = useState("");
  const [revealedPlayers, setRevealedPlayers] = useState([]);

  // Other msgs
  const [randomStatusMsg, setRandomStatusMsg] = useState("");
  const [gameMasterSpeech, setGameMasterSpeech] = useState("Welcome... to the resistance");

  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [newMsg, setNewMsg] = useState(false);

  // Game States
  const [seats, setSeats] = useState([]);
  const [gameStarted, setGameStarted] = useState(false); // If false, then in lobby
  const [gameEnd, setGameEnd] = useState(false); // is end modal showing

  const [leaderSelecting, setLeaderSelecting] = useState(false); // leader selecting
  const [disableTeamSubmit, setDisableTeamSubmit] = useState(false);

  const [voteHappening, setVoteHappening] = useState(false); // vote
  const [disableVoteBtns, setDisableVoteBtns] = useState(false);

  const [goingOnMission, setGoingOnMission] = useState(false); // mission
  const [disableMissionActions, setDisableMissionActions] = useState(false);

  const [missionNumber, setMissionNumber] = useState(1);
  const [curMissionVoteDisapproves, setCurMissionVoteDisapproves] = useState(0);
  const [missionResultTrack, setMissionResultTrack] = useState(["none","none","none","none","none"]); // pass/fail
  const [selectedPlayers, setSelectedPlayers] = useState([]); // selected players for vote/mission  

  // Timer
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [timerGoal, setTimerGoal] = useState(null); // seconds since jan 1970 + selectionTime
  const [timerOn, setTimerOn] = useState(false);

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

  useEffect(() => {
    let interval = setInterval(() => {
      if (!timerOn) return;
      const now = Math.floor(new Date().getTime() / 1000);
      const mins = Math.floor((timerGoal - now) / 60);
      const secs = (timerGoal - now) - (mins * 60);
      setSecs(secs);
      setMins(mins);
      if (!(secs > 0 || mins > 0)) {
        setSecs(0);
        setMins(0);
        setTimerOn(false);
        return;
      }
    }, 900);

    return () => {
      clearInterval(interval);
    };
  }, [timerOn, mins, secs]);

  // Listening for socket messages:
  // Joins/Disconnects:
  useEffect(() => { // When player clicks join
    const handlePlayerJoin = (lobbyInfo) => {
      setSeats(lobbyInfo.seats);
      setRoom(lobbyInfo.room);
      setRoomAdminName(lobbyInfo.roomAdmin);
      setGameScreen(true);
      setRandomStatusMsg("");
    };

    socket.on("player_joined_lobby", handlePlayerJoin);
  }, [socket]);

  useEffect(() => {
    socket.on("final_username_set", (username) => {
      setUsername(username);
    });
  });

  useEffect(() => {
    socket.on("no_random_game", (msg) => {
      setRandomStatusMsg(msg);
    });
  }, [socket]);

  // Game Settings Changed:
  useEffect(() => {
    socket.on("game_settings_changed", (settings) => { 
      setCapacity(settings.capacity);
      setSelectionTime(settings.selectionTime);
      setPrivateRoom(settings.privateRoom);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("kicked_player", () => { 
      setGameScreen(false);
      setRoomAdminName("");
      setRoom("");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("room_admin_changed", (adminInfo) => { 
      setIsAdmin(adminInfo.isAdmin);
      setRoomAdminName(adminInfo.adminName);
      socket.emit("set_room_admin", adminInfo.isAdmin);
    });
  }, [socket]);

  // Game States:
  useEffect(() => {
    const handleGameEnd = (info) => {
      // handle end game
      setRevealedPlayers(info.playerRevealArr);
      setEndMsg(info.endMsg);
      if (!info.kicked) setGameEnd(true);

      // reset game actions to defaults
      setLeaderSelecting(false);
      setDisableTeamSubmit(false);
      setVoteHappening(false);
      setDisableVoteBtns(false);
      setGoingOnMission(false);
      setDisableMissionActions(false);

      // reset lobby
      setGameStarted(false);
      setMissionNumber(1);
      setCurMissionVoteDisapproves(0);
      setMissionResultTrack(["none","none","none","none","none"]);
      setSelectedPlayers([]);

      // reset team select timer
      setTimerOn(false);
      setSecs(0);
      setMins(0);
    };

    socket.on("set_game_end", handleGameEnd);
  }, [socket]);

  // Game Updates:
  useEffect(() => {
    const handleSeats = (seats) => {
      setSeats([...seats]);
    };

    socket.on("seats_info_share", handleSeats);
  }, [socket]);

  useEffect(() => {
    socket.on("game_master_speech", (speech) => {
      setGameMasterSpeech(speech);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("leader_is_selecting", (info) => {
      const now = Math.floor(new Date().getTime() / 1000);
      console.log(now);
      console.log(now + (info.mins * 60));
      setTimerGoal(now + (info.mins * 60));
      setTimerOn(true);

      setGameStarted(true); // GAME START WHEN LEADER STARTS SELECTING
      setGameEnd(false); // If the modal is still up for some reason, take it down
      setSelectedPlayers([]); // reset
      setLeaderSelecting(info.isSelecting); // 1a
      setDisableTeamSubmit(false); // 1a
    });
  }, [socket]);

  useEffect(() => {
    socket.on("vote_on_these_players", (info) => { 
      setSelectedPlayers(info.selectedPlayers);
      setLeaderSelecting(false); // 1c
      setVoteHappening(true); // 2a
      setDisableVoteBtns(false); // 2a
    });
  }, [socket]);

  useEffect(() => {
    socket.on("vote_track", (newCount) => {
      setCurMissionVoteDisapproves(newCount);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("go_on_mission", (onMissionTeam) => {
      setVoteHappening(false); // 2c
      setGoingOnMission(onMissionTeam); // 3a
      setDisableMissionActions(false); // 3a
    });
  });

  useEffect(() => {
    socket.on("mission_completed", (info) => { // only when mission completed AND new one starting
      setGoingOnMission(false); // 3c

      // update mission stats
      setMissionResultTrack(info.missionResultTrack);
      setMissionNumber(info.mission);
    });
  }, [socket]);

  // messages:
  useMemo(() => { // listen
    socket.on("receive_msg", (msgData) => {
      setMsgList((msgList) => [...msgList, msgData]);
      setNewMsg(true);
    });
  }, [socket]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          !gameScreen ? (
            <StartScreen 
              socket={socket} 
              username={username} 
              onChangedUsername={onChangedUsername}
              setIsAdmin={setIsAdmin}
              randomStatusMsg={randomStatusMsg}
            />
          ) : gameScreen ? (
            <>
              <GameScreen
                socket={socket}
                username={username}
                room={room}
                isAdmin={isAdmin}
                seats={seats}
                capacity={capacity}
                onChangedCapacity={onChangedCapacity}
                selectionTime={selectionTime}
                onChangedSelectionTime={onChangedSelectionTime}
                privateRoom={privateRoom}
                onChangedPrivateRoom={onChangedPrivateRoom}
                gameStarted={gameStarted}
                gameMasterSpeech={gameMasterSpeech}
                leaderSelecting={leaderSelecting}
                disableTeamSubmit={disableTeamSubmit}
                setDisableTeamSubmit={setDisableTeamSubmit}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                disableVoteBtns={disableVoteBtns}
                setDisableVoteBtns={setDisableVoteBtns}
                voteHappening={voteHappening}
                curMissionVoteDisapproves={curMissionVoteDisapproves}
                goingOnMission={goingOnMission}
                disableMissionActions={disableMissionActions}
                setDisableMissionActions={setDisableMissionActions}
                missionNumber={missionNumber}
                missionResultTrack={missionResultTrack}
                roomAdminName={roomAdminName}
                startGame={startGame}
                msg={msg}
                setMsg={setMsg}
                msgList={msgList}
                setMsgList={setMsgList}
                newMsg={newMsg}
                setNewMsg={setNewMsg}
                mins={mins}
                secs={secs}
              />
              <EndScreen
                open={gameEnd}
                handleEndModalClose={handleEndModalClose}
                revealedPlayers={revealedPlayers}
                endMsg={endMsg}
              />
            </>
          ) : (
            <>Some sort of error lol</>
          )
        }
      </div>
    </ThemeProvider> 
  );
}

export default App;
