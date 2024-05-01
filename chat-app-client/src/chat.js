/*
Chat component for the chat application
*/

import "./chat.css";
import { useNavigate } from "react-router-dom";
import Example from "./piechart";
import React, { useState, useEffect } from "react";
import { data } from "./sampleData";

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
  // POSSIBLE DEBUG
  const [usersInChat, setUsersInChat] = useState([]);
  // NEED TO FIX const [chartData, setChartData] = useState([]);

  const socket = io("http://localhost:3001");

  // Control the message state variable
  function handleTextChange(e) {
    setMessage(e.target.value);
  }

  // Handle button click, and send message data to server
  function sendMessage() {
    const messageObj = { message: message, user: username };
    socket.emit("message-to-server", messageObj, chat);
    setMessage("");
  }

  // Handle enter/return clicked by user in the text area to send message to server
  function handleEnterKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleLeaveChat() {
    socket.emit("leave-chat-room", chat, username);
    navigate("/");
  }

  // NEED TO FIX
  /*
  function changeChartData() {
    console.log("In change chart data");
    let temp_obj = { [username]: 0, "Other Users": 0 };
    console.log(chatMessages);
    for (let obj of chatMessages) {
      console.log(obj.user);
      console.log(username);
      if (obj.user === username) {
        console.log("got here");
        // Increase count for the user
        temp_obj[username]++;
      } else {
        // Add a count for the rest of the users
        temp_obj["Other Users"]++;
      }
    }
    console.log(temp_obj);

    setChartData([
      { name: username, value: temp_obj[username] },
      { name: "Other Users", value: temp_obj["Other Users"] },
    ]);
  }
  */

  ///
  /// MIGHT be because this function isnt in useEffect

  // Initialize the connection, and listen for for messages from the server
  useEffect(() => {
    socket.on("connect", () => {
      // POSSIBLE DEBUG
      socket.emit("join-chat-room", chat, username);

      socket.on("message-to-client", (data) => {
        console.log(data);
        setChatMessages((prevChatMessages) => [...prevChatMessages, data]);
        // changeChartData();
      });

      // listen for a new user joining. the data passed in will be a Map object
      socket.on("new-user-joined-chat", (users) => {
        // Need to get usernames from the users Map object into a list state variable
        // console.log("New user Joined chat!");
        // console.log(users);
        setUsersInChat(users);
      });

      // listen for a user leaving, the data passed in will be a Map object
      socket.on("user-left-chat", (users) => {
        // Need to get usernames from the users Map object into a list state variable
        // console.log("User left chat!");
        // console.log(users);
        setUsersInChat(users);
      });
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
            <h2 className="users-header">Users({usersInChat.length})</h2>
            <div className="users-list">
              {usersInChat.map((user, index) => {
                return <p key={index}>{user}</p>;
              })}
            </div>
          </div>
          <button id="leave-button" onClick={handleLeaveChat}>
            Leave Chat
          </button>
        </div>
        <div className="item chat">
          <div className="chat-header item">
            <h2>{chat}</h2>
          </div>
          <div className="chat-messages item">
            {chatMessages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`message ${
                    message.user === username ? "sent" : "received"
                  }`}
                >
                  {message.user != username ? (
                    <div>
                      <span className="span-username">{message.user}</span>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {message.message}
                </div>
              );
            })}
          </div>
          <div className="chat-textbox item">
            <textarea
              value={message}
              placeholder="Type a message..."
              className="chat-inputbox item"
              onChange={handleTextChange}
              onKeyDown={handleEnterKeyPress}
            />
            <div className="send-button-div">
              <button id="send-button" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="item chart">
          <Example data={data} />
        </div>
      </div>
    </div>
  );
}

export { Chat };
