import React from "react";
import "../../../../App.css";

function MissionToken({ 
  isPassed=false, 
  isFailed=false, 
  current=false,
  status="none", 
  missionTeamSize, 
  twoFails=false,
  isReallyShort=false,
  isReallyThin=false,
  isMostThin=false
}) {

  return (
    <div className="tableTrackDiv">
      <div className="tableText twoFailsText">
        {twoFails ? "2 fails" : ""}
      </div>
      <div 
        className={
          `missionToken ${current ? "currentMission" : ""} ${isPassed ? "passed" : ""} ${isFailed ? "failed" : ""}`
        }
      >
        <div className="number" style={{fontSize: isMostThin ? "1rem" : isReallyThin ? "1.5rem" : "2.5rem"}}>
          {missionTeamSize}
        </div>
      </div>
    </div>

  )
}

export default MissionToken;