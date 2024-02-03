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
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <Grid
        container 
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={8}
      >
        <Grid item xs={1.5}>
          <InfoTable />
        </Grid>

        <Grid 
          className="gameTable" 
          container 
          xs={10.5} 
        >
          <GameTable />
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Grid xs={8} sx={{mb: 2}}>
          <ChatBox
            socket={socket} 
            roomCode={roomCode}
            username={username}
          />
        </Grid>
        
        <Grid direction="row" xs={4}>
          <Grid xs={6}>
            <Typography className="masterMsg" variant="subtitle2" color="lightgray">
              {instructions}
            </Typography>
          </Grid>
          
          <Grid xs={6}>
            <Soldier/>  
          </Grid>
          
        </Grid>
              
      </Grid>
    </Grid>
  )
}

export default GameScreen;