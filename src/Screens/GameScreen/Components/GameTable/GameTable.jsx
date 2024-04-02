import React, { useEffect, useState } from "react";
import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";
import { Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";

function GameTable({
  socket,
  roomCode,
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
  is4K,
  isReallyShort,
  isThinning,
  isPrettyThin,
  isReallyThin,
  isMostThin,
}) {
  const topRowLength = Math.ceil(seats.length / 2);
  const bottomRowLength = Math.floor(seats.length / 2);;
  const badTeamStyle = {
    filter: 'invert(21%) sepia(76%) saturate(5785%) hue-rotate(338deg) brightness(57%) contrast(119%)'
  };

  const missionTeamSize1 = capacity <= 7 ? 2 : 3;
  const missionTeamSize2 = capacity <= 7 ? 3 : 4;
  const missionTeamSize3 = capacity === 5 ? 2 : (capacity === 7) ? 3 : 4;
  const missionTeamSize4 = capacity <= 6 ? 3 : (capacity === 7) ? 4 : 5;
  const missionTeamSize5 = capacity === 5 ? 3 : (capacity <= 7) ? 4 : 5;
  const missionTeamSizes = [missionTeamSize1, missionTeamSize2, missionTeamSize3, missionTeamSize4, missionTeamSize5];

  // alternates:
  const isThinning2 = useMediaQuery({ maxWidth: 560 });
  const isPrettyThin2 = useMediaQuery({ maxWidth: 460 });
  const isReallyThin2 = useMediaQuery({ maxWidth: 390 });
  const isReallyThin3 = useMediaQuery({ maxWidth: 365 });

  const [adjustTopPlayers, setAdjustTopPlayers] = useState(false);
  const [adjustBottomPlayers, setAdjustBottomPlayers] = useState(false);

  const [lowCramTopRow, setLowCramTopRow] = useState(false);
  const [lowCramBottomRow, setLowCramBottomRow] = useState(false);
  const [midCramTopRow, setMidCramTopRow] = useState(false);
  const [midCramBottomRow, setMidCramBottomRow] = useState(false);
  const [maxCramTopRow, setMaxCramTopRow] = useState(false);
  const [maxCramBottomRow, setMaxCramBottomRow] = useState(false);

  useEffect(() => {
    const maxCram = isThinning && seats.length >= 9;
    setMaxCramTopRow(maxCram);
    const midCram = isPrettyThin && seats.length >= 7;
    setMidCramTopRow(midCram);
    const lowCram = isReallyThin && seats.length >= 5;
    setLowCramTopRow(lowCram);

    if (maxCram || midCram || lowCram)
    {
      setAdjustTopPlayers(true);
    } else {
      setAdjustTopPlayers(false);
    }
  }, [ 
      seats,
      isThinning, isThinning2, 
      isPrettyThin, isPrettyThin2, 
      isReallyThin, isReallyThin2, isReallyThin3
    ]);

  useEffect(() => {
    const maxCram = isThinning && seats.length >= 10;
    setMaxCramBottomRow(maxCram);
    const midCram = isPrettyThin && seats.length >= 8;
    setMidCramBottomRow(midCram);
    const lowCram = isReallyThin && seats.length >= 6;
    setLowCramBottomRow(lowCram);

    if (maxCram || midCram || lowCram) 
    {
      setAdjustBottomPlayers(true);
    } else {
      setAdjustBottomPlayers(false);
    }
  }, [
      seats,
      isThinning, isThinning2, 
      isPrettyThin, isPrettyThin2, 
      isReallyThin, isReallyThin2, isReallyThin3
  ]);

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
    socket.emit("selected_players_for_vote", { selectedPlayers: selectedPlayers, roomCode: roomCode });
    setDisableTeamSubmit(true); // 1b
  };

  const handleVote = (approve) => {
    socket.emit("vote_is_in", { username: username, selectedPlayers: selectedPlayers, approve: approve, roomCode: roomCode });
    setDisableVoteBtns(true); // 2b
  };

  const handleMission = (pass) => {
    socket.emit("mission_result_is_in", { pass: pass, roomCode: roomCode });
    setDisableMissionActions(true); // 3b
  };

  const gameStartedPlayerBox = (
    seatIsLeader, 
    seatOnMission, 
    seatTeam, 
    seatUsername, 
  ) => {

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
        is4K={is4K}
        isThinning={isThinning} 
      />
    )
  }

  return (
    <div className={`fullTable ${capacity >= 9 ? "five" : capacity >= 7 ? "four" : ""}`}>
      <div className={`holdPlayers ${lowCramTopRow ? "lowTopCram" : ""} ${midCramTopRow ? "midTopCram" : ""} ${maxCramTopRow ? "maxTopCram" : ""}`}>
        {
          // this map displays up to 4 players, 3 if there are <= 6 players
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];
            const seatIsLeader = seat[2];
            const seatOnMission = seat[3];
            
            if (i < topRowLength) {
              const up = (i === 1) || (i === 3);
              const wayUp = (i === 2) && (seats.length >= 9);

              return (
                <div 
                  key={seatUsername}
                  className={`playerBox ${adjustTopPlayers ? "adjust" : ""} \
                    ${up ? "up" : ""} ${wayUp ? "wayUp" : ""}`
                  }
                >
                  {gameStartedPlayerBox(
                    seatIsLeader, 
                    seatOnMission, 
                    seatTeam, 
                    seatUsername, 
                  )}
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
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[1] === "pass"} 
            isFailed={missionResultTrack[1] === "fail"}
            current={missionNumber === 2} 
            missionTeamSize={missionTeamSize2}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[2] === "pass"} 
            isFailed={missionResultTrack[2] === "fail"}
            current={missionNumber === 3} 
            missionTeamSize={missionTeamSize3}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[3] === "pass"} 
            isFailed={missionResultTrack[3] === "fail"}
            current={missionNumber === 4} 
            missionTeamSize={missionTeamSize4}
            twoFails={capacity >= 7}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}
          />
          <MissionToken
            isPassed={missionResultTrack[4] === "pass"} 
            isFailed={missionResultTrack[4] === "fail"}
            current={missionNumber === 5} 
            missionTeamSize={missionTeamSize5}
            isReallyShort={isReallyShort}
            isReallyThin={isReallyThin}
            isMostThin={isMostThin}            
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
                sx={{ fontWeight: 600 }}
              >
                Submit Team
              </Button>
            ) : voteHappening ? (
              <div>
                <Button 
                  color="green" 
                  id="approveBtn" 
                  disabled={disableVoteBtns} 
                  onClick={() => handleVote(true)}
                  sx={{ fontWeight: 600 }}
                >
                  Approve
                </Button>
                <Button 
                  color="red" 
                  id="disapproveBtn" 
                  disabled={disableVoteBtns} 
                  onClick={() => handleVote(false)}
                  sx={{ fontWeight: 600 }}
                >
                  Disapprove
                </Button>
              </div>
            ) : goingOnMission ? (
              <div>
                <Button 
                  color="green" 
                  id="passBtn" 
                  disabled={disableMissionActions} 
                  onClick={() => handleMission(true)}
                  sx={{ fontWeight: 600 }}
                >
                  Pass
                </Button>
                <Button 
                  color="red" 
                  id="failBtn" 
                  disabled={disableMissionActions} 
                  onClick={() => handleMission(false)}
                  sx={{ fontWeight: 600 }}
                >
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

      <div 
        style={{direction: 'rtl'}}
        className={`holdPlayers ${lowCramBottomRow ? "lowBottomCram" : ""} ${midCramBottomRow ? "midBottomCram" : ""} ${maxCramBottomRow ? "maxBottomCram" : ""}`}
      >
        {
          seats.map(function(seat, i) {
            const seatUsername = seat[0];
            const seatTeam = seat[1];
            const seatIsLeader = seat[2];
            const seatOnMission = seat[3];

            if (i >= topRowLength) {
              var down = false;

              if (bottomRowLength >= 3) {
                down = ((i === (topRowLength + 1)) || (i === (topRowLength + 3)));
              }

              const wayDown = (i === 7) && (seats.length === 10);

              return (
                <div 
                  key={seatUsername}
                  className={`playerBox ${adjustBottomPlayers ? "adjust" : ""} \
                    ${down ? "down" : ""} ${wayDown ? "wayDown" : ""}`
                  }
                >
                  {gameStartedPlayerBox(
                    seatIsLeader, 
                    seatOnMission, 
                    seatTeam, 
                    seatUsername, 
                  )}
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