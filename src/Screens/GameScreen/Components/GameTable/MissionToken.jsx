import React from "react";
import "../../../../App.css";

function MissionToken({ current=false, status="none", missionTeamSize }) {

  return (
    <div className="tableTrackDiv">
      <div 
        className={`missionToken depth ${current ? "currentMission" : ""}`}
      >
        <div className="number" style={{fontSize: "2.5em"}}>
          {missionTeamSize}
        </div>
      </div>  
    </div>

  )
}

export default MissionToken;