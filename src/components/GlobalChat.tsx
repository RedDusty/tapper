import { useTypedSelector } from "../redux/useTypedSelector";
import GChatMessage from "./Helpers/Global/GChatMessage";
import GChatInput from "./Helpers/Global/GChatInput";
import { useEffect } from "react";
import { getServerURL, getSocket } from "../socketio";
import { GmessagesSet } from "../redux/actions/globalActions";
import { useDispatch } from "react-redux";

const GlobalChat = () => {
  const messages = useTypedSelector((state) => state.global.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    getSocket().emit("G_CHAT_MESSENGER", { type: "join" });
    const firstLoading = async () => {
      const fetcher = await fetch(getServerURL() + "/data");
      const data = await fetcher.json();

      dispatch(GmessagesSet(data.messages));
    };
    firstLoading();
    getSocket().on("G_CHAT_MESSAGES", (data) => {
      dispatch(GmessagesSet(data.messages));
    });
    getSocket().on("G_CHAT_USERS", (data) => {
      dispatch(GmessagesSet(data.messages));
    });
    return () => {
      getSocket().off("G_CHAT_USERS");
      getSocket().off("G_CHAT_MESSAGES");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="select-text panelWidth my-0 mx-auto bg-gray-600 grid"
      style={{
        gridTemplateRows: "calc(100% - 80px) 80px",
        height: "calc(100% - 48px)",
      }}
    >
      <div className="overflow-y-scroll w-full p-2">
        {messages.map((message, index) => {
          return (
            <GChatMessage
              {...message}
              key={message.id + message.message + index}
            />
          );
        })}
      </div>
      <GChatInput />
    </div>
  );
};

export default GlobalChat;
