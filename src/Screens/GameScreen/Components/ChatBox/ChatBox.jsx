import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001"); // connect to socket server

function ChatBox() {
  const [roomCode, setRoomCode] = useState("");

  const [msg, setMsg] = useState("");
  const [msgReceived, setMsgReceived] = useState("");

  const joinRoom = () => {
    if (roomCode !== "") {
      socket.emit("join_room", roomCode)
    }
  };

  const sendMsg = () => {
    socket.emit("send_msg", { msg }); // emit event to backend
  };

  useEffect(() => { // when event is received from socket server
    socket.on("receive_msg", (data) => {
      setMsgReceived(data.msg);
    });
  }, [socket]);

  return (
    <div className="ChatBox">
      <h1>hello</h1>
      <input 
        placeholder="Room Code" 
        onChange={ (event) => {
          setRoomCode(event.target.value);
        }} 
      />
      <button onClick={joinRoom}>Join</button>
      <input 
        placeholder="Message here" 
        onChange={ (event) => {
          setMsg(event.target.value);
        }} 
      />
      <button onClick={sendMsg}>Send</button>
      <h1>Message: </h1>
      {msgReceived}
    </div>
  )
};

export default ChatBox;