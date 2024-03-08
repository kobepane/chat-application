// import ReactDOM from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { Chat } from "./chat";
import { example_users } from "./sampleData";

// Creating an example array of user objects that we would query from the database each time a new user joins a chat.
// each user object is also what would be created for each user, with a username and country attribute.

export default function App() {
  // Declare state variables and functions to be passed down into Login component; then lifted back into App component;
  // then passed down into Chat component

  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [chat, setChat] = useState("");

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeCountry(e) {
    setCountry(e.target.value);
  }

  function changeChat(e) {
    setChat(e.target.value);
  }

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
