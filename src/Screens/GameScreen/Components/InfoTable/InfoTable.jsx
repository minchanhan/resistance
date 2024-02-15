import { Typography } from "@mui/material";
import React from "react";
import Timer from "./Timer";

function InfoTable({ missionNumber=1 }) {

  return (
    <div>
      {`Mission ${missionNumber}`} 
      <Timer />
    </div>
  )
}

export default InfoTable;