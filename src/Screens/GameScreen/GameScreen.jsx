import { React, memo } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";

function GameScreen({ socket, username, seats, numPlayers, gameStarted }) {
  // const [instructions, setInstructions] = useState("");
  
  return (
    <div className="gameScreen">
      <div>
        <GameTable 
          seats={seats}
          numPlayers={numPlayers} 
          gameStarted={gameStarted}
          username={username} // for testing only
        />
      </div>

      <div>
        <ChatBox socket={socket} username={username} />
      </div>

      <div>
        <InfoTable numPlayers={numPlayers} seats={seats} timer={false}/>
      </div>

      <div>
        <GameCommands />
      </div>

    </div>
    
  )
}

export default memo(GameScreen);