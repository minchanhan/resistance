import React, { useState } from "react";
import "../../App.css";

import { Button, TextField } from "@mui/material";
import JoinRoomModal from "./Components/JoinRoomModal";
import InstructionsModal from "./Components/InstructionsModal";

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: joinRoomModal ? "60svw" : "85svw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const modalHeader = {
    color: "var(--main-text-color)", 
    fontSize: "x-large", 
    fontWeight: "700", 
    marginBottom: "0"
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
      <div className="startTitle">The Rebellion</div>
      
      <div className="usernameField">
        <TextField
          className="usernameTextField"
          error={!validUsername() && usernameWarningCheck}
          id={!validUsername() && usernameWarningCheck ? "" : "outlined-error-helper-text"}
          label={!validUsername() && usernameWarningCheck ? "Warning" : "Username"}
          value={username}
          helperText={!validUsername() && usernameWarningCheck ? "Name must be 3-10 chars" : ""}
          onChange={ (event) => {
            setJoinRoomModal(false);
            if (event.target.value.slice(-1) !== " ") onChangedUsername(event.target.value);
          }}
        />
      </div>
      
      <div>
        <Button onClick={handleCreate}>Create Room</Button>
      </div>

      <div>
        <Button onClick={handleJoinOpen}>Join Room with Code</Button>
        <JoinRoomModal 
          socket={socket}
          open={joinRoomModal} 
          handleJoinClose={handleJoinClose}
          style={modalStyle}
          modalHeader={modalHeader}
        />
      </div>

      <div>
        <Button onClick={handleRandomJoin}>Join Random Room</Button>
      </div>
      {
        randomStatusMsg !== "" ? <p style={{ fontSize: "0.7rem", color: "red" }}>{randomStatusMsg}</p> : <></>
      }

      <br />
      <div>
        <Button onClick={handleInstructionsOpen}>Instructions</Button>
        <InstructionsModal 
          open={instructionsOpen} 
          handleInstructionsClose={handleInstructionsClose}
          style={modalStyle}
          modalHeader={modalHeader}
        />
      </div>

      <footer className="footer">
        By Minchan Han
      </footer>
    </div>
  )
}

export default StartScreen;