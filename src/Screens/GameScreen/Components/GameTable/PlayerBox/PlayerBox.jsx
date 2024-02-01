import React from "react";
import "../../../../../App.css";

import { Box, Grid } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import Player from "./Player";

function PlayerBox({ isLeader = false }) {

  return (
    <Grid 
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{pt: 2, pb: 2}}
    >
      <Grid xs={6}>
        {
          !isLeader ? (
            <StarIcon style={{fill: "white", fontSize:"large"}} />
          ) : <></>
        }
      </Grid>
      <Grid xs={6} />

      <Grid xs={12}>
        <Player />
      </Grid>
      
    </Grid>
    
  )
}

export default PlayerBox;