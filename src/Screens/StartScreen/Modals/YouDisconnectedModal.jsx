import React from "react";
import { Modal } from "@mui/material";
import DisplayButton from "../../../Utils/DisplayButton";

import "./startScreenModals.css";

function YouDisconnectedModal({
  open, 
  handleYouDisconnectedClose,
  youDisconnectedMsg,
}) {
  return (
    <Modal
      open={open}
      onClose={handleYouDisconnectedClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div 
        className="modalBox" 
        style={{width: "80%", maxWidth: "25rem"}}
      >
        <div className="modalHeader" style={{fontSize: "x-large"}}>
          You have been disconnected
        </div>
        
        <div>
          {youDisconnectedMsg}
          <DisplayButton onClick={handleYouDisconnectedClose} text="OK" />
        </div>
      </div>
    </Modal>
  )
}

export default YouDisconnectedModal;