import React from "react";
import "../../../../App.css";

import { Grid } from "@mui/material"
import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";

function GameTable() {

  return (
    <div className="fullTable">
      <div className="playerRow">
        <PlayerBox />
        <PlayerBox />
        <PlayerBox />
      </div>

      <div className="table">
        <div className="missionTokenGrid">
          <MissionToken current/>
          <MissionToken />
          <MissionToken />
          <MissionToken />
          <MissionToken />
        </div>
        
        <div className="voteTrackGrid">
          <VoteTrack isFilled/>
          <VoteTrack />
          <VoteTrack />
          <VoteTrack />
          <VoteTrack />
        </div>
      </div>



      <div className="playerRow">
        <PlayerBox />
        <PlayerBox />
        <PlayerBox />
      </div>

      
    </div>
  )
}

export default GameTable;