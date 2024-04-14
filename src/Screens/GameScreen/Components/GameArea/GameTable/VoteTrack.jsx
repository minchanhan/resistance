import React from "react";
import "../../../../../App.css";

function VoteTrack({ isFilled=false, number }) {

  return (
    <div className="tableTrackDiv">
      <div className={`voteHole ${isFilled ? "filledVote" : ""}`} >
        <div className="number" style={{fontSize: "1rem"}}>
          {number}
        </div>
      </div>  
    </div>
  )
}

export default VoteTrack;
