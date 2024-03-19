import React, { useEffect, useState } from "react";
import "../../../../App.css";
import { Typography } from "@mui/material";

function Timer({ initialSecs=15, initialMins=1 }) {
  const [secs, setSecs] = useState(initialSecs);
  const [mins, setMins] = useState(initialMins);

  useEffect(() => {
    let interval = setInterval(() => {
      if (secs > 0) {
        setSecs(secs-1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(interval);
        } else {
          setMins(mins-1);
          setSecs(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <div className="timer">
      { mins === 0 && secs === 0 ?
          <p>
            End of Round
          </p>
        : mins === 0 && secs <= 30 ?
          <p sx={{ color: "red" }}>
            Time: {mins}:{secs < 10 ?  `0${secs}` : secs}
          </p>
        :
          <p>
            Time: {mins}:{secs < 10 ?  `0${secs}` : secs}
          </p>
      }
    </div>   
  )
}

export default Timer;