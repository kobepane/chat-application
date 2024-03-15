// import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { Chat } from "./chat";
import { example_users } from "./sampleData";

export default function App() {
  // Declare state variables and functions to be passed down into Login component; then lifted back into App component;
  // then passed down into Chat component

  // The socket room should just be specified by the chat state variable and passed into the Chat component, so that the
  // Chat component knows what socket room to connect the user to, and also has their username and country to add that data
  // into the Map object to store the users for a particular room.

  // The pie graph, as well as user list should be based off current users in the specific room, which should be kept in the
  // Map object (need to learn about it) or whatever data structure we decide to keep on the server for that.

  // The previous chat messages for a certain room will need to be kept in a database, and queried for each user as they
  // join a chat and basically set as the initial value for the messages state variable. Something that will need to be added
  // is as a message is sent, it will also need to be added into that database for the specfic room.

  const [username, setUsername] = useState("");
  // Will become object with value and label attributes
  const [country, setCountry] = useState(null);
  const [chat, setChat] = useState("none-selected");

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeChat(e) {
    setChat(e.target.value);
  }

  function changeCountry(selectedCountry) {
    setCountry(selectedCountry);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              username={username}
              country={country}
              chat={chat}
              changeUsername={changeUsername}
              changeCountry={changeCountry}
              changeChat={changeChat}
            />
          }
        />
        <Route
          path="/Chat"
          element={
            <Chat
              username={username}
              country={country}
              chat={chat}
              example_users={example_users}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
