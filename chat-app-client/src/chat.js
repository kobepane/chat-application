/*
Chat component for the chat application
*/

import "./chat.css";
import { useNavigate } from "react-router-dom";
import Example from "./piechart";
import React, { useState, useEffect } from "react";

// Websocket imports
import { io } from "socket.io-client";

/*
Need to open up a websocket server for users on a url and port
when a message is received on the websocket, we need an event handler to add that message to the messages state variable 
and then be mapped onto the front end 
when the send button is clicked, we need an event handler to send that message which is kept in a state variable through the 
websocket, and then clear the state variable
*/

// const socket = io("http://localhost:3001");

function Chat(props) {
  const { username, country, chat, example_users } = props;

  const navigate = useNavigate();

  // State Variables for message in text box and messages array
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io("http://localhost:3001");

  // Control the message state variable
  function handleTextChange(e) {
    setMessage(e.target.value);
  }

  // Handle button click, and send message data to server
  function sendMessage() {
    socket.emit("message-to-server", message);
    setMessage("");
  }

  // Initialize the connection, and listen for for messages from the server
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("message-to-client", (data) => {
        console.log(data);
        setChatMessages((prevChatMessages) => [...prevChatMessages, data]);
      });

      // socket.emit("msg", "Message from Client");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="item users">
          <div className="user-list-parent">
            <h2 className="users-header">Users({example_users.length})</h2>
            <div className="users-list">
              {example_users.map((user) => {
                return <p>{user.username}</p>;
              })}
            </div>
          </div>
          <button
            id="leave-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Leave Chat
          </button>
        </div>
        <div className="item chat">
          <div className="chat-header item">
            <h2>Chat Name</h2>
          </div>
          <div className="chat-messages item">
            {chatMessages.map((message, index) => {
              return <p key={index}>{message}</p>;
            })}
          </div>
          <div className="chat-textbox item">
            <textarea
              value={message}
              placeholder="Type a message..."
              className="chat-inputbox item"
              onChange={handleTextChange}
            />
            <div className="send-button-div">
              <button id="send-button" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="item chart">
          <Example />
        </div>
      </div>
    </div>
  );
}

export { Chat };
