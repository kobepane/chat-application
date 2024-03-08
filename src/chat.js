/*
Chat component for the chat application
*/

import "./chat.css";
import { useNavigate } from "react-router-dom";
import Example from "./piechart";

function Chat(props) {
  const { username, country, chat, example_users } = props;

  const navigate = useNavigate();

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
          <div className="chat-messages item">Chat Messages</div>
          <div className="chat-textbox item">
            <textarea
              placeholder="Type a message..."
              className="chat-inputbox item"
            />
            <div className="send-button-div">
              <button id="send-button">Send</button>
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
