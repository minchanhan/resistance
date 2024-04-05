import React from "react";
import Timer from "./Timer";
import RebellionLogo from "../../../../assets/RebellionLogo.jsx";

function InfoTable({ 
  roomCode, 
  capacity, 
  seats, 
  topText, 
  missionNumber, 
  gameStarted=false, 
  mins,
  secs,
  voteHappening,
  missionHappening
}) {

  return (
    <div className="infoTable">
      <div className="titleLogo">
        <RebellionLogo />
      </div>

      {
        !gameStarted ? (
          <div className="information">
            <div style={{textWrap: "nowrap"}}>{topText}</div>
            <div style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(roomCode)}}>
              {`Copy Room Code: ${roomCode}`}
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
                : missionHappening ? <div>Mission Time</div>
                : <Timer mins={mins} secs={secs} />
            }
          </div>
        )
      }
    </div>
  )
}

export default InfoTable;