import React from "react";
import "../../../../App.css";

function Timer({ mins, secs }) {

  return (
    <div className="timer">
      { mins === 0 && secs === 0 ? (
          <div>
            Team Select Done
          </div>
        ) : (
          <div style={{ color: mins === 0 && secs <= 30 ? "red" : "black" }}>
            Time: {mins}:{secs < 10 ? `0${secs}` : secs}
          </div>
        )
      }
    </div>
  )
}

export default Timer;