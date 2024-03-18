import React from "react";
import "../../../App.css";
import { Box, Modal } from "@mui/material";

function InstructionsModal({
  open, 
  handleInstructionsClose, 
  style, 
  modalHeader
}) {

  const instructions = `Resistance is a mafia style game where players need to debate and make decisions on who the "bad guys are".
  Resistance Team is good, Spy team is bad.

  At the start of the game, a leader will be randomly chosen to choose a group of players to go on missions. Players will take a majority vote on
  if this group of players should go on the mission. If the vote does not pass, then the leader to the right will suggest a new mission team.

  If a mission is approved, the resistance players must "pass" the mission, but the spies have a choice to pass or fail the mission.
  Players cannot see who voted what, they can just see the tally.
  On most missions, just one fail is required to fail the entire mission (Mission 4 for 7+ players require 2 fails to fail).
  Once the mission has ended, the leader to the right suggests a team for the next mission.

  There are 5 missions, and the winning team is decided by best 3 out of 5. However, the spies can win if 
  a mission team is voted against 5 times (see vote tracker at the bottom of table). Spies can also see who
  the other spies are, they will be colored red.

  Additional Notes:
  - This game is best played over voice chat!
  - A leader (player with star) has x minutes to discuss and then suggest a team (click on players and click "submit").
    If they run out of time the team will be "voted down"
  - "Plot Cards" are given to each leader at the start of the mission. (expansion version coming soon..)
  `;

  return (
    <Modal
      open={open}
      onClose={handleInstructionsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={modalHeader}>
          Instructions:
        </div>

        <div className="instructionsBox">
          <div className="instructions" style={{ whiteSpace: 'pre-line' }}>
            <p>{instructions}</p>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default InstructionsModal;