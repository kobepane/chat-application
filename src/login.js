import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [chat, setChat] = useState("");
  const navigate = useNavigate();

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeCountry(e) {
    setCountry(e.target.value);
  }

  function changeChat(e) {
    setChat(e.target.value);
  }
  console.log(username);
  console.log(country);
  console.log(chat);

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
