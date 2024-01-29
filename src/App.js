import React, { useState } from 'react';
import './App.css';
import StartScreen from './Screens/StartScreen/StartScreen';
import GameScreen from './Screens/GameScreen/GameScreen';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
      {
        isAuth ? (
          <GameScreen>

          </GameScreen>
        ) : (
          <header className="App-header">
            <StartScreen setIsAuth={setIsAuth}/>
          </header>
        )
      }
      
    </div>
  );
}

export default App;
