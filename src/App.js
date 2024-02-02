import React, { useState } from 'react';
import './App.css';
import StartScreen from './Screens/StartScreen/StartScreen';

import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [isAuth, setIsAuth] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {
          true ? (
            <StartScreen />
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
