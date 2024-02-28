import { Typography } from "@mui/material";
import React from "react";
import Timer from "./Timer";

function InfoTable({ room, numPlayers, seats, topText="Waiting for players..", bottomText="", timer=false }) {

  return (
    <div className="infoTable">
      <h2>
        {topText}
      </h2>
      <p>
        {`Room Code: ${room}`}
      </p>
      {
        timer ? <Timer /> : `${seats.length}/${numPlayers} players joined`
      }
    </div>
  )
}

export default InfoTable;