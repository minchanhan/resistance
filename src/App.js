import React, { useEffect, useState } from 'react';
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
    },
    colors: {
      text: {
        body: '#F4F4F4',
        link: '#FF8C00'
      }
    },
  });

  // Screen States
  const [gameScreen, setGameScreen] = useState(false); // Start screen or lobby/game screen

  // Client Settings
  const [username, setUsername] = useState("");

  // Game Settings
  // Mutable before game start 
  const [capacity, setCapacity] = useState(5);
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

  const onChangedUsername = (updatedUsername) => { // from StartScreen
    setUsername(updatedUsername);
  };

  // Listening for socket messages:
  // Joins/Disconnects:
  useEffect(() => {
    const handlePlayerJoin = (lobbyInfo) => {
      setSeats(lobbyInfo.seats);
      setCapacity(lobbyInfo.capacity);
      setRoom(lobbyInfo.room);
      setGameScreen(true);
      setRandomStatusMsg("");
    };

    socket.on("player_joined_lobby", handlePlayerJoin);
  }, [socket]);

  useEffect(() => {
    const handlePlayerLeave = (seats) => {
      setSeats(seats);
    };

    socket.on("player_left_lobby", handlePlayerLeave);

    return () => {
      socket.off("player_left_lobby", handlePlayerLeave);
    }
  }, [socket]);

  useEffect(() => {
    socket.on("no_random_game", (msg) => {
      setRandomStatusMsg(msg);
    });
  }, [socket]);

  // Game States:
  useEffect(() => {
    const handleGameEnd = (info) => {
      setRevealedPlayers(info.playerRevealArr);
      setEndMsg(info.endMsg);
      setGameEnd(true);
    };

    socket.on("set_game_end", handleGameEnd);

    return () => {
      socket.off("set_game_end", handleGameEnd);
    }
  }, [socket]);

  useEffect(() => {
    socket.on("final_username_set", (username) => {
      setUsername(username);
    });
  });

  // Game Updates:
  useEffect(() => {
    const handleSeats = (seats) => {
      setSeats([...seats]);
      setGameStarted(true);
    };

    socket.on("shuffled_seats", handleSeats);
  }, [socket]);

  useEffect(() => {
    socket.on("game_master_speech", (speech) => {
      setGameMasterSpeech(speech);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("leader_is_selecting", (isSelecting) => {
      setSelectedPlayers([]); // reset
      setLeaderSelecting(isSelecting);
      setDisableTeamSubmit(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("vote_on_these_players", (info) => { 
      setSelectedPlayers(info.selectedPlayers);
      setLeaderSelecting(false);
      setVoteHappening(true);
      setDisableVoteBtns(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("vote_track", (newCount) => {
      setCurMissionVoteDisapproves(newCount);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("go_on_mission", (onMissionTeam) => {
      setVoteHappening(false);
      setGoingOnMission(onMissionTeam);
      setDisableMissionActions(false);
    });
  });

  useEffect(() => {
    socket.on("mission_completed", (info) => { // only when mission completed AND new one starting
      setVoteHappening(true);
      setLeaderSelecting(true);
      setGoingOnMission(false);
      setDisableMissionActions(false);
      setMissionResultTrack(info.missionResultTrack);
      setMissionNumber(info.mission);
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
              randomStatusMsg={randomStatusMsg}
              capacity={capacity}
              setCapacity={setCapacity}
              selectionTime={selectionTime}
              setSelectionTime={setSelectionTime}
              privateRoom={privateRoom}
              setPrivateRoom={setPrivateRoom}
            />
          ) : gameScreen ? (
            <>
              <GameScreen
                socket={socket}
                room={room}
                username={username}
                seats={seats}
                capacity={capacity}
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
              />
              <EndScreen
                open={gameEnd}
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
