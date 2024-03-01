import React from "react";
import "../../../../App.css";

function MissionToken({ current=false, status="none" }) {

  return (
    <div className="tableTrackDiv">
      <div 
        className={`missionToken depth ${current ? "currentMission" : ""}`}
      >
        <div className="number" style={{fontSize: "2.5em"}}>
          5
        </div>
      </div>  
    </div>

  )
}

export default MissionToken;