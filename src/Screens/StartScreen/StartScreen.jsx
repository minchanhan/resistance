import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../../App.css";

import JoinRoomModal from "./Components/JoinRoomModal";
import InstructionsModal from "./Components/InstructionsModal";
import DisplayButton from "../../Components/DisplayButton";
import UserInput from "../../Components/UserInput";
import RebellionLogo from "../../assets/RebellionLogo.jsx";
import TermsOfService from "./Components/Footer/TermsOfService.jsx";
import Contact from "./Components/Footer/Contact.jsx";

function StartScreen({ 
  socket, 
  username, 
  onChangedUsername, 
  setIsAdmin,
  randomStatusMsg,
  navigate,
  hasJoinEmbed=false,
  validRoom,
  setValidRoom,
  roomStatus,
  setRoomStatus
}) {

  const { room } = useParams();

  const [joinRoomModal, setJoinRoomModal] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const [tosOpen, setTosOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [usernameWarningCheck, setUsernameWarningCheck] = useState(false); // activate warning if needed

  useEffect(() => {
    if (hasJoinEmbed) {
      if (room == null) {
        navigate("/", { replace: true });
        return;
      }
      if (room.length !== 5) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, [room, navigate, hasJoinEmbed]);

  const validUsername = () => {
    if (username.length >= 3 && username.length <= 9) {
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
      socket.emit("join_room", "random_join"); // "random_join" = a room code technically
    }
  }

  const handleInstructionsOpen = () => {
    setInstructionsOpen(true);
  };
  const handleInstructionsClose = () => {
    setInstructionsOpen(false);
  };

  const handleTosClose = () => {
    setTosOpen(false);
  };
  const handleContactClose = () => {
    setContactOpen(false);
  }
  
  return (
    <div className="startScreen">
      <JoinRoomModal 
        socket={socket}
        open={joinRoomModal} 
        handleJoinClose={handleJoinClose}
        room={room}
        validRoom={validRoom}
        setValidRoom={setValidRoom}
        roomStatus={roomStatus}
        setRoomStatus={setRoomStatus}
      />
      <InstructionsModal 
        open={instructionsOpen} 
        handleInstructionsClose={handleInstructionsClose}
      />

      <TermsOfService
        open={tosOpen} 
        handleTosClose={handleTosClose}
      />
      <Contact
        open={contactOpen}
        handleContactClose={handleContactClose}
      />

      <div className="startTitle">
        <RebellionLogo />
      </div>
      
      <div className="userOptionsBox">
        <UserInput
          value={username} 
          onChange={(event) => {
            setJoinRoomModal(false);
            if (event.target.value.slice(-1) !== " ") onChangedUsername(event.target.value.toUpperCase());
          }}
          onPaste={(event) => {
            event.preventDefault();
            return false;
          }}
          helperText={!validUsername() && usernameWarningCheck ? "Name must be 3-9 chars" : ""}
          showError={!validUsername() && usernameWarningCheck}
          placeholder="Username"
        />
        {
          randomStatusMsg !== "" ? <p style={{ color: "red" }}>{randomStatusMsg}</p> : <></>
        }

        <DisplayButton className="startScreenBtn" onClick={handleCreate} text="Create Room" />
        <DisplayButton 
          btnStyle={{backgroundColor: room != null ? "red" : ""}} 
          className="startScreenBtn" 
          onClick={handleJoinOpen} 
          text="Join Room with Code"
          extraClassName={room != null ? "pulse" : ""}
        />
        <DisplayButton className="startScreenBtn" onClick={handleRandomJoin} text="Join Random Room" />
        <DisplayButton className="startScreenBtn" onClick={handleInstructionsOpen} text="Instructions" />

        <footer className="footer">
          <div className="footerContent">
            <p onClick={() => {setContactOpen(true)}}>Contact</p>
            <p onClick={() => {setTosOpen(true)}}>Terms of Service</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default StartScreen;