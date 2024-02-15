import React from "react";
import "../../../../App.css";

function MissionToken({ current=false, status="none" }) {

  return (
    <div className={`missionToken depth ${current ? "currentMission" : ""}`}>
    </div>   
  )
}

export default MissionToken;