import React, { useState } from "react";
import "../../App.css";

import CreateRoomModal from "./Components/CreateRoomModal";
import { Grid, Button, TextField } from "@mui/material";
import JoinRoomModal from "./Components/JoinRoomModal";

function StartScreen({
  socket, 
  username, 
  setUsername, 
  roomCode, 
  setRoomCode,
  setGameStart
}) {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [joinRoomModal, setJoinRoomModal] = useState(false);

  const [capacity, setCapacity] = useState(5);
  const [usernameWarning, setUsernameWarning] = useState(false);

  const usernameValidate = () => {
    if (username.length >= 5) {
      return true;
    } else {
      return false;
    }
  }
  const handleCreateOpen = () => {
    setUsernameWarning(true);
    setCreateRoomModal(true);
  }
  const handleCreateClose = () => {
    setCreateRoomModal(false);
  }
  const handleJoinOpen = () => {
    setUsernameWarning(true);
    setJoinRoomModal(true);
  }
  const handleJoinClose = () => {
    setJoinRoomModal(false);
  }

  const createRoom = () => {
    if (usernameValidate()) {
      socket.emit("create_room", {username, roomCode, capacity});
      setGameStart(true);
    }
    return;
  }

  const joinRoom = () => {
    if (usernameValidate()) {
      if (roomCode !== "") {
        socket.emit("join_room", roomCode);
        setGameStart(true);
      }
    }
    return;
  };

  return (
    <div>
      <h1>
        The Resistance
      </h1>

      <Grid direction="column">
        <Grid xs>
          <TextField
            error={!usernameValidate() && usernameWarning}
            id={!usernameValidate() && usernameWarning ? "" : "outlined-error-helper-text"}
            label={!usernameValidate() && usernameWarning ? "Warning" : "Username"}
            defaultValue=""
            helperText={!usernameValidate() && usernameWarning ? "Minimum 5 characters" : ""}
            onChange={ (event) => {
              handleCreateClose();
              handleJoinClose();
              setUsername(event.target.value);
            }}
          />
        </Grid>

        <Grid xs>
          
          <Button onClick={handleJoinOpen}>Join Room</Button>
          {
            joinRoomModal ? (
              <JoinRoomModal 
                open={joinRoomModal && usernameValidate()} 
                handleJoinClose={handleJoinClose} 
                joinRoom={joinRoom}
                setRoomCode={setRoomCode} />
            ) : <></>
          }
        </Grid>
      
        <Grid xs>
          <Button onClick={handleCreateOpen}>Create Room</Button>
          {
            createRoomModal ? (
              <CreateRoomModal 
                open={createRoomModal && usernameValidate()} 
                handleCreateClose={handleCreateClose}
                capacity={capacity}
                setCapacity={setCapacity}
                createRoom={createRoom} />
            ) : <></>
          }
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