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

  const [gameScreen, setGameScreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [endMsg, setEndMsg] = useState("");
  const [revealedPlayers, setRevealedPlayers] = useState([]);
  const [username, setUsername] = useState("");
  const [randomStatusMsg, setRandomStatusMsg] = useState("");

  const [numPlayers, setNumPlayers] = useState(0); // capacity
  const [room, setRoom] = useState("");
  const [seats, setSeats] = useState([]);

  const [gameMasterSpeech, setGameMasterSpeech] = useState("Welcome... to the resistance");
  const [leaderSelecting, setLeaderSelecting] = useState(false);
  const [disableTeamSubmit, setDisableTeamSubmit] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [disableVoteBtns, setDisableVoteBtns] = useState(false);
  const [voteHappening, setVoteHappening] = useState(false);
  const [curMissionVoteDisapproves, setCurMissionVoteDisapproves] = useState(0);
  const [missionNumber, setMissionNumber] = useState(1);
  const [missionResultTrack, setMissionResultTrack] = useState(["none","none","none","none","none"]);

  const [goingOnMission, setGoingOnMission] = useState(false);
  const [disableMissionActions, setDisableMissionActions] = useState(false);

  // Game Settings:
  const [capacity, setCapacity] = useState(5);
  const [selectionTime, setSelectionTime] = useState(7);
  const [privateRoom, setPrivateRoom] = useState(true);

  const onChangedUsername = (updatedUsername) => {
    setUsername(updatedUsername);
  };

  useEffect(() => {
    socket.on("game_master_speech", (speech) => {
      setGameMasterSpeech(speech);
      console.log("game_master_speech called client");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("leader_is_selecting", (isSelecting) => {
      console.log("leader has been given powers");
      setSelectedPlayers([]); // reset
      setLeaderSelecting(isSelecting);
      setDisableTeamSubmit(false);
    });
  }, [socket]);

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
    const handlePlayerJoin = (lobbyInfo) => {
      setSeats(lobbyInfo.seats);
      setNumPlayers(lobbyInfo.numPlayers);
      setRoom(lobbyInfo.room);
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
    const handlePlayerLeave = (seats) => {
      setSeats(seats);
    };

    socket.on("player_left_lobby", handlePlayerLeave);

    return () => {
      socket.off("player_left_lobby", handlePlayerLeave);
    }
  }, [socket]);

  useEffect(() => {
    const handleSeats = (seats) => {
      console.log("receiving seats ", seats);
      setSeats([...seats]);
      setGameStarted(true);
    };

    socket.on("shuffled_seats", handleSeats);
  }, [socket]);

  useEffect(() => {
    socket.on("vote_on_these_players", (info) => { 
      console.log("vote called");
      setSelectedPlayers(info.selectedPlayers);
      setLeaderSelecting(false);
      setVoteHappening(true);
      setDisableVoteBtns(false);
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
      console.log(info.missionResultTrack);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("vote_track", (newCount) => {
      console.log("vote_track called");
      setCurMissionVoteDisapproves(newCount);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("no_random_game", (msg) => {
      console.log(msg);
      setRandomStatusMsg(msg);
    });
  }, [socket]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          !gameScreen && !gameEnd ? (
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
                numPlayers={numPlayers}
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
