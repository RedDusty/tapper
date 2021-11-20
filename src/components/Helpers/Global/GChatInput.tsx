import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { GmessageType } from "../../../redux/types";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { getSocket } from "../../../socketio";

const GChatInput = () => {
  const [message, setMessage] = useState<string>("");

  const user = useTypedSelector((state) => state.user);

  const { t } = useTranslation()

  return (
    <div
      className="bg-gray-300 h-20 p-2 grid items-center gap-x-2"
      style={{ gridTemplateColumns: "1fr min-content" }}
    >
      <textarea
        className="bg-gray-100 rounded-md px-2 h-full resize-none outline-none w-full"
        onChange={(e) =>
          setMessage(e.target.value.substr(0, 99).replace(/\s+/g, " "))
        }
        value={message}
      ></textarea>
      <div>
        <button
          className="button-green font-bold p-1 flex items-center rounded-lg select-none cursor-pointer"
          onClick={() => {
            if (message.length > 0)
              if (!(message.length === 1 && message.charAt(0) === " ")) {
                getSocket().emit("G_CHAT_MESSENGER", {
                  type: "message",
                  message: {
                    avatar: user.avatar,
                    id: getSocket().id,
                    nickname: user.nickname,
                    uid: user.nickname,
                    message: message.substr(0, 99).replace(/\s+/g, " "),
                    time: Date.now(),
                  } as GmessageType,
                });
                setMessage("");
              }
          }}
        >
          {t("MESSAGE_INPUT_SEND")}
        </button>
        <p
          className={`text-xs font-bold select-none bg-gray-100 flex justify-center items-center mt-2 py-1 rounded-md ${
            message.length > 65
              ? message.length >= 99
                ? "text-red-500"
                : "text-yellow-500"
              : "text-black"
          }`}
        >
          {message.length}/99
        </p>
      </div>
    </div>
  );
};

export default GChatInput;
