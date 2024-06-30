import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
function Chats({ socket, userName, room }) {
  const [currentMsg, setCurrentMsg] = useState("");

  const [msglist, setMsgList] = useState([]);
  const sendMessage = async () => {
    const msgData = {
      message: currentMsg,
      room: room,
      author: userName,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    if (currentMsg !== "") {
      await socket.emit("send-message", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.off("recieve-message").on("recieve-message", (data) => {
      //   console.log("message recieved: ", data);
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <>
      <div className="chat-window">
        {/* chat header */}
        <div className="chat-header">
          <p>Live Chat</p>
        </div>

        {/* chat body */}
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {msglist.map((msg) => {
              return (
                <div
                  className="message"
                  id={userName === msg.author ? "you" : "other"}
                >
                  {/* a message will have author name, time, and mesage content */}
                  <div>
                    <div className="message-content">
                      <p> {msg.message}</p>
                    </div>

                    <div className="message-meta">
                      <p id="time">{msg.time}</p>
                      <p id="author">{msg.author}</p>
                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>

        {/* chat footer */}
        <div className="chat-footer">
          <input
            type="text"
            placeholder="type your message here..."
            value={currentMsg}
            onChange={(event) => {
              setCurrentMsg(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          ></input>
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
}

export default Chats;
