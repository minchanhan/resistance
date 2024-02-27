import React from "react";
import "../../../../../App.css";

import Fist  from "../../../../../assets/Fist.jsx"

function Player({teamStyle}) {
  return (
    <div style={teamStyle}>
      <Fist />
    </div>
  )
}

export default Player;