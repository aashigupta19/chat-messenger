import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chats from "./Chats";

const socket = io.connect("http://localhost:4001");
function App() {
  const [userName, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // func
  const joinRoom = () => {
    // this room will take username input and join a chat room
    if (userName !== "" && room !== "") {
      // how to join a room
      socket.emit("join-room", room);
      // console.log(`user with ${socket.id} joined the room with id ${room}`);
      setShowChat(true);
    }
  };

  // UI Components
  return (
    <div className="App">
      {showChat ? (
        <Chats socket={socket} userName={userName} room={room} />
      ) : (
        <div className="joinChatContainer">
          <h3>Join chat</h3>
          <br />
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
          <br />

          <input
            type="text"
            placeholder="Room ID"
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          ></input>
          <br />
          <button onClick={joinRoom}>JOIN A ROOM!</button>
        </div>
      )}
    </div>
  );
}

export default App;
