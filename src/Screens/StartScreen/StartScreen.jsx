import React, { useState } from "react";
import "../../App.css";

import { Grid, Button, TextField } from "@mui/material";
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

  const validUsername = () => {
    if (username.length >= 1 && username.length <= 9) { // change min to 5 later
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
      <h1>
        The Resistance
      </h1>

      <Grid container direction="column">
        <Grid item xs>
          <TextField
            error={!validUsername() && usernameWarningCheck}
            id={!validUsername() && usernameWarningCheck ? "" : "outlined-error-helper-text"}
            label={!validUsername() && usernameWarningCheck ? "Warning" : "Username"}
            defaultValue=""
            helperText={!validUsername() && usernameWarningCheck ? "Name must be 1-9 chars" : ""}
            onChange={ (event) => {
              setJoinRoomModal(false);
              onChangedUsername(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs>
          <Button onClick={handleCreate}>Create Room</Button>
        </Grid>

        <Grid item xs>
          <Button onClick={handleJoinOpen}>Join Room with Code</Button>
          <JoinRoomModal 
            socket={socket}
            open={joinRoomModal} 
            handleJoinClose={handleJoinClose}
          />
        </Grid>

        <Grid item xs>
          <Button onClick={handleRandomJoin}>Join Random Room</Button>
        </Grid>
        {
          randomStatusMsg !== "" ? <p style={{ fontSize: "0.75em", color: "red" }}>{randomStatusMsg}</p> : <></>
        }

        <br />
        <Grid item xs>
          <Button onClick={handleInstructionsOpen}>Instructions</Button>
          <InstructionsModal 
            open={instructionsOpen} 
            handleInstructionsClose={handleInstructionsClose}
          />
        </Grid>
      </Grid>

      <footer className="footer">
        credits: wood - 
        <a href="https://www.freepik.com/free-vector/wooden-background-texture-brown-wood-planks_13327400.htm#page=2&query=wood%20table%20top&position=32&from_view=search&track=ais&uuid=78cbee26-baa7-4307-9fed-5ea5d0d061aa">Image by upklyak</a> on Freepik
      </footer>
    </div>
  )
}

export default StartScreen;