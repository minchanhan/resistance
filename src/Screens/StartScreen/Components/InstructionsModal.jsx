import React from "react";
import "./instructions.css";
import { Modal } from "@mui/material";
import PlayerBox from "../../GameScreen/Components/GameTable/PlayerBox/PlayerBox";
import MissionToken from "../../GameScreen/Components/GameTable/MissionToken";
import VoteTrack from "../../GameScreen/Components/GameTable/VoteTrack";

function InstructionsModal({
  open, 
  handleInstructionsClose
}) {
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };

  const objectiveTitle = "Objective";
  const objective = `The Rebellion is a mafia style game where players need to debate and make decisions on "who the bad guys are". \
  The Rebellion Team is good, Spy team is bad. `;

  const pregameTitle = `Pregame/Board Info`;
  const pregame = `When the room admin clicks Start, players will be put into the Rebellion or the Spies. The chart below shows how many
  players are on each team based on total number of players. The Rebellion will not know any players' teams, but the spies will. \
  Spies will be colored red.`

  const gameplayTitle = "Gameplay";
  const gameplay = `At the start each round, a leader will be randomly chosen to choose a group of players to go on missions (star icon).
  The number of players that go on each mission is indicated by the mission tracker on the table. \
  Players will take a majority vote on if this group of players (checkbox icon) should go on the mission for that round. 
  If the vote does not pass, then the leader to the right will suggest a new mission team.
  Note, the SPIES ALSO WIN if a mission team is voted against 5 times in one round (vote tracker is at the bottom of the board).

  If a mission is approved, the rebellion players must "pass" the mission, but the spies have a choice to pass or fail the mission.
  Players cannot see who voted what, they just see the tally once the mission concludes.
  On most missions, just one fail is required to fail the entire mission (Mission 4 for 7+ player games require 2 FAILS).
  Once the mission has ended, the leader to the right suggests a team for the next mission (clockwise).

  Each game consists of 5 rounds (each with one mission) and the winning team is decided by best 3 out of 5. `;

  const additionalTitle = "Additional Notes";
  const additional = `- This game is best played over voice chat! Consider using a Discord server.
  - A leader (player with star) has X minutes to discuss and submit a team for vote (click on players and click "submit"). If they run out of time, the team will be "voted down", and a new leader is suggested.
  - Remember, this web app is a rendition of an in-person board game. That means don't message any players privately, and try not to leave the \
  game, as the game will end for everyone, just like normal.`;

  return (
    <Modal
      open={open}
      onClose={handleInstructionsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox">
        <div className="modalHeader">
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
                <table className="numSpiesChart">
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


                <div style={{padding: "0.5rem"}}>
                  <PlayerBox
                    isLeader={true}
                    onMission={true}
                    username="rebellion(?)"
                  />
                </div>
                
                <div style={{padding: "0.5rem"}}>
                  <PlayerBox
                    isLeader={true}
                    onMission={true}
                    teamStyle={badTeamStyle} 
                    username="spy member"
                  />
                </div>
                
              </div>
            </div>            
            
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{gameplayTitle}</div>
              <div className="instructionsText">{gameplay}</div>
              <div className="holdInstructionPics">
                <div className="table" style={{margin: "2rem"}}>
                  <div className="missionTokenGrid">
                    <MissionToken
                      isPassed
                      missionTeamSize={2}
                    />
                    <MissionToken
                      isFailed
                      missionTeamSize={3}
                    />
                    <MissionToken
                      current 
                      missionTeamSize={4}
                    />
                    <MissionToken
                      missionTeamSize={3}
                    />
                    <MissionToken
                      missionTeamSize={4}         
                    />
                  </div>

                  <div className="voteTrackGrid">
                    <VoteTrack isFilled number={1}/>
                    <VoteTrack number={2}/>
                    <VoteTrack number={3}/>
                    <VoteTrack number={4}/>
                    <VoteTrack number={5}/>
                  </div>
                </div>
                
              </div>
            </div>                      
            
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{additionalTitle}</div>
              <div className="instructionsText">{additional}</div>
            </div>                      
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InstructionsModal;