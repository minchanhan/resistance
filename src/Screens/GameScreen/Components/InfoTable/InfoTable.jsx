import { Typography } from "@mui/material";
import React from "react";
import Timer from "./Timer";

function InfoTable({ room, capacity, seats, topText="Waiting for players..", bottomText="", timer=false }) {

  return (
    <div className="infoTable">
      <h2>
        {topText}
      </h2>
      <p style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(room)}}>
        {`Room Code [click to copy]: ${room}`}
      </p>
      {
        timer ? <Timer /> : `${seats.length}/${capacity} players joined`
      }
    </div>
  )
}

export default InfoTable;