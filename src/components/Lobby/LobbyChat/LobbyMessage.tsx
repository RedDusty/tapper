import { useTranslation } from "react-i18next";
import { messageType } from "../../../redux/types";
import { renderImage } from "../Lobby";

function getTime(time: number) {
  const hours = ("0" + new Date(time).getHours()).slice(-2);
  const minutes = ("0" + new Date(time).getMinutes()).slice(-2);
  const seconds = ("0" + new Date(time).getSeconds()).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

function LobbyMessage(message: messageType) {
  const { t } = useTranslation();
  const systemMessage = () => {
    let msg = message.message;
    if (msg === "The rating system does not work in single player mode.") {
      return t("MESSAGE_RATING_SYSTEM");
    }
    if (msg.includes("Field X")) {
      msg = msg.replace("Field X", t("FIELD_X"));
    }
    if (msg.includes("Field Y")) {
      msg = msg.replace("Field Y", t("FIELD_Y"));
    }
    if (msg.includes("Max Players")) {
      msg = msg.replace("Max Players", t("MAX_PLAYERS"));
    }
    if (
      msg.includes("Bot") &&
      msg.includes("difficulty") === false &&
      msg.includes("Bot speed") === false
    ) {
      msg = msg.replace("Bot", t("BOT"));
      msg = msg.replace("false", t("BOT_FALSE"));
      msg = msg.replace("true", t("BOT_TRUE"));
    }
    if (msg.includes("Visibility")) {
      msg = msg.replace("Visibility", t("VISIBILITY"));
      msg = msg.replace("private", t("VISIBILITY_PRIVATE"));
      msg = msg.replace("public", t("VISIBILITY_PUBLIC"));
    }
    if (msg.includes("Bot difficulty")) {
      msg = msg.replace("Bot difficulty", t("BOT_DIFFICULTY"));
      msg = msg.replace(/easy/, t("BOT_DIFFICULTY_EASY"))
      msg = msg.replace(/medium/, t("BOT_DIFFICULTY_MEDIUM"))
      msg = msg.replace(/hard/, t("BOT_DIFFICULTY_HARD"))
      msg = msg.replace(/extreme/, t("BOT_DIFFICULTY_EXTREME"))
      msg = msg.replace(/tapper/, t("BOT_DIFFICULTY_TAPPER"))
      msg = msg.replace(/cheater-1/, t("BOT_DIFFICULTY_CHEATER_1"))
      msg = msg.replace(/cheater-2/, t("BOT_DIFFICULTY_CHEATER_2"))
      msg = msg.replace(/cheater-3/, t("BOT_DIFFICULTY_CHEATER_3"))
      msg = msg.replace(/custom/, t("BOT_DIFFICULTY_CUSTOM"))
    }
    if (msg.includes("Bot speed")) {
      msg = msg.replace("Bot speed", t("BOT_SPEED"));
    }
    return msg;
  };
  if (message.id === "system") {
    return (
      <div className="flex items-center font-bold">
        <p className="text-blue-200">{t("SYSTEM")}: </p>
        <p className="text-white ml-2">{systemMessage()}</p>
        <p className="ml-2 text-blue-200 font-normal text-xs">
          {getTime(message.time)}
        </p>
      </div>
    );
  } else {
    return (
      <div className="min-w-min max-w-max bg-blue-100 rounded-xl my-2">
        <div
          className="grid items-center p-1"
          style={{ gridTemplateColumns: "32px 1fr 80px" }}
        >
          {renderImage(message.avatar)}
          <p className="ml-2">{message.nickname.substr(0, 25)}</p>
          <p className="ml-4 text-xs">{getTime(message.time)}</p>
        </div>
        <div className="p-1 -mt-2">
          <p className="break-all">{message.message}</p>
        </div>
      </div>
    );
  }
}

export default LobbyMessage;
