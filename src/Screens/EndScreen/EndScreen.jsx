import React from "react";
import "../../App.css";
import { Box, Modal, Typography } from "@mui/material";

function EndScreen({open, seats}) {
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
            Game Ended
          </Typography>
   
          {
            seats.map(function(seat, i) {
              return (
                <div key={i} className="endScreenResults">
                  <p>{`${seat[0]} was ${seat[1] === "badTeam" ? "an evil spy" : "part of the rebellion"}`}</p>
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