import { useTypedSelector } from "../../../redux/useTypedSelector";
import LobbyChatInput from "./LobbyChatInput";
import LobbyMessage from "./LobbyMessage";

function LobbyChat() {
  const messages = useTypedSelector((state) => state.lobby.messages)
  return (
    <div
      className="select-text panelWidth my-0 mx-auto bg-gray-600 grid"
      style={{
        gridTemplateRows: "calc(100% - 128px) 80px",
        height: "calc(100% - 48px)",
      }}
    >
      <div className="overflow-y-scroll w-full p-2">
        {messages.map((message, index) => {
          return <LobbyMessage {...message} key={message.uid + index} />;
        })}
      </div>
      <LobbyChatInput />
    </div>
  );
}

export default LobbyChat;
