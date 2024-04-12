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
import YouDisconnected from "./Components/YouDisconnected.jsx";

function StartScreen({ 
  navigate,
  hasJoinEmbed=false,
  youDisconnectedModalOpen=false,
  setYouDisconnectedModalOpen=() => {},
  username,
  onChangedUsername, 
  createRoom,
  joinRoom,
  isValidRoom,
  setIsValidRoom,
  roomStatus,
  setRoomStatus,
  randomRoomMsg,
}) {

  const { room } = useParams();
  const invalidRoomCode = room == null || room.length !== 5;

  const [joinRoomModalOpen, setJoinRoomModalOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [usernameWarningCheck, setUsernameWarningCheck] = useState(false); // activate warning if needed

  useEffect(() => {
    if (hasJoinEmbed) {
      if (invalidRoomCode) {
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
    if (validUsername()) createRoom();
  };

  const handleJoinOpen = () => {
    setUsernameWarningCheck(true);
    if (validUsername()) setJoinRoomModalOpen(true);
  };
  const handleJoinClose = () => {
    setJoinRoomModalOpen(false);
  };

  const handleRandomJoin = () => {
    setUsernameWarningCheck(true);
    if (validUsername()) {
      joinRoom("random_join");
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
  };

  const handleYouDisconnectedClose = () => {
    setYouDisconnectedModalOpen(false);
  };

  return (
    <div className="startScreen">
      <JoinRoomModal 
        open={joinRoomModalOpen} 
        handleJoinClose={handleJoinClose}
        room={room}
        joinRoom={joinRoom}
        isValidRoom={isValidRoom}
        setIsValidRoom={setIsValidRoom}
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
      <YouDisconnected
        open={youDisconnectedModalOpen}
        handleYouDisconnectedClose={handleYouDisconnectedClose}
      />

      <div className="startTitle">
        <RebellionLogo />
      </div>
      
      <div className="userOptionsBox">
        <UserInput
          value={username} 
          onChange={(event) => {
            setJoinRoomModalOpen(false);
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
          randomRoomMsg !== "" ? <p style={{ color: "red" }}>{randomRoomMsg}</p> : <></>
        }

        <DisplayButton className="startScreenBtn" onClick={handleCreate} text="Create Room" />
        <DisplayButton 
          btnStyle={{backgroundColor: !invalidRoomCode ? "red" : ""}} 
          className="startScreenBtn" 
          onClick={handleJoinOpen} 
          text="Join Room with Code"
          extraClassName={!invalidRoomCode ? "pulse" : ""}
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