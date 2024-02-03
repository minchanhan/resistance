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

  const [gameStart, setGameStart] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          !gameStart && !gameEnd ? (
            <header className="App-header">
              <StartScreen 
                socket={socket} 
                username={username}
                setUsername={setUsername}
                roomCode={roomCode}
                setRoomCode={setRoomCode}
                setGameStart={setGameStart}
              />
            </header>
          ) : gameStart && !gameEnd ? (
            <GameScreen
              socket={socket}
              roomCode={roomCode}
              username={username}
              setGameEnd={setGameEnd}
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
