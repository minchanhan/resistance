import React, { useState } from "react";
import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";

function GameTable({
  socket,
  room,
  seats, 
  numPlayers, 
  gameStarted, 
  username, 
  leaderSelecting,
  selectedPlayers,
  setSelectedPlayers,
  voteHappening,
  voteApproved,
  curMissionVoteDisapproves
}) {
  const topRowLength = numPlayers >= 7 ? 4 : 3;
  const bottomRowLength = numPlayers >= 8 ? 4 : (numPlayers >= 6) ? 3 : 2;
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };

  const [disableVote, setDisableVote] = useState(false);
  const [disableMissionVote, setDisableMissionVote] = useState(false);
  const [disableTeamSubmit, setDisableTeamSubmit] = useState(false);

  // for dynamic player rows
  var playerRow = (rowLength) => ({
    display: 'grid',
    height: '100%',
    gridTemplateColumns: `repeat(${rowLength}, 1fr)`,
    gridTemplateRows: '1fr',
  });

  var tableRow = (ninth, tenth) => ({
    display: 'grid',
    height: '100%',
    gridTemplateColumns: tenth ? '1fr 5fr 1fr' : ninth ? '1fr 6fr' : '1fr',
    gridTemplateRows: '1fr',
  });

  const handleMissionSelection = (seatUsername) => {
    if (!leaderSelecting) return;

    // only leaders can handle this
    var updatedSelection = [...selectedPlayers];
    
    if (updatedSelection.includes(seatUsername)) {
      var index = updatedSelection.indexOf(seatUsername);
      updatedSelection.splice(index, 1);
    } else {
      if (updatedSelection.length < 3) { // need to change
        updatedSelection.push(seatUsername);
      }
    }
    
    // Update state and check if submit button should be disabled
    setSelectedPlayers(updatedSelection);
  };

  const handleTeamSubmit = () => {
    socket.emit("selected_players_for_vote", { selectedPlayers: selectedPlayers, room: room });
    setDisableTeamSubmit(true);
  };

  const handleVote = (approve) => {
    socket.emit("vote_is_in", { selectedPlayers: selectedPlayers, approve: approve, room: room });
    setDisableVote(true);
  };

  const handleMission = (pass) => {
    socket.emit("mission_result_is_in", { pass: pass, room: room });
    setDisableMissionVote(true);
  };

  const gameStartedPlayerBox = (i, seatIsLeader, seatOnMission, seatTeam, seatUsername) => {
    return (
      <PlayerBox 
        key={i}
        isLeader={seatIsLeader}
        onMission={seatOnMission}
        inTeamVote={selectedPlayers.includes(seatUsername)}
        teamStyle={seatTeam === "badTeam" ? badTeamStyle : {}} 
        username={seatUsername}
        ownName={username === seatUsername}
        onClick={() => {
          handleMissionSelection(seatUsername);
        }}
      />
    )
  }

  return (
    <div className="fullTable">
      <div style={playerRow(topRowLength)} className="holdPlayers">
        {
          // this map displays up to 4 players, 3 if there are <= 6 players
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];
            const seatIsLeader = seat[2];
            const seatOnMission = seat[3];
            
            if (i < topRowLength) {
              if (gameStarted) {
                return gameStartedPlayerBox(i, seatIsLeader, seatOnMission, seatTeam, seatUsername);
              } else {
                return <PlayerBox 
                          key={i}
                          username={seatUsername || "waiting.."}
                          ownName={username === seatUsername}
                        />
              }
            } else {
              return <></>
            }
          })
        }
      </div>

      <div style={tableRow(seats.length >= 9, seats.length >= 10)}>
        {
          seats.length >= 9 && !gameStarted ?
          <div className="holdPlayers">
            <PlayerBox
              username={seats[8][0] || "waiting.."} 
              ownName={username === seats[8][0]}
            />
          </div>
          : seats.length >= 9 && gameStarted ?
            <div className="holdPlayers">
              { gameStartedPlayerBox(8, seats[8][2], seats[8][3], seats[8][1], seats[8][0]) }
            </div>
            : null
        }

        <div className="table">
          <div className="missionTokenGrid">
            <MissionToken current/>
            <MissionToken />
            <MissionToken />
            <MissionToken />
            <MissionToken />
          </div>

          <div className="voteTrackLabel">
            Vote Track
          </div>
          
          <div className="voteTrackGrid">
            <VoteTrack isFilled={curMissionVoteDisapproves > 0} number={1}/>
            <VoteTrack isFilled={curMissionVoteDisapproves > 1} number={2}/>
            <VoteTrack isFilled={curMissionVoteDisapproves > 2} number={3}/>
            <VoteTrack isFilled={curMissionVoteDisapproves > 3} number={4}/>
            <VoteTrack isFilled={curMissionVoteDisapproves > 4} number={5}/>
          </div>

          { 
            leaderSelecting ? (
              <div>
                <button id="submitBtn" disabled={selectedPlayers.length < 3 || disableTeamSubmit} onClick={() => handleTeamSubmit()}>
                  Submit Team
                </button>
              </div>
            ) : voteHappening ? (
              <div>
                <button id="approveBtn" disabled={disableVote} onClick={() => handleVote(true)}>
                  Approve
                </button>
                <button id="disapproveBtn" disabled={disableVote} onClick={() => handleVote(false)}>
                  Disapprove
                </button>
              </div>
            ) : voteApproved ? (
              <div>
                <button id="passBtn" disabled={disableMissionVote} onClick={() => handleMission(true)}>
                  Pass
                </button>
                <button id="failBtn" disabled={disableMissionVote} onClick={() => handleMission(false)}>
                  Fail
                </button>
              </div>
            ) : <></>
          }
        </div>

        { 
          seats.length >= 10 && !gameStarted ?
          <div className="holdPlayers">
            <PlayerBox
              username={seats[9][0] || "waiting.."} 
              ownName={username === seats[9][0]}
            />
          </div>
          : seats.length >= 10 && gameStarted ?
            <div className="holdPlayers">
              { gameStartedPlayerBox(9, seats[9][2], seats[9][3], seats[9][1], seats[9][0]) }
            </div>
            : null
        }
      </div>

      <div style={playerRow(bottomRowLength)} className="holdPlayers">
        {
          // this map displays up to 4 players, 2 if there are 5 players, 3 if <= 7, 4 if >= 8
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];
            const seatIsLeader = seat[2];
            const seatOnMission = seat[3];

            if (i >= topRowLength && i < bottomRowLength + topRowLength) {
              if (username === seatUsername) {
                // color the username
              }
              if (gameStarted) {
                return gameStartedPlayerBox(i, seatIsLeader, seatOnMission, seatTeam, seatUsername);
              } else {
                return <PlayerBox 
                          key={i}
                          username={seatUsername || "waiting.."}
                          ownName={username === seatUsername}
                        />
              }
            } else {
              return <></>
            }
          })
        }
      </div>
    </div>
  )
}

export default GameTable;