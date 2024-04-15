import React from "react";
import Timer from "./Timer.jsx";

function InfoTable({ 
  roomCode, 
  capacity, 
  roomAdminName, 
  numGames,
  missionNumber, 
  gameStarted=false, 
  mins,
  secs,
  voteHappening,
  missionHappening,
  seats, 
}) {

  return (
    <div className="infoBox">
      {
        gameStarted ? (
          <div className="information">
            <div>
              {`Mission: ${missionNumber}`}
            </div>
            <Timer mins={mins} secs={secs} />
            {
                voteHappening ? <div>Voting Time</div>
                : missionHappening ? <div>Mission Time</div>
                : <div>Team Select Time</div>
            }
            <p>Selected Players go here</p>
          </div>
        ) : (
          <div className="information">
            <div style={{textWrap: "nowrap"}}>{`Room Admin: ${roomAdminName}`}</div>
            <div style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(roomCode)}}>
              {`Copy Room Code: ${roomCode}`}
            </div>
            <div>{`${seats.length}/${capacity} players joined`}</div>
            <div>{"Game: " + numGames}</div>
          </div>
        )
      }
    </div>
  )
}

export default InfoTable;