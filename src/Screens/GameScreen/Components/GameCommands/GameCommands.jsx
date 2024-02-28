import React from "react";
import "../../../../App.css";
import Soldier from "../../../../assets/Solider";

function GameCommands({gameMasterSpeech}) {

  return (
    <div className="gameCommands">
      <div className="masterMsg">
        {gameMasterSpeech}
      </div>
      
      <div className="soldier">
        <Soldier />  
      </div>
    </div>
  )
}

export default GameCommands;