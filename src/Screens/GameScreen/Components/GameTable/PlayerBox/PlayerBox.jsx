import React from "react";
import "../../../../../App.css";
import Fist from "../../../../../assets/Fist.jsx"

import StarIcon from '@mui/icons-material/Star';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function PlayerBox({ 
  isLeader = false, 
  onMission=false, 
  inTeamVote=false, 
  teamStyle={}, 
  username, 
  ownName=false, 
  onClick,
  isHighRes,
  is4K,
  isReallyShort
}) {

  return (
    <div className="playerBox" onClick={onClick}>
      <div className="status">
        <div id="isLeader">
          <StarIcon style={{
              fill: "white", 
              fontSize: "large",
              fillOpacity: isLeader ? "1" : "0"
            }} 
          />
        </div>
        
        <div id="onMission">
          <CheckBoxIcon style={{
              fill: "white",
              fontSize:"large", 
              fillOpacity: onMission || inTeamVote ? "1" : "0"
            }} 
          />
        </div>
      </div>
      
      <div className="fist" style={teamStyle}>
        <Fist 
          width={is4K ? "5rem" : isHighRes ? "4rem" : isReallyShort ? "2rem" : "3rem"} 
          height={is4K ? "5rem" : isHighRes ? "4rem" : isReallyShort ? "2rem" : "3rem"} 
        />
      </div>

      <div 
        className="playerBoxUsername" 
        style={{
          color: ownName ? "orange" : "white"
        }}
      >
        {username}
      </div>
    </div>
  )
}

export default PlayerBox;