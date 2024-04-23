import React from "react";
import "../../../../../App.css";

function MissionToken({ 
  isPassed=false, 
  isFailed=false, 
  current=false,
  isDone=false,
  missionTeamSize,
  missionHistory,
  twoFails=false,
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
        <div className="missionHistory">
          {
            isDone ? (
              ["Team:", ...missionHistory].map(function(username, i) {
                return (
                  <div key={username + i}>
                    {username}
                  </div>
                )
              })
            ) : <div>Team History N/A</div>
          }
        </div>
        <div 
          className="number" 
          style={{fontSize: isMostThin ? "1rem" : isReallyThin ? "1.5rem" : "2.5rem"}}
        >
          {missionTeamSize}
        </div>
      </div>
    </div>

  )
}

export default MissionToken;