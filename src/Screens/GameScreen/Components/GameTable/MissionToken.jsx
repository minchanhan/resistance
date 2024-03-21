import React from "react";
import "../../../../App.css";

function MissionToken({ 
  isPassed=false, 
  isFailed=false, 
  current=false,
  status="none", 
  missionTeamSize, 
  twoFails=false,
}) {

  return (
    <div className="tableTrackDiv">
      <div style={{color: "var(--main-text-color)", minHeight: "16px", fontSize: "16px"}}>
        {twoFails ? "2 fails" : ""}
      </div>
      <div 
        className={
          `missionToken ${current ? "currentMission" : ""} ${isPassed ? "passed" : ""} ${isFailed ? "failed" : ""}`
        }
      >
        <div className="number" style={{fontSize: "2.5em"}}>
          {missionTeamSize}
        </div>
      </div>
    </div>

  )
}

export default MissionToken;