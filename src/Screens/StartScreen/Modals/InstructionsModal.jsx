import React from "react";
import { Button, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PlayerBox from "../../GameScreen/Components/GameArea/PlayerBox/PlayerBox";
import MissionToken from "../../GameScreen/Components/GameArea/GameTable/MissionToken";
import VoteTrack from "../../GameScreen/Components/GameArea/GameTable/VoteTrack";
import "../../../App.css";

function InstructionsModal({
  open, 
  handleInstructionsClose,
  goodTeamStyle,
  badTeamStyle,
}) {
  const objectiveTitle = "Objective";
  const objective = `The Rebellion is a mafia style game, consisting of a good team (The Rebellion) and a bad team (The Spies). The Rebellion \
  is attempting to overthrow the corrupted leaders by passing missions (described below), but the spies are attempting to sabotage these missions.`;

  const pregameTitle = `Pregame Info`;
  const pregame = `When the room admin clicks Start, players will be randomly be placed on the Rebellion or Spy team. \
  The chart below shows how many players are on each team based on number of players.`;

  const pregame2 = `The Rebellion will not know any players' teams, other players will appear as black fists. \
  The Spies will see their own and fellow spies' fists as red, and the rebellions' as blue.`

  const gameplayTitle = "Gameplay";
  const gameplay = `At the start of the game (mission 1 of 5), a leader will randomly be chosen. For each mission, the leader \
  (player with star icon) has X minutes to discuss and submit a team for a mission (click on players and click "submit"). 

  The number of players that go on each mission is indicated by the mission trackers on the table (big circles). \
  Players will take a majority vote on if this selected group of players (checkbox icon) should go on the mission. \
  If the vote does not pass (or the leader fails to submit a team in time), then the leader to the right will suggest a new mission team. \
  If a team is disapproved/selection time runs out 5 times for a single mission, the spy team automatically wins.

  If a mission is approved, the rebellion players must choose to "pass" the mission, but the spies have a choice to pass or fail the mission. \
  Players cannot see who chose what, they just see the results once the mission concludes (same goes for voting results).\
  On most missions, just one fail is required to fail the entire mission (Mission 4 for 7+ player games require 2 FAILS). \
  Once the mission has ended, the next leader suggests a team for the next mission.

  Each game consists of 5 missions and the winning team is decided by best 3 out of 5. 
  You can hover over the mission trackers to see mission team history.`;

  const gameplay2 = `Admins can also use the following commands if needed: 
  - /makeadmin <username>, to transfer ownership.
  - /kick <username>, to kick player (not during games).`;

  const additionalTitle = "Additional Notes";
  const additional = `- This game is best played over voice chat! Consider using a Discord server.
  - Please do not message any players privately.
  - Be careful when leaving your current tab if you're playing on a mobile device. Some browsing apps, including Chrome, have "memory saver" features \
  that discard background tabs. You may be kicked from your room if your leave your tab.`;

  return (
    <Modal
      open={open}
      onClose={handleInstructionsClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modalBox" style={{width: "80%", height: "80%", gap: "0.5rem"}}>
        <div className="modalHeader">
          Instructions:
          <CloseIcon
            className="closeModal" 
            onClick={handleInstructionsClose} 
          />
        </div>

        <div className="modalContent">
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
            </div>

            <div className="instructionsText">{pregame2}</div>
            <div className="holdInstructionPics">
              <div style={{padding: "0.5rem"}}>
                <PlayerBox
                  isLeader={true}
                  onMission={true}
                  username="unknown"
                />
              </div>

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
              <div className="table" style={{margin: "2rem 0"}}>
                <div className="missionTokenGrid">
                  <MissionToken
                    isPassed
                    missionTeamSize={2}
                    isDone
                    missionHistory={["corn", "chan"]}
                  />
                  <MissionToken
                    isFailed
                    missionTeamSize={3}
                    isDone
                    missionHistory={["corn", "chan", "hani"]}
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

                <div style={{alignSelf: "center"}}>
                  <Button
                    color="green" 
                    id="passBtn" 
                    sx={{ fontWeight: 600 }}
                  >
                    Pass
                  </Button>
                  <Button 
                    color="red" 
                    id="failBtn" 
                    sx={{ fontWeight: 600 }}
                  >
                    Fail
                  </Button>
                </div>
              </div>
            </div>
            <div className="instructionsText">{gameplay2}</div>
          </div>                 
          
          <div className="instructionsBox">
            <div className="instructionsSubtitle">{additionalTitle}</div>
            <div className="instructionsText">{additional}</div>
          </div>                      
        </div>
      </div>
    </Modal>
  )
}

export default InstructionsModal;