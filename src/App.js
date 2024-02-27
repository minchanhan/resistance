import React, { useEffect, useState } from 'react';
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
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [username, setUsername] = useState("");

  const [numPlayers, setNumPlayers] = useState(0);
  const [seats, setSeats] = useState([]);

  const onChangedUsername = (updatedUsername) => {
    setUsername(updatedUsername);
  };

  socket.on("set_game_end", () => {
    setGameEnd(true);
  });

  socket.on("player_joined_lobby", (lobbyInfo) => {
    setSeats(lobbyInfo.seats);
    setNumPlayers(lobbyInfo.numPlayers);
    setGameScreen(true);
  });

  socket.on("shuffled_seats", (seats) => {
    console.log("received seats: ", seats)
    setSeats(seats);
    setGameStarted(true);
    console.log("shuffled_seats in client received: ", seats);
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
              seats={seats}
              numPlayers={numPlayers}
              gameStarted={gameStarted}
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
