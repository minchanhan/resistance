import React, { useMemo, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatBox({ socket, username }) {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

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

  useMemo(() => { // listen
    socket.on("receive_msg", (msgData) => {
      setMsgList((msgList) => [...msgList, msgData]);
    });
  }, [socket]);

  return (
    <div className="chatWindow">
      <div className="chatHeader">
        <p>Comunication</p>
      </div>

      <div className="chatBody">
        <ScrollToBottom className="msgContainer">
          {
            msgList.map((msgData) => {
              return (
                <div
                  className="message" 
                  id={username === msgData.sender ? "you" : (msgData.sender === "PUBLIC TALLY") ? "voteResult" : "other"}
                >
                  <div className="fullMessage">
                    <div className="msgContent">
                      <p>{msgData.msg}</p>
                    </div>
                    <div className="msgMeta">
                      <p className="msgTime">{msgData.time}</p>
                      <p>{msgData.sender}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </ScrollToBottom>
      </div>

      <div className="chatFooter">
        <input
          type="text"
          placeholder="Enter message"
          value={msg}
          onChange={(event) => {
            setMsg(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              sendMsg();
            }
          }}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  )
};

export default ChatBox;