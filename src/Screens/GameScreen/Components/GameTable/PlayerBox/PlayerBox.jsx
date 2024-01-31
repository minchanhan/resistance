import React from "react";
import "../../../../../App.css";

import { Box, Grid } from "@mui/material"
import Player from "./Player";

function PlayerBox() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid container spacing={2}>
          <Grid item xs>
            <Player />
          </Grid>
          <Grid item xs>
            <Player />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs>
            <Player />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs>
            <Player />
          </Grid>
          <Grid item xs>
            <Player />
          </Grid>
        </Grid>

      </Grid>
    </Box>
    
  )
}

export default PlayerBox;