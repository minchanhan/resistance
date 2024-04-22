import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from "@mui/material";

import "../../../App.css";

function ShowChatButton({ 
  showHiddenChat, 
  setShowHiddenChat,
  newMsg, 
  setNewMsg,
}) {

  return (
    <div className="showChatBtn">
      <div className="showChatBtnBox">
        {
          newMsg && !showHiddenChat ? (
            <NotificationsIcon className="newMsgAlert" />
          ) : <></>
        }
        <Button
          color="secondary"
          onClick={() => {
            setShowHiddenChat(!showHiddenChat);
            setNewMsg(false);
          }}
          sx={{
            border: `1px solid black`,
            fontWeight: 600
          }}
        >
          {showHiddenChat ? "Close Chat" : "Show Chat"}
        </Button>
      </div>
    </div>
  );
}

export default ShowChatButton;