import React, { useState } from "react";
import "../../App.css";

import CreateRoomModal from "./Components/CreateRoomModal";
import { Grid, Button, TextField } from "@mui/material";
import JoinRoomModal from "./Components/JoinRoomModal";

function StartScreen({ socket, username, onChangedUsername }) {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [joinRoomModal, setJoinRoomModal] = useState(false);

  const [usernameWarningCheck, setUsernameWarningCheck] = useState(false); // activate warning if needed

  const validUsername = () => {
    if (username.length >= 1) { // change to 5 later
      return true;
    } else {
      return false;
    }
  };

  const handleCreateOpen = () => {
    setUsernameWarningCheck(true); // start checking for username
    if (validUsername()) {
      setCreateRoomModal(true);
      socket.emit("set_username", username);
    }
  };
  const handleCreateClose = () => {
    setCreateRoomModal(false);
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
            helperText={!validUsername() && usernameWarningCheck ? "Minimum 5 characters" : ""}
            onChange={ (event) => {
              setCreateRoomModal(false); // ensure modals don't open until user clicks
              setJoinRoomModal(false);
              onChangedUsername(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs>
          <Button onClick={handleCreateOpen}>Create Room</Button>
          <CreateRoomModal 
            socket={socket}
            open={createRoomModal} 
            handleCreateClose={handleCreateClose}
          />
        </Grid>

        <Grid item xs>
          <Button onClick={handleJoinOpen}>Join Room with Code</Button>
          <JoinRoomModal 
            socket={socket}
            open={joinRoomModal} 
            handleJoinClose={handleJoinClose}
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