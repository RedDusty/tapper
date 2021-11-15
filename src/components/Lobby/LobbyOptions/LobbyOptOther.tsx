import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  lobbySetBot,
  lobbySetBotDifficulty,
  lobbySetVisibility,
} from "../../../redux/actions/lobbyActions";
import { botDifficultyType, lobbyOptionsType } from "../../../redux/types";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { getSocket } from "../../../socketio";
import { renderImage } from "../Lobby";

const difficulties: botDifficultyType[] = [
  "easy",
  "medium",
  "hard",
  "extreme",
  "tapper",
  "cheater-1",
  "cheater-2",
  "cheater-3",
];

function LobbyOptOther() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);
  const renderBotDifficulty = difficulties.map((diff) => {
    if (lobby.bot.isTurned === false) return <></>;
    return (
      <button
        className={`button text-black ${
          lobby.bot.difficulty === diff ? "button-green" : "button-red"
        }`}
        onClick={() => {
          if (user.uid !== lobby.ownerUID) return 0;
          if (lobby.bot.isTurned) {
            dispatch(lobbySetBotDifficulty(diff));
            getSocket().emit("LOBBY_OPTIONS", {
              code: lobby.code,
              ownerUID: lobby.ownerUID,
              difficulty: diff,
              option: "setDifficulty",
            });
          }
        }}
      >
        {diff}
      </button>
    );
  });
  return (
    <>
      <p className="text-lg my-1">{t("L_OTHER")}</p>
      <div className="w-full px-2">
        <div className="flex gap-x-2 items-center">
          <p>{t("L_OWNER") + ":"}</p>
          {renderImage(lobby.users[0].avatar)}
          <p>{lobby.nickname}</p>
        </div>
        <div className="flex gap-x-2 mt-2 items-center">
          <p>{t("VISIBILITY")}</p>
          <button
            className={`button text-black ${
              lobby.visibility === "private" ? "button-green" : "button-red"
            }`}
            onClick={() => {
              if (user.uid !== lobby.ownerUID) return 0;
              if (lobby.visibility === "public") {
                dispatch(lobbySetVisibility("private"));
                getSocket().emit("LOBBY_OPTIONS", {
                  code: lobby.code,
                  option: "setVisibility",
                  ownerUID: lobby.ownerUID,
                  visibility: "private",
                } as lobbyOptionsType);
              }
            }}
          >
            {t("L_PRIVATE")}
          </button>
          <button
            className={`button text-black ${
              lobby.visibility === "public" ? "button-green" : "button-red"
            }`}
            onClick={() => {
              if (user.uid !== lobby.ownerUID) return 0;
              if (lobby.visibility === "private") {
                dispatch(lobbySetVisibility("public"));
                getSocket().emit("LOBBY_OPTIONS", {
                  code: lobby.code,
                  ownerUID: lobby.ownerUID,
                  visibility: "public",
                  option: "setVisibility",
                } as lobbyOptionsType);
              }
            }}
          >
            {t("L_PUBLIC")}
          </button>
        </div>
        <div className="flex gap-x-2 mt-2 items-center">
          <p>Bot</p>
          <button
            className={`button text-black ${
              lobby.bot.isTurned ? "button-green" : "button-red"
            }`}
            onClick={() => {
              if (user.uid !== lobby.ownerUID) return 0;
              if (lobby.bot.isTurned === false) {
                dispatch(lobbySetBot(true));
                getSocket().emit("LOBBY_OPTIONS", {
                  code: lobby.code,
                  ownerUID: lobby.ownerUID,
                  bot: true,
                  option: "setBot",
                });
              }
            }}
          >
            {lobby.bot.isTurned ? "Turned on" : "Turn on"}
          </button>
          <button
            className={`button text-black ${
              lobby.bot.isTurned ? "button-red" : "button-green"
            }`}
            onClick={() => {
              if (user.uid !== lobby.ownerUID) return 0;
              if (lobby.bot.isTurned) {
                dispatch(lobbySetBot(false));
                getSocket().emit("LOBBY_OPTIONS", {
                  code: lobby.code,
                  ownerUID: lobby.ownerUID,
                  bot: false,
                  option: "setBot",
                });
              }
            }}
          >
            {lobby.bot.isTurned ? "Turn off" : "Turned off"}
          </button>
        </div>
        {(() => {
          if (lobby.bot.isTurned === false) return <></>;
          return (
            <div className="flex gap-2 mt-2 items-center flex-wrap">
              <p>Bot difficulty</p>
              {renderBotDifficulty}
            </div>
          );
        })()}
      </div>
    </>
  );
}

export default LobbyOptOther;
