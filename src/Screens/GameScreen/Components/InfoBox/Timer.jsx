import React from "react";
import "../../../../App.css";

function Timer({ mins, secs }) {

  return (
    <div className="timer">
      { mins <= 0 && secs <= 0 ? (
          <div>Time: - : - </div>
        ) : (
          <div style={{ color: mins === 0 && secs <= 30 ? "red" : "white" }}>
            Time: {mins}:{secs < 10 ? `0${secs}` : secs}
          </div>
        )
      }
    </div>
  )
}

export default Timer;