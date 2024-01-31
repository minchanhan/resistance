import React from "react";
import { Box, Grid } from "@mui/material";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import PlayerBox from "./Components/GameTable/PlayerBox/PlayerBox";



function GameScreen() {

  return (
    <div className="container">
      <Box sx={{ flexGrow: 1 }}>
        <Grid 
          container 
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid box xs={10}>
            Game Table
          </Grid>

          <Grid 
            box
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            xs={2}
          >
            <Grid item xs>
              Info Table
            </Grid>
            <Grid item xs>
              Game Leader
            </Grid>
          </Grid>
          
          <Grid item xs={6}>
            ChatBox
          </Grid>
          <Grid item xs={6}>
            action box
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default GameScreen;