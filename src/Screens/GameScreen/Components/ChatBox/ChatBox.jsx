import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CloseIcon from '@mui/icons-material/Close';

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
  const getTime = () => {
    var mins = new Date(Date.now()).getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    return new Date(Date.now()).getHours() + ":" + mins;
  };

  const sendMsg = async () => {
    socket.emit("checkGames"); // remove after test
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

  return (
    <div className="chatWindow">
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

      <ScrollToBottom className="chatScroller">
        <div className="chatBody">
            {
              msgList.map((msgData, i) => {
                return (
                  <div
                    key={i}
                    className={`message ${username === msgData.sender ? "you" : (
                        msgData.sender === "PUBLIC TALLY" || msgData.sender === "THE UNIVERSE"
                      ) ? "voteResult" : "other"}`
                    }
                  >
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
        </div>
      </ScrollToBottom>

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