import React from "react";
import "../../../../App.css";

import { Grid } from "@mui/material"
import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";

function GameTable() {

  return (
    <>
      <Grid item sx={{pl: 10, pr: 10}} xs={4}>
        <PlayerBox />
      </Grid>
      <Grid item sx={{pl: 10, pr: 10}} xs={4}>
        <PlayerBox />
      </Grid>
      <Grid item sx={{pl: 10, pr: 10}} xs={4}>
        <PlayerBox />
      </Grid>

      <Grid className="table" container>
        <Grid xs={2.4} sx={{pb: 5}}>
          <MissionToken current/>
        </Grid>
        <Grid xs={2.4} sx={{pb: 5}}>
          <MissionToken />
        </Grid>
        <Grid xs={2.4} sx={{pb: 5}}>
          <MissionToken />
        </Grid>
        <Grid xs={2.4} sx={{pb: 5}}>
          <MissionToken />
        </Grid>
        <Grid xs={2.4} sx={{pb: 5}}>
          <MissionToken />
        </Grid>

        <Grid xs={2.4} sx={{pt: 5}}>
          <VoteTrack isFilled/>
        </Grid>
        <Grid xs={2.4} sx={{pt: 5}}>
          <VoteTrack />
        </Grid>
        <Grid xs={2.4} sx={{pt: 5}}>
          <VoteTrack />
        </Grid>
        <Grid xs={2.4} sx={{pt: 5}}>
          <VoteTrack />
        </Grid>
        <Grid xs={2.4} sx={{pt: 5}}>
          <VoteTrack />
        </Grid>
      </Grid>

      <Grid item sx={{pl: 10, pr: 10}} xs={4}>
        <PlayerBox />
      </Grid>
      <Grid item sx={{pl: 10, pr: 10}} xs={4}>
        <PlayerBox />
      </Grid>
      <Grid item sx={{pl: 10, pr: 10}} xs={4}>
        <PlayerBox />
      </Grid>
    </>
    
  )
}

export default GameTable;