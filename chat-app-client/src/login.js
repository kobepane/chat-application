/*
Login component for the chat application
*/

import "./login.css";
import { useNavigate } from "react-router-dom";
import { example_countries } from "./sampleData";
import Select from "react-select";

function Login(props) {
  // Destructure passed in state variables and handler functions
  const { username, country, chat, changeUsername, changeCountry, changeChat } =
    props;

  const navigate = useNavigate();

  function handleJoinChat() {
    localStorage.setItem("username", username);
    navigate("/Chat");
  }

  console.log(chat);

  return (
    <div className="login">
      <h2>Welcome to WebChat!</h2>
      <div className="label-container">
        <label className="usernameLabel input-container">Username</label>
        <input
          placeholder="Username..."
          value={username}
          onChange={changeUsername}
          className="larger-input"
        />
      </div>
      <div className="label-container select-container">
        <label>Country</label>
        <Select
          options={example_countries}
          value={country}
          onChange={changeCountry}
        />
      </div>
      <div className="label-container select-container">
        <label>Pick a Chat</label>
        <select value={chat} name="selectChat" onChange={changeChat}>
          <option value="none-selected">-- Select a Chat --</option>
          <option value="Chat 1">Chat 1</option>
          <option value="Chat 2">Chat 2</option>
          <option value="Chat 3">Chat 3</option>
        </select>
      </div>
      <button
        id="join-button"
        className="joinButton"
        onClick={handleJoinChat}
        disabled={
          username.length === 0 || country === null || chat === "none-selected"
        }
      >
        Join Chat!
      </button>
    </div>
  );
}

export { Login };
