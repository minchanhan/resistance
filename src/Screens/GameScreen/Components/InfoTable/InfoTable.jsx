import React from "react";
import Timer from "./Timer";
import TitleLogo from "./TitleLogo.jsx";

function InfoTable({ room, capacity, seats, topText, missionNumber, gameStarted=false, mins=7 }) {

  return (
    <div className="infoTable">
      <TitleLogo />

      {
        !gameStarted ? (
          <div className="information">
            <div>{topText}</div>
            <div style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(room)}}>
              {`Copy Room Code: ${room}`}
            </div>
            <div>{`${seats.length}/${capacity} players joined`}</div>
          </div>
        ) : (
          <div className="information">
            <h3>
              {`Mission: ${missionNumber}`}
            </h3>
            <Timer/>
          </div>
        )
      }
    </div>
  )
}

export default InfoTable;