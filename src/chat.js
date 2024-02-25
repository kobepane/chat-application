/*
Chat component for the chat application
*/

function Chat(props) {
  const { username, country } = props;
  return (
    <div>
      <h1>
        Hello, {username} from {country}!
      </h1>
    </div>
  );
}

export { Chat };
