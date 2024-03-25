import React from "react";
import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";
import { Button } from "@mui/material";

function GameTable({
  socket,
  room,
  seats, 
  capacity, 
  username, 
  leaderSelecting,
  disableTeamSubmit,
  setDisableTeamSubmit,
  selectedPlayers,
  setSelectedPlayers,
  disableVoteBtns,
  setDisableVoteBtns,
  voteHappening,
  curMissionVoteDisapproves,
  goingOnMission,
  disableMissionActions,
  setDisableMissionActions,
  missionNumber,
  missionResultTrack,
  isHighRes,
  is4K,
  isReallyShort,
  isReallyThin
}) {
  const topRowLength = capacity >= 9 ? 5 : capacity >= 7 ? 4 : 3;
  const bottomRowLength = capacity >= 10 ? 5 : capacity >= 8 ? 4 : capacity >= 6 ? 3 : 2;
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };

  const missionTeamSize1 = capacity <= 7 ? 2 : 3;
  const missionTeamSize2 = capacity <= 7 ? 3 : 4;
  const missionTeamSize3 = capacity === 5 ? 2 : (capacity === 7) ? 3 : 4;
  const missionTeamSize4 = capacity <= 6 ? 3 : (capacity === 7) ? 4 : 5;
  const missionTeamSize5 = capacity === 5 ? 3 : (capacity <= 7) ? 4 : 5;
  const missionTeamSizes = [missionTeamSize1, missionTeamSize2, missionTeamSize3, missionTeamSize4, missionTeamSize5];

  // for dynamic player rows
  var playerRow = (rowLength, isBottomRow=false) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${rowLength}, 1fr)`,
    gridTemplateRows: '1fr',
    direction: isBottomRow ? 'rtl' : '',
  });

  const handleMissionSelection = (seatUsername) => {
    if (!leaderSelecting) return;

    // only leaders can handle this
    var updatedSelection = [...selectedPlayers];
    
    if (updatedSelection.includes(seatUsername)) {
      var index = updatedSelection.indexOf(seatUsername);
      updatedSelection.splice(index, 1);
    } else {
      if (updatedSelection.length < missionTeamSizes[missionNumber - 1]) {
        updatedSelection.push(seatUsername);
      }
    }
    
    // Update state and check if submit button should be disabled
    setSelectedPlayers(updatedSelection);
  };

  const handleTeamSubmit = () => {
    socket.emit("selected_players_for_vote", { selectedPlayers: selectedPlayers, room: room });
    setDisableTeamSubmit(true); // 1b
  };

  const handleVote = (approve) => {
    socket.emit("vote_is_in", { username: username, selectedPlayers: selectedPlayers, approve: approve, room: room });
    setDisableVoteBtns(true); // 2b
  };

  const handleMission = (pass) => {
    socket.emit("mission_result_is_in", { pass: pass, room: room });
    setDisableMissionActions(true); // 3b
  };

  const gameStartedPlayerBox = (seatIsLeader, seatOnMission, seatTeam, seatUsername) => {
    return (
      <PlayerBox 
        isLeader={seatIsLeader}
        onMission={seatOnMission}
        inTeamVote={selectedPlayers.includes(seatUsername)}
        teamStyle={seatTeam === "badTeam" ? badTeamStyle : {}} 
        username={seatUsername}
        ownName={username === seatUsername}
        onClick={() => {
          handleMissionSelection(seatUsername);
        }}
        isHighRes={isHighRes}
        is4K={is4K}
        isReallyShort={isReallyShort}
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
              return (
                <div key={seatUsername}>
                  {gameStartedPlayerBox(seatIsLeader, seatOnMission, seatTeam, seatUsername)}
                </div>
              )
            }
          })
        }
      </div>

      <div className="table">
        <div className="missionTokenGrid">
          <MissionToken 
            isPassed={missionResultTrack[0] === "pass"} 
            isFailed={missionResultTrack[0] === "fail"}
            current={missionNumber === 1} 
            missionTeamSize={missionTeamSize1}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
          />
          <MissionToken
            isPassed={missionResultTrack[1] === "pass"} 
            isFailed={missionResultTrack[1] === "fail"}
            current={missionNumber === 2} 
            missionTeamSize={missionTeamSize2}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
          />
          <MissionToken
            isPassed={missionResultTrack[2] === "pass"} 
            isFailed={missionResultTrack[2] === "fail"}
            current={missionNumber === 3} 
            missionTeamSize={missionTeamSize3}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
          />
          <MissionToken
            isPassed={missionResultTrack[3] === "pass"} 
            isFailed={missionResultTrack[3] === "fail"}
            current={missionNumber === 4} 
            missionTeamSize={missionTeamSize4}
            twoFails={capacity >= 7}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
          />
          <MissionToken
            isPassed={missionResultTrack[4] === "pass"} 
            isFailed={missionResultTrack[4] === "fail"}
            current={missionNumber === 5} 
            missionTeamSize={missionTeamSize5}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
          />
        </div>
        
        <div className="voteTrackGrid">
          <VoteTrack isFilled={curMissionVoteDisapproves > 0} number={1}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 1} number={2}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 2} number={3}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 3} number={4}/>
          <VoteTrack isFilled={curMissionVoteDisapproves > 4} number={5}/>
        </div>

        <div className="tableBtns">
          {
            leaderSelecting ? (
              <Button
                id="submitBtn" 
                color="secondary"
                disabled={selectedPlayers.length < missionTeamSizes[missionNumber - 1] || disableTeamSubmit} 
                onClick={() => handleTeamSubmit()}
              >
                Submit Team
              </Button>
            ) : voteHappening ? (
              <div>
                <Button color="green" id="approveBtn" disabled={disableVoteBtns} onClick={() => handleVote(true)}>
                  Approve
                </Button>
                <Button color="red" id="disapproveBtn" disabled={disableVoteBtns} onClick={() => handleVote(false)}>
                  Disapprove
                </Button>
              </div>
            ) : goingOnMission ? (
              <div>
                <Button color="green" id="passBtn" disabled={disableMissionActions} onClick={() => handleMission(true)}>
                  Pass
                </Button>
                <Button color="red" id="failBtn" disabled={disableMissionActions} onClick={() => handleMission(false)}>
                  Fail
                </Button>
              </div>
            ) : (
              <div className="tableText">
                Vote Track
              </div>
            )
          }
        </div>
      </div>

      <div style={playerRow(bottomRowLength, true)} className="holdPlayers">
        {
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];
            const seatIsLeader = seat[2];
            const seatOnMission = seat[3];

            if (i >= topRowLength) {
              return (
                <div key={seatUsername}>
                  {gameStartedPlayerBox(seatIsLeader, seatOnMission, seatTeam, seatUsername)}
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default GameTable;