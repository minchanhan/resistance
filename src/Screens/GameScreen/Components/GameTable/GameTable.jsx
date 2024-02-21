import React, { useState } from "react";
import "../../../../App.css";

import PlayerBox from "./PlayerBox/PlayerBox";
import MissionToken from "./MissionToken";
import VoteTrack from "./VoteTrack";

function GameTable({ team, seatNumber, numPlayers, playerLobby }) {
  const topRowLength = numPlayers >= 7 ? 4 : 3;
  const bottomRowLength = numPlayers >= 8 ? 4 : (numPlayers >= 6) ? 3 : 2;

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

  return (
    <div className="fullTable">
      <div style={playerRow(topRowLength)}>
        { 
          // this map displays up to 4 players, 3 if there are <= 6 players
          playerLobby.map(function(player, i) { 
            if (i < topRowLength) {
              return <PlayerBox key={i} team={""} username={player.username}/>
            } else {
              return <></>
            }
          })
        }
      </div>

      <div style={tableRow(playerLobby.length >= 9, playerLobby.length >= 10)}>
        { 
          playerLobby.length >= 9 ?
            <PlayerBox team={""} username={playerLobby[8].username || "waiting.."}/> : null
        }

        <div className="table">
          <div className="missionTokenGrid">
            <MissionToken current/>
            <MissionToken />
            <MissionToken />
            <MissionToken />
            <MissionToken />
          </div>
          
          <div className="voteTrackGrid">
            <VoteTrack isFilled/>
            <VoteTrack />
            <VoteTrack />
            <VoteTrack />
            <VoteTrack />
          </div>
        </div>

        { 
          playerLobby.length >= 10 ?
            <PlayerBox team={""} username={playerLobby[9].username || "waiting.."}/> : null
        }
      </div>

      <div style={playerRow(bottomRowLength)}>
        {
          // this map displays up to 4 players, 2 if there are 5 players, 3 if <= 7, 4 if >= 8
          playerLobby.map(function(player, i) {
            if (i >= topRowLength && i < bottomRowLength + topRowLength) {
              return <PlayerBox key={i} team={""} username={player.username || "waiting.."}/>
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