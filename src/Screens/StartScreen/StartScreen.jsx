import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../../App.css";

import JoinRoomModal from "./Modals/JoinRoomModal.jsx";
import InstructionsModal from "./Modals/InstructionsModal.jsx";
import DisplayButton from "../../Utils/DisplayButton.jsx";
import UserInput from "../../Utils/UserInput.jsx";
import RebellionLogo from "../../assets/RebellionLogo.jsx";
import TermsOfService from "./Footer/TermsOfService.jsx";
import Contact from "./Footer/Contact.jsx";

function StartScreen({ 
  navigate,
  hasJoinEmbed=false,
  username,
  onChangedUsername, 
  createRoom,
  joinRoom,
  joinRoomMsg,
  setJoinRoomMsg,
  randomRoomMsg,
  goodTeamStyle,
  badTeamStyle
}) {

  const { room } = useParams();

  const [joinRoomModalOpen, setJoinRoomModalOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [usernameWarningCheck, setUsernameWarningCheck] = useState(false); // activate warning if needed

  useEffect(() => {
    if (hasJoinEmbed && room?.length !== 6) {
      navigate("/", { replace: true });
      return;
    };
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
  };

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

  return (
    <div className="startScreen">
      <JoinRoomModal 
        open={joinRoomModalOpen} 
        handleJoinClose={handleJoinClose}
        room={room}
        joinRoom={joinRoom}
        joinRoomMsg={joinRoomMsg}
        setJoinRoomMsg={setJoinRoomMsg}
      />
      <InstructionsModal 
        open={instructionsOpen} 
        handleInstructionsClose={handleInstructionsClose}
        goodTeamStyle={goodTeamStyle}
        badTeamStyle={badTeamStyle}
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
          btnStyle={{backgroundColor: hasJoinEmbed ? "red" : ""}} 
          className="startScreenBtn" 
          onClick={handleJoinOpen} 
          text="Join Room with Code"
          extraClassName={hasJoinEmbed ? "pulse" : ""}
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