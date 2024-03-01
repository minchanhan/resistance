import { React } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";

function GameScreen({ 
  socket, 
  room, 
  username, 
  seats, 
  numPlayers, 
  gameStarted, 
  gameMasterSpeech, 
  leaderSelecting,
  selectedPlayers,
  setSelectedPlayers
}) {
  // const [instructions, setInstructions] = useState("");
  
  return (
    <div className="gameScreen">
      <div className="left">
        <GameTable 
          socket={socket}
          seats={seats}
          numPlayers={numPlayers} 
          gameStarted={gameStarted}
          username={username} // for testing only
          leaderSelecting={leaderSelecting}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
        <InfoTable room={room} numPlayers={numPlayers} seats={seats} timer={false}/>
      </div>
      <div className="right">
        <ChatBox socket={socket} username={username} />
        <GameCommands gameMasterSpeech={gameMasterSpeech}/>
      </div>
    </div>
  )
}

export default GameScreen;