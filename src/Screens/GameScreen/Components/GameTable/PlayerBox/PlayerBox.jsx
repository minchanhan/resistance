import React from "react";
import "../../../../../App.css";
import Fist from "../../../../../assets/Fist.jsx"

import StarIcon from '@mui/icons-material/Star';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function PlayerBox({ isLeader = false, onMission=false, inTeamVote=false, teamStyle={}, username, ownName=false, onClick}) {

  return (
    <div className="playerBox" onClick={onClick}>
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
            onMission || inTeamVote ? (
              <CheckBoxIcon style={{fontSize:"large"}} />
            ) : <></>
          }
        </div>
      </div>
      

      <div className="fist" style={teamStyle}>
        <Fist />
      </div>

      <div className="username" style={{color: ownName ? "orange" : "var(--main-text-color)" }}>
        {username}
      </div>
    </div>
  )
}

export default PlayerBox;