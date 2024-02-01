import React from "react";
import { Grid } from "@mui/material";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameMaster from "./Components/GameMaster.jsx/GameMaster";

function GameScreen() {
  return (
    <Grid 
      className="container"
      container 
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container xs={8}>
        <GameTable />
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Grid item xs={3} sx={{pb: 4}}>
          <InfoTable />
        </Grid>
        <ChatBox />
      </Grid>

      <Grid xs>
        
        <Grid item xs={9} sx={{pt: 4}}>
          <GameMaster />
        </Grid>
      </Grid>
      <Grid xs>
        ACTION STUFF
      </Grid>
      
    </Grid>
          
  )
}

export default GameScreen;