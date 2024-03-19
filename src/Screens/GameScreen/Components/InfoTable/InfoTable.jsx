import React from "react";
import Timer from "./Timer";

function InfoTable({ room, capacity, seats, topText, missionNumber, gameStarted=false, mins=7 }) {

  return (
    <>
      {
        !gameStarted ? (
          <div className="infoTable">
            <h3>
              {topText}
            </h3>
            <p style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(room)}}>
              {`Room Code [click to copy]: ${room}`}
            </p>
            <p>{`${seats.length}/${capacity} players joined`}</p>
          </div>
        ) : (
          <div className="infoTable">
            <h3>
              {`Mission: ${missionNumber}`}
            </h3>
            <Timer/>
          </div>
        )
      }
    </>
  )
}

export default InfoTable;