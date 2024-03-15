import React from "react";
import "../../App.css";
import { Box, Modal, Typography } from "@mui/material";

function EndScreen({ open, revealedPlayers, endMsg }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" color="white">
            {endMsg}
          </Typography>
   
          {
            revealedPlayers.map(function(playerReveal, i) {
              return (
                <div key={playerReveal} className="endScreenResults">
                  <p>{playerReveal}</p>
                </div>
              )
            })
          }
          
        </Box>
      </Modal>
    </div>
  )
}

export default EndScreen;