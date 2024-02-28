import { React } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";

function GameScreen({ socket, username, seats, numPlayers, gameStarted }) {
  // const [instructions, setInstructions] = useState("");
  
  return (
    <div className="gameScreen">
      <GameTable 
        seats={seats}
        numPlayers={numPlayers} 
        gameStarted={gameStarted}
        username={username} // for testing only
      />

      <ChatBox socket={socket} username={username} />

      <InfoTable numPlayers={numPlayers} seats={seats} timer={false}/>

      <GameCommands />
    </div>
  )
}

export default GameScreen;