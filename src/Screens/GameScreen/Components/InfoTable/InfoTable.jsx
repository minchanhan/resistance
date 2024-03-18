import React from "react";
import Timer from "./Timer";

function InfoTable({ room, capacity, seats, topText, missionNumber, gameStarted=false, mins=7 }) {

  return (
    <div className="infoTable">
      {
        !gameStarted ? (
          <div>
            <h2>
              {topText}
            </h2>
            <p style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(room)}}>
              {`Room Code [click to copy]: ${room}`}
            </p>
            <p>{`${seats.length}/${capacity} players joined`}</p>
          </div>
        ) : (
          <div>
            <h2>
              {`Mission: ${missionNumber}`}
            </h2>
            <Timer/>
          </div>
        )
      }
      
    </div>
  )
}

export default InfoTable;