import React from "react";
import "../../../../App.css";
import Soldier from "../../../../assets/Solider";

function GameCommands({gameMasterSpeech}) {

  return (
    <div className="gameCommands">
      <div className="masterMsg">
        {gameMasterSpeech}
      </div>
      
      <Soldier className="soldier"/>  
    </div>
  )
}

export default GameCommands;