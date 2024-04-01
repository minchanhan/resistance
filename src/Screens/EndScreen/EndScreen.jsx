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
        <div className="modalBox">
          <div className="modalHeader" style={{fontSize: "x-large"}}>
            {endMsg}
          </div>
   
          {
            revealedPlayers.map(function(playerReveal, i) {
              return (
                <div key={playerReveal} className="endScreenResults">
                  <p>{playerReveal}</p>
                </div>
              )
            })
          }

          <DisplayButton 
            text="Return to Lobby" 
            onClick={handleEndModalClose} 
            btnStyle={{marginTop: "1.3rem"}}
          />
          
        </div>
      </Modal>
    </div>
  )
}

export default EndScreen;