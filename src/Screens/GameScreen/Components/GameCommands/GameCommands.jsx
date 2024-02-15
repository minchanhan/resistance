import React from "react";
import "../../../../App.css";
import { Grid, Typography } from "@mui/material";
import Soldier from "../../../../assets/Solider";

function GameCommands() {

  return (
    <div className="gameCommands">
      <div className="masterMsg">
        {"instructions"}
      </div>
      
      <Soldier/>  
    </div>
  )
}

export default GameCommands;