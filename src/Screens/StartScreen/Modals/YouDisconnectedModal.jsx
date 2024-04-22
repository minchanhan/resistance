import React from "react";
import { Modal } from "@mui/material";
import "../../../App.css";

function YouDisconnectedModal({
  open,
  youDisconnectedMsg,
}) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox" style={{ maxWidth: "25rem"}}>
        <div className="modalHeader" style={{fontSize: "x-large"}}>
          Disconnected!
        </div>

        <div className="modalContent" style={{height: "6rem"}}>
          {youDisconnectedMsg}
        </div>
      </div>
    </Modal>
  )
}

export default YouDisconnectedModal;