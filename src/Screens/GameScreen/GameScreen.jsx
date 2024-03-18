import { React } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";
import GameSettings from "../../Components/GameSettings.jsx";

function GameScreen({ 
  socket, 
  username, 
  room, 
  isAdmin,
  seats, 
  capacity,
  onChangedCapacity,
  selectionTime,
  onChangedSelectionTime,
  privateRoom,
  onChangedPrivateRoom,
  gameStarted, 
  gameMasterSpeech, 
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
  roomAdminName,
  startGame
}) {
  
  return (
    <div className="gameScreen">
      <div className="left">
        <GameTable 
          socket={socket}
          room={room}
          seats={seats}
          capacity={capacity} 
          username={username} // for testing only
          leaderSelecting={leaderSelecting}
          disableTeamSubmit={disableTeamSubmit}
          setDisableTeamSubmit={setDisableTeamSubmit}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          disableVoteBtns={disableVoteBtns}
          setDisableVoteBtns={setDisableVoteBtns}
          voteHappening={voteHappening}
          curMissionVoteDisapproves={curMissionVoteDisapproves}
          goingOnMission={goingOnMission}
          disableMissionActions={disableMissionActions}
          setDisableMissionActions={setDisableMissionActions}
          missionNumber={missionNumber}
          missionResultTrack={missionResultTrack}
        />
        <InfoTable 
          room={room} 
          capacity={capacity} 
          seats={seats} 
          topText={`Room Admin: ${roomAdminName}`}
          missionNumber={missionNumber}
          gameStarted={gameStarted}
        />
      </div>
      <div className="right">
        <ChatBox socket={socket} username={username} />
        {
          gameStarted ? (
            <GameCommands gameMasterSpeech={gameMasterSpeech}/>
          ) : (
            <div>
              <GameSettings
                capacity={capacity}
                curNumPlayers={seats.length}
                onChangedCapacity={onChangedCapacity}
                selectionTime={selectionTime}
                onChangedSelectionTime={onChangedSelectionTime}
                privateRoom={privateRoom}
                onChangedPrivateRoom={onChangedPrivateRoom}
                isAdmin={isAdmin}
                startGame={startGame}
              />
            </div>
            
          )
        }
        
      </div>
    </div>
  )
}

export default GameScreen;