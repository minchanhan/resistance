import { Typography } from "@mui/material";
import React from "react";
import Timer from "./Timer";

function InfoTable({ missionNumber=1 }) {

  return (
    <>
      <Typography variant="h3" color="text.secondary" sx={{ flex: 1 }}>
        {`Mission ${missionNumber}`} 
      </Typography>
      <Timer />
    </>
  )
}

export default InfoTable;