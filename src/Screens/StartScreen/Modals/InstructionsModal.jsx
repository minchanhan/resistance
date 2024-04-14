import React from "react";
import "./instructions.css";
import { Modal } from "@mui/material";
import PlayerBox from "../../GameScreen/Components/GameArea/PlayerBox/PlayerBox";
import MissionToken from "../../GameScreen/Components/GameArea/GameTable/MissionToken";
import VoteTrack from "../../GameScreen/Components/GameArea/GameTable/VoteTrack";

function InstructionsModal({
  open, 
  handleInstructionsClose,
  goodTeamStyle,
  badTeamStyle,
}) {
  const objectiveTitle = "Objective";
  const objective = `The Rebellion is a mafia style game, consisting of a good team (The Rebellion) and a bad team (The Spies). The Rebellion \
  is attempting to overthrow the government by passing missions (described below), but the secret spies are attempting to sabotage these missions.`;

  const pregameTitle = `Pregame/Board Info`;
  const pregame = `When the room admin clicks Start, players will be placed on the Rebellion or the Spy team. The chart below shows how many \
  players are on each team based on total # of players. The Rebellion will not know any players' teams, and they will see other players as black fists. \
  The Spies will see their own and fellow spies' fists as red, and the rebellions' as blue.`;

  const gameplayTitle = "Gameplay";
  const gameplay = `At the start of the game (mission 1), a leader will randomly be chosen. For each mission, the leader \
  (player with star icon) has X minutes to discuss and submit a team for a mission (click on players and click "submit"). 

  The number of players that go on each mission is indicated by the mission trackers on the table (big circles). \
  Players will take a majority vote on if this group of players (checkbox icon) should go on the mission for that round. \
  If the vote does not pass (or the leader fails to submit a team in time), then the leader to the right will suggest a new mission team. \
  Note, the SPIES ALSO WIN if a mission team is voted against 5 times in one round (vote tracker is at the bottom of the board).

  If a mission is approved, the rebellion players must choose to "pass" the mission, but the spies have a choice to pass or fail the mission. \
  Players cannot see who chose what, they just see the results once the mission concludes. \
  On most missions, just one fail is required to fail the entire mission (Mission 4 for 7+ player games require 2 FAILS). \
  Once the mission has ended, the next leader (moving in clockwise direction) suggests a team for the next mission.

  Each game consists of 5 missions and the winning team is decided by best 3 out of 5. `;

  const additionalTitle = "Additional Notes";
  const additional = `- This game is best played over voice chat! Consider using a Discord server.
  - Remember, this web app is a rendition of an in-person board game. That means don't message any players privately, and try not to leave the \
  game, as the game will end for everyone, just like in real life.
  - Please be careful when leaving your current tab if you're playing on a mobile device. Some browsing apps, including Chrome, have "memory saver" features \
  that discard background tabs. You will be kicked from your room if your leave your tab.`;

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
                    teamStyle={goodTeamStyle}
                    username="rebellion"
                  />
                </div>
                
                <div style={{padding: "0.5rem"}}>
                  <PlayerBox
                    isLeader={true}
                    onMission={true}
                    teamStyle={badTeamStyle} 
                    username="spy"
                  />
                </div>
                
              </div>
            </div>            
            
            <div className="instructionsBox">
              <div className="instructionsSubtitle">{gameplayTitle}</div>
              <div className="instructionsText">{gameplay}</div>
              <div className="holdInstructionPics">
                <div className="table" style={{margin: "2rem 0", gap: "2rem"}}>
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