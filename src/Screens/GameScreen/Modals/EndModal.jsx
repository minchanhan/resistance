import React from "react";
import { Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "../../../App.css";

function EndModal({ open, handleEndModalClose, revealedPlayers, endMsg }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleEndModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalBox" style={{height: "70%", minWidth: "70%", gap: "0.75rem"}}>
          <div className="modalHeader" style={{fontSize: "x-large"}}>
            {endMsg}
            <CloseIcon 
              className="closeModal" 
              onClick={handleEndModalClose} 
            />
          </div>
   
          <div className="modalContent" style={{gap: "0rem", alignItems: "center"}}>
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
        </div>
      </Modal>
    </div>
  )
}

export default EndModal;