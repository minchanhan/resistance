import React, { useState } from 'react';
import './App.css';
import StartScreen from './Screens/StartScreen/StartScreen';
import GameScreen from './Screens/GameScreen/GameScreen';
import ChatBox from './Screens/GameScreen/Components/ChatBox/ChatBox';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Player from './Screens/GameScreen/Components/GameTable/PlayerBox/Player';
import GameTable from './Screens/GameScreen/Components/GameTable/GameTable';
import PlayerBox from './Screens/GameScreen/Components/GameTable/PlayerBox/PlayerBox';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [isAuth, setIsAuth] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {
          true ? (
            <GameScreen />
          ) : (
            <header className="App-header">
              <StartScreen setIsAuth={setIsAuth}/>
            </header>
          )
        }
      </div>
    </ThemeProvider>
    
  );
}

export default App;
