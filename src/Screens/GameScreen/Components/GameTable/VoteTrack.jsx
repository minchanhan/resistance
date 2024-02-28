import React from "react";
import "../../../../App.css";

import { Box, Grid } from "@mui/material"
import PlayerBox from "./PlayerBox/PlayerBox";
import Wood from "../../../../assets/Wood.jsx";

function VoteTrack({ isFilled=false }) {

  return (
    <div className={`voteHole depth ${isFilled ? "filledVote" : ""}`} >
    </div>   
  )
}

export default VoteTrack;
