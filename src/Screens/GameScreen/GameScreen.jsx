import { React } from "react";
import "../../App.css";

import ChatBox from "./Components/ChatBox/ChatBox";
import GameTable from "./Components/GameTable/GameTable";
import InfoTable from "./Components/InfoTable/InfoTable";
import GameCommands from "./Components/GameCommands/GameCommands.jsx";

function GameScreen({ 
  socket, 
  room, 
  username, 
  seats, 
  capacity, 
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
  missionResultTrack
}) {
  
  return (
    <div className="gameScreen">
      <div className="left">
        <GameTable 
          socket={socket}
          room={room}
          seats={seats}
          capacity={capacity} 
          gameStarted={gameStarted}
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
          timer={false}
        />
      </div>
      <div className="right">
        <ChatBox socket={socket} username={username} />
        <GameCommands gameMasterSpeech={gameMasterSpeech}/>
      </div>
    </div>
  )
}

export default GameScreen;