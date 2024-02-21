import React from "react";
import "../../../../../App.css";

import { Grid, Typography } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import Player from "./Player";

function PlayerBox({ isLeader = false, team, username }) {

  return (
    <Grid 
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
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
        <Player team={team}/>
      </Grid>

      <Grid xs={12}>
        <Typography variant="subtitle1" color="text.secondary">
          {username}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PlayerBox;