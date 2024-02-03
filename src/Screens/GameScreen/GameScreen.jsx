import React, { useState } from "react";
import { Box, Grid, Typography} from "@mui/material";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import Soldier from "../../assets/Solider.jsx";

function GameScreen({ socket, roomCode, username, setGameEnd }) {
  const [instructions, setInstructions] = useState("");

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        xs={7.5}
      >
        <Grid item xs={1.5}>
          <InfoTable />
        </Grid>

        <Grid 
          container
          xs={10.5}
          sx={{pl: 3, pr: 3}}
        >
          <GameTable />
        </Grid>
      </Grid>

      <Grid
        container
        item
        direction="column"
        xs={4.5}
      >
        <Grid
          item
          xs={8} 
          sx={{ mb: 2, ml: 3, mr: 3, pl: 3, pr: 3}} 
        >
          <ChatBox
            socket={socket} 
            roomCode={roomCode}
            username={username}
          />
        </Grid>
        
        <Grid
          container
          item
          direction="row"
          justifyItems="center"
          xs={4}
          sx={{mt: 2}}
        >
          <Grid 
            alignSelf="center"
            xs={7}
            sx={{ml:2}}
          >
            <Typography className="masterMsg" variant="subtitle2" color="lightgray">
              {instructions}
            </Typography>
          </Grid>
          
          <Grid alignSelf="end" xs={3} sx={{mr:3}}>
            <Soldier/>  
          </Grid>
          
        </Grid>
              
      </Grid>
    </Grid>
  )
}

export default GameScreen;