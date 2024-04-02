import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CampaignIcon from '@mui/icons-material/Campaign';

function ChatBox({ 
  socket, 
  username, 
  msg, 
  setMsg, 
  msgList, 
  setMsgList,
  showHiddenChat,
  setShowHiddenChat,
  haveCloseOnWindow
 }) {
  const [atBottom, setAtBottom] = useState(true);
  const msgListEnd = useRef(null);
  const chatWindow = useRef(null);
  
  const scrollToBottom = () => {
    msgListEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const elem = e.target;
      setAtBottom(Math.abs(elem.scrollHeight - (elem.scrollTop + elem.clientHeight)) <= 1);
    };
    
    chatWindow.current?.addEventListener("scroll", handleScroll, true);
    return () => chatWindow.current?.removeEventListener("scroll", handleScroll, true);
  }, []);

  const getTime = () => {
    var mins = new Date(Date.now()).getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    return new Date(Date.now()).getHours() + ":" + mins;
  };

  const sendMsg = async () => {
    if (msg === "") return;

    const msgData = {
      msg: msg,
      sender: username,
      time: getTime()
    };

    await socket.emit("send_msg", msgData); // emit event to backend

    setMsgList((msgList) => [...msgList, msgData]);
    setMsg("");
  };

  useEffect(() => {
    if (atBottom) scrollToBottom();
  }, [msgList]);

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
        <p>Comunication</p>
      </div>

      <div className="chatBody">
          {
            msgList.map((msgData, i) => {
              return (
                <div
                  key={i}
                  className={`message ${username === msgData.sender ? "you" : (
                      msgData.sender === "PUBLIC TALLY" || msgData.sender === "THE UNIVERSE"
                    ) ? "public" : "other"}`
                  }
                >
                  {
                    msgData.sender === "PUBLIC TALLY" || msgData.sender === "THE UNIVERSE" ?
                      <CampaignIcon className="publicMsgAlert" fontSize="medium" /> : <></>
                  }
                  
                  <div className="msgContent">
                    <p>{msgData.msg}</p>
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