import React from "react";
import Timer from "./Timer";
import RebellionLogo from "../../../../assets/RebellionLogo.jsx";

function InfoTable({ 
  room, 
  capacity, 
  seats, 
  topText, 
  missionNumber, 
  gameStarted=false, 
  mins,
  secs,
  voteHappening,
  goingOnMission 
}) {

  return (
    <div className="infoTable">
      <RebellionLogo />

      {
        !gameStarted ? (
          <div className="information">
            <div style={{textWrap: "nowrap"}}>{topText}</div>
            <div style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(room)}}>
              {`Copy Room Code: ${room}`}
            </div>
            <div>{`${seats.length}/${capacity} players joined`}</div>
          </div>
        ) : (
          <div className="information">
            <div>
              {`Mission: ${missionNumber}`}
            </div>
            {
                voteHappening ? <div>Voting Time</div>
                : goingOnMission ? <div>Mission Time</div>
                : <Timer mins={mins} secs={secs} />
            }
          </div>
        )
      }
    </div>
  )
}

export default InfoTable;