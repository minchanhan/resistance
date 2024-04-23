import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./GameTable/MissionToken";
import VoteTrack from "./GameTable/VoteTrack";

function GameArea({
  handleTeamSubmit,
  handleVote,
  handleMissionIn,

  username,
  capacity, 
  missionTeamSizes,

  teamSelectHappening,
  isMissionLeader,
  disableTeamSubmit,
  voteHappening,
  disableVoteBtns,
  missionHappening,
  isGoingOnMission,
  disableMissionPass,
  disableMissionFail,

  seats,
  selectedPlayers,
  setSelectedPlayers,
  goodTeamStyle,
  badTeamStyle,
  
  missionNumber,
  curMissionVoteDisapproves,
  missionResultTrack,
  missionHistory,

  is4K,
  isReallyShort,
  isThinning,
  isPrettyThin,
  isReallyThin,
  isMostThin,
}) {
  const topRowLength = Math.ceil(seats.length / 2);
  const bottomRowLength = Math.floor(seats.length / 2);

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

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);

    const timeout = setTimeout(() => {
      setFlash(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    seats,
    teamSelectHappening,
    voteHappening,
    missionHappening,
  ]);

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

  const handleTeamSelecting = (seatUsername) => {
    if (!isMissionLeader) return;

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
    
    setSelectedPlayers(updatedSelection);
  };

  const renderPlayerBox = (
    seatUsername, 
    seatIsLeader, 
    seatOnMission, 
    seatTeam, 
    seatLeft
  ) => {
    return (
      <PlayerBox
        username={seatUsername}
        isLeader={seatIsLeader}
        onMission={seatOnMission || selectedPlayers.includes(seatUsername)}
        teamStyle={
          seatTeam === "badTeam" ? badTeamStyle 
          : seatTeam === "goodTeam" ? goodTeamStyle
          : {}
        }
        seatLeft={seatLeft}
        ownName={username === seatUsername}
        onClick={() => {
          handleTeamSelecting(seatUsername);
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
            const seatIsLeader = seat[1];
            const seatOnMission = seat[2];
            const seatTeam = seat[3];
            const seatLeft = seat[4];
            
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
                  {renderPlayerBox(
                    seatUsername, 
                    seatIsLeader, 
                    seatOnMission, 
                    seatTeam, 
                    seatLeft
                  )}
                </div>
              )
            } else {
              return <Fragment key={seatUsername}></Fragment>
            }
          })
        }
      </div>

      <div className={`table ${flash ? 'flash' : ''}`}>
        
        <div className="missionTokenGrid">
          {
            missionTeamSizes.map(function(teamSize, i) {
              return (
                <MissionToken
                  key={i}
                  isPassed={missionResultTrack[i] === "pass"} 
                  isFailed={missionResultTrack[i] === "fail"}
                  current={missionNumber === (i+1)} 
                  isDone={(i+1) < missionNumber}
                  missionTeamSize={teamSize}
                  missionHistory={missionHistory[i]}
                  twoFails={(i+1) === 4 && capacity >= 7}
                  isReallyShort={isReallyShort}
                  isReallyThin={isReallyThin}
                  isMostThin={isMostThin}
                />
              )
            })
          }
        </div>
        
        <div className="voteTrackGrid">
          {
            [0,1,2,3,4].map(function(num, i) {
              return (
                <VoteTrack 
                  key={i} 
                  isFilled={curMissionVoteDisapproves > i} 
                  number={(i+1)}
                />
              )
            })
          }
        </div>

        <div className="tableBtns">
          {
            teamSelectHappening && isMissionLeader ? (
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
            ) : missionHappening && isGoingOnMission ? (
              <div>
                <Button 
                  color="green" 
                  id="passBtn" 
                  disabled={disableMissionPass} 
                  onClick={() => handleMissionIn(true)}
                  sx={{ fontWeight: 600 }}
                >
                  Pass
                </Button>
                <Button 
                  color="red" 
                  id="failBtn" 
                  disabled={disableMissionFail} 
                  onClick={() => handleMissionIn(false)}
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
            const seatIsLeader = seat[1];
            const seatOnMission = seat[2];
            const seatTeam = seat[3];
            const seatLeft = seat[4];

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
                  {renderPlayerBox(
                    seatUsername, 
                    seatIsLeader, 
                    seatOnMission, 
                    seatTeam, 
                    seatLeft
                  )}
                </div>
              )
            } else {
              return <Fragment key={seatUsername}></Fragment>
            }
          })
        }
      </div>
    </div>
  )
}

export default GameArea;