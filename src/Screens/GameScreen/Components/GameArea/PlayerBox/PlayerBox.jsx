import React from "react";
import "../../../../../App.css";
import Fist from "../../../../../assets/Fist.jsx"

import StarIcon from '@mui/icons-material/Star';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function PlayerBox({ 
  username, 
  isLeader = false, 
  onMission=false, 
  teamStyle={},
  ownName=false, 
  onClick,
  is4K,
  isThinning,
}) {

  return (
    <div className="player">
      <div className="status">
        <div id="isLeader">
          <StarIcon style={{
              fill: "white", 
              fontSize: is4K ? "xx-large" : "large",
              fillOpacity: isLeader ? "1" : "0"
            }} 
          />
        </div>
        
        <div id="onMission">
          <CheckBoxIcon style={{
              fill: "white",
              fontSize: is4K ? "xx-large" : "large", 
              fillOpacity: onMission ? "1" : "0"
            }} 
          />
        </div>
      </div>
      
      <div 
        className="fist"
        style={teamStyle} 
        onClick={onClick}
      >
        <Fist
          width={is4K ? "5rem" : isThinning ? "2.5rem" : "3rem"} 
          height={is4K ? "5rem" : isThinning ? "2.5rem" : "3rem"}
        />
      </div>

      <div
        className={`playerUsername ${ownName ? "ownSelf" : ""}`}
        onClick={onClick}
      >
        <span>{username}</span>
      </div>
    </div>
  )
}

export default PlayerBox;