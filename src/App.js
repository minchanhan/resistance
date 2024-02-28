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
  const [username, setUsername] = useState("");

  const [numPlayers, setNumPlayers] = useState(0); // capacity
  const [seats, setSeats] = useState([]);

  const onChangedUsername = (updatedUsername) => {
    setUsername(updatedUsername);
  };

  useEffect(() => {
    const handleGameEnd = () => {
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
      setGameScreen(true);
    };

    socket.on("player_joined_lobby", handlePlayerJoin);

    return () => {
      socket.off("player_joined_lobby", handlePlayerJoin);
    }
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
    const handleSeats = (seats) => {
      setSeats(seats);
      setGameStarted(true);
    };

    socket.on("shuffled_seats", handleSeats);

    return () => {
      socket.off("shuffled_seats", handleSeats);
    }
  }, [socket]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          !gameScreen && !gameEnd ? (
            <StartScreen socket={socket} username={username} onChangedUsername={onChangedUsername}/>
          ) : gameScreen ? (
            <>
              <GameScreen
                socket={socket}
                username={username}
                seats={seats}
                numPlayers={numPlayers}
                gameStarted={gameStarted}
              />
              <EndScreen
                open={gameEnd}
                seats={seats}
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
