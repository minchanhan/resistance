import React from "react";
import Timer from "./Timer.jsx";

function InfoTable({ 
  roomCode, 
  capacity, 
  roomAdminName, 
  numGames,
  selectedPlayers, 
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
            <Timer mins={mins} secs={secs} />
            {
              voteHappening ? <div>Approve/Disapprove Mission Team</div>
              : missionHappening ? <div>Mission Team is Passing/Failing</div>
              : <div>Leader Selecting Mission Team</div>
            }
            <div>{"Game: " + numGames}</div>

           <div>{`Mission Team: ${selectedPlayers.join(", ")}`}</div>
          </div>
        ) : (
          <div className="information">
            <div style={{textWrap: "nowrap"}}>{`Room Admin: ${roomAdminName}`}</div>
            <div style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(roomCode)}}>
              {`Copy Room Code: ${roomCode}`}
            </div>
            <div>{`${seats.length}/${capacity} players`}</div>
            <div>{"Game: " + numGames}</div>
          </div>
        )
      }
    </div>
  )
}

export default InfoTable;