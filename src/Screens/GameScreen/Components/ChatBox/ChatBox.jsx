import React, { useEffect, useMemo, useState } from "react";

function ChatBox({ socket, roomCode="", username }) {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const getTime = () => {
    var mins = new Date(Date.now()).getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    return new Date(Date.now()).getHours() + ":" + mins;
  }

  const sendMsg = () => {
    if (msg === "") return;

    const msgData = {
      roomCode: roomCode,
      sender: "hi",
      msg: msg,
      time: getTime()
    }

    socket.emit(
      "send_msg", 
      msgData
    ); // emit event to backend

    setMsgList((msgList) => [...msgList, msgData]);
  };

  useMemo(() => { // listen
    socket.on("receive_msg", (data) => {
      setMsgList((msgList) => [...msgList, data]);
    });
  }, [socket]); // <-- whenever there's change in socket server

  return (
    <div className="chatWindow">
      <div className="chatHeader">
        <h3>Private Messages</h3>
      </div>

      <div className="chatBody">
        {
          msgList.map((msgData) => {
            return (
              <div
                className="message" 
                id={username === msgData.sender ? "you" : "other"}
              >
                <div>
                  <div className="msgContent">
                    <p>{msgData.msg}</p>
                  </div>
                  <div className="msgMeta">
                    <p>{msgData.time + " "}</p>
                    <p>{msgData.sender}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="chatFooter">
        <input
          placeholder="Enter message"
          onChange={ (event) => {
            setMsg(event.target.value);
          }} 
        />
        <button onClick={sendMsg}>Send</button>
      </div>

    </div>
  )
};

export default ChatBox;