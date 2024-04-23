import React from "react";
import "../../../App.css";

import { Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DisplayButton from "../../../Utils/DisplayButton.jsx";

function EndConfirmModal({
  open, 
  setOpenEndConfirm,
  handleAdminEndGame
}) {
  
  const handleSettingsClose = () => {
    setOpenEndConfirm(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleSettingsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox" style={{ width: "25rem", maxHeight: "15rem", gap: "1rem"}}>
        <div className="modalHeader" style={{ fontSize: "x-large" }}>
          Confirm Game End
          <CloseIcon 
            className="closeModal" 
            onClick={handleSettingsClose} 
          />
        </div>
        
        <div className="modalContent" style={{ alignItems: "center", gap: "0.75rem" }}>
          <DisplayButton onClick={handleAdminEndGame} text="Confirm" />
          <DisplayButton onClick={handleSettingsClose} text="Cancel" />
        </div>
      </div>
    </Modal>
    
  )
}

export default EndConfirmModal;