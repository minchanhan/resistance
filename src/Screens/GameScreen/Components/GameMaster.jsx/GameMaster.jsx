import { Grid, Typography } from "@mui/material";
import React from "react";

import "../../../../App.css";
import Soldier from "../../../../assets/Solider.jsx";

function GameMaster({ instructions="fesfse" }) {

  return (
    <Grid direction="column">
      <Grid xs>
        <div className="masterMsg">
          <Typography variant="subtitle1" color="lightgray" sx={{ flex: 1 }}>
            {instructions}
          </Typography>
        </div>
      </Grid>
      <Grid xs sx={{ pt: 2 }}>
        <Soldier/>
      </Grid>
      
    </Grid>
  )
}

export default GameMaster;