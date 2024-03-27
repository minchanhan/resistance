import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "../../App.css";

import JoinRoomModal from "./Components/JoinRoomModal";
import InstructionsModal from "./Components/InstructionsModal";
import DisplayButton from "../../Components/DisplayButton";
import UserInput from "../../Components/UserInput";
import RebellionLogo from "../../assets/RebellionLogo.jsx";

function StartScreen({ 
  socket, 
  username, 
  onChangedUsername, 
  setIsAdmin,
  randomStatusMsg
}) {
  const [joinRoomModal, setJoinRoomModal] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const [usernameWarningCheck, setUsernameWarningCheck] = useState(false); // activate warning if needed

  const is4K = useMediaQuery({ minWidth: 2400 });

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: joinRoomModal ? "60svw" : "85svw",
    maxWidth: joinRoomModal ? "20rem" : "85svw",
    bgcolor: 'gray',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItmes: "center",
  };

  const modalHeader = {
    color: "white", 
    fontSize: joinRoomModal ? "x-large" : "xx-large", 
    fontWeight: "700", 
    marginBottom: "0",
  };

  const validUsername = () => {
    if (username.length >= 3 && username.length <= 10) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreate = () => {
    setUsernameWarningCheck(true); // start checking for username
    if (validUsername()) {
      socket.emit("set_username", username);
      socket.emit("set_room_admin", true);
      socket.emit("set_capacity", 5); // default values
      socket.emit("set_selection_time", 7); // default values
      socket.emit("set_private", true); // default values
      setIsAdmin(true);
      socket.emit("create_room");
    }
  };

  const handleJoinOpen = () => {
    setUsernameWarningCheck(true);
    if (validUsername()) {
      setJoinRoomModal(true);
      socket.emit("set_username", username);
    }
  };
  const handleJoinClose = () => {
    setJoinRoomModal(false);
  };

  const handleRandomJoin = () => {
    setUsernameWarningCheck(true);
    if (validUsername()) {
      socket.emit("set_username", username);
      socket.emit("join_room", "random_join");
    }
  }

  const handleInstructionsOpen = () => {
    setInstructionsOpen(true);
  }
  const handleInstructionsClose = () => {
    setInstructionsOpen(false);
  }
  
  return (
    <div className="startScreen">
      <JoinRoomModal 
        socket={socket}
        open={joinRoomModal} 
        handleJoinClose={handleJoinClose}
        style={modalStyle}
        modalHeader={modalHeader}
      />
      <InstructionsModal 
        open={instructionsOpen} 
        handleInstructionsClose={handleInstructionsClose}
        style={modalStyle}
        modalHeader={modalHeader}
      />

      <div className="startTitle">
        <RebellionLogo />
      </div>
      
      <div className="userOptionsBox">
        <UserInput 
          value={username} 
          onChange={ (event) => {
            setJoinRoomModal(false);
            if (event.target.value.slice(-1) !== " ") onChangedUsername(event.target.value);
          }}
          helperText={!validUsername() && usernameWarningCheck ? "Name must be 3-10 chars" : ""}
          showError={!validUsername() && usernameWarningCheck}
        />
        {
          randomStatusMsg !== "" ? <p style={{ color: "red" }}>{randomStatusMsg}</p> : <></>
        }

        <DisplayButton onClick={handleCreate} text="Create Room" />
        <DisplayButton onClick={handleJoinOpen} text="Join Room with Code" />
        <DisplayButton onClick={handleRandomJoin} text="Join Random Room" />
        <DisplayButton onClick={handleInstructionsOpen} text="Instructions" />
      </div>
      
      <footer className="footer">
        <a href="http://localhost:3000/">Contact</a>
        <a href="http://localhost:3000/">Terms of Service</a>
        <a href="http://localhost:3000/">Credits</a>
      </footer>
    </div>
  );
}

export default StartScreen;