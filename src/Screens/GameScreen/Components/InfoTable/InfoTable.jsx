import React from "react";
import Timer from "./Timer";
import TitleLogo from "./TitleLogo.jsx";

function InfoTable({ room, capacity, seats, topText, missionNumber, gameStarted=false, mins=7 }) {

  return (
    <div className="infoTable">
      <div className="titleLogo">
        <TitleLogo />
      </div>
      {
        !gameStarted ? (
          <div className="information">
            <h3>
              {topText}
            </h3>
            <p style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(room)}}>
              {`Room Code [click to copy]: ${room}`}
            </p>
            <p>{`${seats.length}/${capacity} players joined`}</p>
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