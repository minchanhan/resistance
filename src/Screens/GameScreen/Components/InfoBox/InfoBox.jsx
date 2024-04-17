import React, { useEffect, useState } from "react";
import Timer from "./Timer.jsx";

function InfoTable({ 
  roomCode, 
  capacity, 
  roomAdminName, 
  numGames,
  leaderUsername,
  selectedPlayers, 
  gameStarted=false, 
  mins,
  secs,
  voteHappening,
  missionHappening,
  seats, 
}) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);

    const timeout = setTimeout(() => {
      setFlash(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    roomCode,
    roomAdminName,
    numGames,
    leaderUsername,
    voteHappening,
    missionHappening,
  ]);

  return (
    <div className={`infoBox ${flash ? 'flash' : ''}`}>
      {
        gameStarted ? (
          <div className="information">
            <Timer mins={mins} secs={secs} />
            {
              voteHappening ? <div>Approve/Disapprove Mission Team</div>
              : missionHappening ? <div>Mission Team is Passing/Failing</div>
              : <div>{`${leaderUsername} is Selecting Mission Team`}</div>
            }
           <div>{`Mission Team: ${selectedPlayers.join(", ")}`}</div>
           <div>{"Game: " + numGames}</div>
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