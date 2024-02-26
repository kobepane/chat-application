/*
Chat component for the chat application
*/
import "./chat.css";

function Chat(props) {
  const { username, country, chat } = props;
  return (
    <div>
      <div class="container">
        <div class="users-list">
          <h2>Users(1)</h2>
          <p>{`${username} (${country})`}</p>
        </div>
        <div class="chat-messages">
          <h2>{`${chat} Chat`}</h2>
        </div>
      </div>
    </div>
  );
}

export { Chat };
