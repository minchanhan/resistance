import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CampaignIcon from '@mui/icons-material/Campaign';

function ChatBox({ 
  username, 
  msg, 
  setMsg, 
  msgList, 
  showHiddenChat,
  setShowHiddenChat,
  haveCloseOnWindow,
  sendMessage
 }) {
  const [atBottom, setAtBottom] = useState(true);
  const msgListEnd = useRef(null);
  const chatWindow = useRef(null);
  
  const scrollToBottom = () => {
    msgListEnd.current?.scrollIntoView();
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const elem = e.target;
      setAtBottom(Math.abs(elem.scrollHeight - (elem.scrollTop + elem.clientHeight)) <= 1);
    };
    
    const curChatWindow = chatWindow.current;
    curChatWindow?.addEventListener("scroll", handleScroll, true);

    return () => curChatWindow?.removeEventListener("scroll", handleScroll, true);
  }, [msgList]);

  const getTime = () => {
    var mins = new Date(Date.now()).getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    return new Date(Date.now()).getHours() + ":" + mins;
  };

  const sendMsg = () => {
    if (msg === "") return;

    const msgData = {
      msg: msg,
      sender: username,
      time: getTime()
    };

    sendMessage(msgData);
    setMsg("");
  };

  useEffect(() => {
    if (atBottom) scrollToBottom();
  }, [msgList, atBottom]);

  return (
    <div className="chatWindow" ref={chatWindow}>
      {
        haveCloseOnWindow ? (
          <CloseIcon 
            className="closeChatOnWindow" 
            onClick={() => {setShowHiddenChat(!showHiddenChat)}} 
          />
        ) : <></>
      }
      <div className="chatHeader">
        <p>Communication</p>
      </div>

      <div className="chatBody">
          {
            msgList.map((msgData, i) => {
              const publicMsg = msgData.sender === "GAME MASTER";
              const easterEgg = msgData.msg.toUpperCase() === "CORRINE";

              return (
                <div
                  key={i}
                  className={`message ${username === msgData.sender ? "you"
                    : publicMsg ? "public" : "other"}`
                  }
                >
                  {
                    publicMsg ? 
                      <CampaignIcon className="publicMsgAlert" fontSize="medium" /> 
                      : <></>
                  }
                  
                  <div className={`msgContent ${easterEgg ? "c" : ""}`}>
                    <p>{`${easterEgg ? "<3 " : ""}${msgData.msg}${easterEgg ? " <3" : ""}`}</p>
                  </div>
                  <div className="msgMeta">
                    <p className="msgTime">{msgData.time}</p>
                    <p>{msgData.sender}</p>
                  </div>
                </div>
              )
            })
          }
          <div ref={msgListEnd}></div>
      </div>
      
      <div className="chatFooter">
        <div className="chatInput">
          <input
            placeholder="Enter message"
            value={msg}
            onChange={(event) => {
              if (msg.length < 150) setMsg(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                sendMsg();
              }
            }}
          ></input>
        </div>
        
        <div onClick={sendMsg} className="chatSendBtn">
          Send
        </div>
      </div>
    </div>
  )
};

export default ChatBox;