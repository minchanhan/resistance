import React from "react";
import "../../../../../App.css";
import Fist from "../../../../../assets/Fist.jsx"

import StarIcon from '@mui/icons-material/Star';

function PlayerBox({ isLeader = false, teamStyle={}, username }) {

  return (
    <div className="playerBox">
      <div className="status">
        <div id="isLeader">
          {
            !isLeader ? (
              <StarIcon style={{fill: "white", fontSize:"large"}} />
            ) : <div>hi</div>
          }
        </div>
        
        <div id="onMission"><StarIcon style={{fill: "white", fontSize:"large"}} /></div>
      </div>
      

      <div className="fist" style={teamStyle}>
        <Fist />
      </div>

      <div className="username">
        {username}
      </div>
    </div>
  )
}

export default PlayerBox;