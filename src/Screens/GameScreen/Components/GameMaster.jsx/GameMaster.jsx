import { Typography } from "@mui/material";
import React from "react";

import "../../../../App.css";

function GameMaster({ instructions="" }) {

  return (
    <>
      <div className="masterMsg">
        {instructions}
      </div>
    </>
  )
}

export default GameMaster;