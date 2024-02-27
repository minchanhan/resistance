import { Typography } from "@mui/material";
import React from "react";
import Timer from "./Timer";

function InfoTable({ numPlayers, seats, topText="Waiting for players..", bottomText="", timer=false }) {

  return (
    <div>
      <h2>
        {topText}
      </h2>
      {
        timer ? <Timer /> : `${seats.length}/${numPlayers} players joined`
      }
    </div>
  )
}

export default InfoTable;