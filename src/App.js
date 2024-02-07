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

  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [username, setUsername] = useState("");

  const onChangedUsername = (updatedUsername) => {
    setUsername(updatedUsername);
  }

  socket.on("set_game_start", () => {
    setGameStart(true);
  });

  socket.on("set_game_end", () => {
    setGameEnd(true);
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          !gameStart && !gameEnd ? (
            <div className="startScreen">
              <StartScreen socket={socket} username={username} onChangedUsername={onChangedUsername}/>
            </div>
          ) : gameStart && !gameEnd ? (
            <GameScreen
              socket={socket}
              username={username}
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
