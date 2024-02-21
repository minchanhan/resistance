import { React } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";

function GameScreen({ socket, username, team, seatNumber, numPlayers, playerLobby }) {
  // const [instructions, setInstructions] = useState("");
  
  return (
    <div className="gameScreen">
      <div>
        <GameTable 
          team={team} 
          seatNumber={seatNumber} 
          numPlayers={numPlayers} 
          playerLobby={playerLobby}
        />
      </div>

      <div>
        <ChatBox socket={socket} username={username} />
      </div>

      <div>
        <InfoTable />
      </div>

      <div>
        <GameCommands />
      </div>

    </div>
    
  )
}

export default GameScreen;