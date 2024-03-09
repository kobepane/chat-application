/*
Login component for the chat application
*/

import "./login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  // Destructure passed in state variables and handler functions
  const { username, country, chat, changeUsername, changeCountry, changeChat } =
    props;

  const navigate = useNavigate();

  return (
    <div className="login">
      <h2>Welcome to WebChat!</h2>
      <div className="label-container">
        <label className="usernameLabel input-container">Username:</label>
        <input
          placeholder="username"
          value={username}
          onChange={changeUsername}
        />
      </div>
      <div className="label-container">
        <label className="countryLabel input-container">Country:</label>
        <input placeholder="country" value={country} onChange={changeCountry} />
      </div>
      <div className="label-container select-container">
        <label>Pick a Chat:</label>
        <select value={chat} name="selectChat" onChange={changeChat}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
      <button
        id="join-button"
        className="joinButton"
        onClick={() => {
          navigate("/Chat");
        }}
      >
        Join Chat!
      </button>
    </div>
  );
}

export { Login };