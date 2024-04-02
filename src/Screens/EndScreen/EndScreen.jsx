import React from "react";
import "../../App.css";
import { Modal } from "@mui/material";
import DisplayButton from "../../Components/DisplayButton";

function EndScreen({ open, handleEndModalClose, revealedPlayers, endMsg }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleEndModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalBox" style={{maxHeight: "30rem"}}>
          <div className="modalHeader" style={{fontSize: "x-large"}}>
            {endMsg}
          </div>
   
          <div style={{marginTop: "1rem", overflowY: "auto", height: "85%", maxHeight: "85%"}}>
            {
              revealedPlayers.map(function(playerReveal, i) {
                return (
                  <div key={playerReveal[0]} className="endScreenResults">
                    <p style={{color: playerReveal[1] === "badTeam" ? "var(--secondary-light)" : "white" }}>
                      {playerReveal[0]}
                    </p>
                  </div>
                )
              })
            }
          </div>

          <DisplayButton 
            text="Return to Lobby" 
            onClick={handleEndModalClose} 
            btnStyle={{marginTop: "1.3rem", maxWidth: "15rem", alignSelf: "center"}}
          />
          
        </div>
      </Modal>
    </div>
  )
}

export default EndScreen;