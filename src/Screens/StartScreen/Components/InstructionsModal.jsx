import React from "react";
import "./instructions.css";
import { Box, Modal } from "@mui/material";
import PlayerBox from "../../GameScreen/Components/GameTable/PlayerBox/PlayerBox";

function InstructionsModal({
  open, 
  handleInstructionsClose, 
  modalStyle, 
  modalHeader
}) {
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };

  const objectiveTitle = "Objective";
  const objective = `The Rebellion is a mafia style game where players need to debate and make decisions on "who the bad guys are". \
  The Rebellion Team is good, Spy team is bad. `;

  const pregameTitle = `Pregame/Board Info`;
  const pregame = `When the room admin clicks Start, players will be put into the Rebellion or the Spies. The chart below shows how many
  players are on each team based on total number of players. The Rebellion will not know any players' teams, but the spies will.
  Spies will be colored red.
  
  `

  const gameplayTitle = "Gameplay";
  const gameplay = `At the start each round, a leader will be randomly chosen to choose a group of players to go on missions (star icon).
  Players will take a majority vote on if this group of players (checkbox icon) should go on the mission for that round. 
  If the vote does not pass, then the leader to the right will suggest a new mission team.
  Note, the SPIES ALSO WIN if a mission team is voted against 5 times in one round (vote tracker is at the bottom of the board).

  If a mission is approved, the rebellion players must "pass" the mission, but the spies have a choice to pass or fail the mission.
  Players cannot see who voted what, they just see the tally.
  On most missions, just one fail is required to fail the entire mission (Mission 4 for 7+ player games require 2 FAILS).
  Once the mission has ended, the leader to the right suggests a team for the next mission.

  Each game consists of 5 rounds (each with one mission) and the winning team is decided by best 3 out of 5. `;

  const additionalTitle = "Additional Notes";
  const additional = `- This game is best played over voice chat! Consider using a Discord server.
  - A leader (player with star) has X minutes to discuss and submit a team for vote (click on players and click "submit"). If they run out of time, the team will be "voted down", and a new leader is suggested.`;

  return (
    <Modal
      open={open}
      onClose={handleInstructionsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div style={modalHeader}>
          Instructions:
        </div>

        <div className="instructionsContainer">
          <div className="instructions">
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{objectiveTitle}</div>
              <div className="instructionsText">{objective}</div>
            </div>
            
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{pregameTitle}</div>
              <div className="instructionsText">{pregame}</div>
              <div className="holdInstructionPics">
                <table class="numSpiesChart">
                  <thead>
                      <tr>
                          <td># of Players</td>
                          <td>5</td>
                          <td>6</td>
                          <td>7</td>
                          <td>8</td>
                          <td>9</td>
                          <td>10</td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>Rebellion</td>
                          <td>3</td>
                          <td>4</td>
                          <td>4</td>
                          <td>5</td>
                          <td>5</td>
                          <td>6</td>
                      </tr>
                      <tr>
                          <td>Spies</td>
                          <td>2</td>
                          <td>2</td>
                          <td>3</td>
                          <td>3</td>
                          <td>3</td>
                          <td>4</td>
                      </tr>
                  </tbody>
                </table>

                <PlayerBox
                  isLeader={true}
                  onMission={true}
                  username="rebellion(?)"
                />
                <PlayerBox
                  isLeader={true}
                  onMission={true}
                  teamStyle={badTeamStyle} 
                  username="spy member"
                />
              </div>
            </div>            
            
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{gameplayTitle}</div>
              <div className="instructionsText">{gameplay}</div>
            </div>                      
            
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{additionalTitle}</div>
              <div className="instructionsText">{additional}</div>
            </div>                      
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default InstructionsModal;