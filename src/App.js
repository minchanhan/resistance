import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

import StartScreen from './Screens/StartScreen/StartScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EndScreen from './Screens/EndScreen/EndScreen';
import GameScreen from './Screens/GameScreen/GameScreen';

const socket = io.connect("http://localhost:3001"); // connect to socket server

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [gameScreen, setGameScreen] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [username, setUsername] = useState("");

  const [team, setTeam] = useState("");
  const [seatNumber, setSeatNumber] = useState(0);
  const [numPlayers, setNumPlayers] = useState(0);

  const [playerLobby, setPlayerLobby] = useState([]);

  const onChangedUsername = (updatedUsername) => {
    setUsername(updatedUsername);
  };

  socket.on("set_game_end", () => {
    setGameEnd(true);
  });

  socket.on("player_joined_lobby", (lobbyInfo) => {
    setPlayerLobby(lobbyInfo.playerLobby);
    setNumPlayers(lobbyInfo.numPlayers);
    setGameScreen(true);
  });

  socket.on("team_set", (gameInfo) => {
    setTeam(gameInfo.team);
    setSeatNumber(gameInfo.seatNumber);
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          !gameScreen && !gameEnd ? (
            <div className="startScreen">
              <StartScreen socket={socket} username={username} onChangedUsername={onChangedUsername}/>
            </div>
          ) : gameScreen && !gameEnd ? (
            <GameScreen
              socket={socket}
              username={username}
              team={team}
              seatNumber={seatNumber}
              numPlayers={numPlayers}
              playerLobby={playerLobby}
            />
          ) : gameEnd ? (
              <EndScreen />
          ) : (
            <>Some sort of error lol</>
          )
        }
      </div>
    </ThemeProvider>
    
  );
}

export default App;
