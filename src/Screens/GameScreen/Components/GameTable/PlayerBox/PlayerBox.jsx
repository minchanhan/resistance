import React from "react";
import "../../../../../App.css";
import Fist from "../../../../../assets/Fist.jsx"

import StarIcon from '@mui/icons-material/Star';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function PlayerBox({ isLeader = false, onMission=false, teamStyle={}, username, ownName=false }) {

  return (
    <div className="playerBox">
      <div className="status">
        <div id="isLeader">
          {
            isLeader ? (
              <StarIcon style={{fill: "white", fontSize:"large"}} />
            ) : <></>
          }
        </div>
        
        <div id="onMission">
          {
            onMission ? (
              <CheckBoxIcon style={{fontSize:"large"}} />
            ) : <></>
          }
        </div>
      </div>
      

      <div className="fist" style={teamStyle}>
        <Fist />
      </div>

      <div className="username" style={{color: ownName ? "yellow" : "white" }}>
        {username}
      </div>
    </div>
  )
}

export default PlayerBox;