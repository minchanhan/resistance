import React from "react";
import "./joinRoom.css";

import { Modal } from "@mui/material";
import DisplayButton from "../../../Components/DisplayButton.jsx";

function YouDisconnected({
  open, 
  handleYouDisconnectedClose,
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
          <p>Please check internet connection</p> 
          <p>Also, avoid leaving tab inactive (for mobile devices) and using forward/back buttons (for Safari users)</p>
          <DisplayButton onClick={handleYouDisconnectedClose} text="OK" />
        </div>
      </div>
    </Modal>
    
  )
}

export default YouDisconnected;