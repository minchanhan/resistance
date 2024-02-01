import React from "react";
import "../../../../App.css";

import { Box, Grid } from "@mui/material"
import PlayerBox from "./PlayerBox/PlayerBox";
import Wood from "../../../../assets/Wood.jsx";

function MissionToken({ current=false, status="none" }) {

  return (
    <div className={`missionToken depth ${current ? "currentMission" : ""}`}>
    </div>   
  )
}

export default MissionToken;