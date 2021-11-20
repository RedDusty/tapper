import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  lobbySetBot,
  lobbySetBotDifficulty,
  lobbySetBotSpeed,
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
  "custom",
];

function LobbyOptOther() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);
  const renderBotDifficulty = difficulties.map((diff, index) => {
    if (lobby.bot.isTurned === false) return <></>;
    let showDiff: string = diff;
    showDiff = showDiff.replace(/easy/, t("BOT_DIFFICULTY_EASY"))
    showDiff = showDiff.replace(/medium/, t("BOT_DIFFICULTY_MEDIUM"))
    showDiff = showDiff.replace(/hard/, t("BOT_DIFFICULTY_HARD"))
    showDiff = showDiff.replace(/extreme/, t("BOT_DIFFICULTY_EXTREME"))
    showDiff = showDiff.replace(/tapper/, t("BOT_DIFFICULTY_TAPPER"))
    showDiff = showDiff.replace(/cheater-1/, t("BOT_DIFFICULTY_CHEATER_1"))
    showDiff = showDiff.replace(/cheater-2/, t("BOT_DIFFICULTY_CHEATER_2"))
    showDiff = showDiff.replace(/cheater-3/, t("BOT_DIFFICULTY_CHEATER_3"))
    showDiff = showDiff.replace(/custom/, t("BOT_DIFFICULTY_CUSTOM"))
    return (
      <button
        className={`button text-black ${
          lobby.bot.difficulty === diff ? "button-green" : "button-red"
        }`}
        key={diff + index + 'botDifficulty'}
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
        {showDiff}
      </button>
    );
  });
  return (
    <>
      <p className="text-lg my-1">{t("OTHER")}</p>
      <div className="w-full px-2">
        <div className="flex gap-x-2 items-center">
          <p>{t("OWNER") + ":"}</p>
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
            {t("VISIBILITY_PRIVATE")}
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
            {t("VISIBILITY_PUBLIC")}
          </button>
        </div>
        <div className="flex gap-x-2 mt-2 items-center">
          <p>{t("BOT")}</p>
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
            {lobby.bot.isTurned ? t("TURNED_ON") : t("TURN_ON")}
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
            {lobby.bot.isTurned ? t("TURN_OFF") : t("TURNED_OFF")}
          </button>
        </div>
        {(() => {
          if (lobby.bot.isTurned === false) return <></>;
          return (
            <div className="flex gap-2 mt-2 items-center flex-wrap">
              <p>{t("BOT_DIFFICULTY")}</p>
              {renderBotDifficulty}
              <input
                type="text"
                pattern="[0-9]"
                maxLength={2}
                className="ml-1 mr-4 w-16 lobbyOptInput"
                readOnly={user.uid !== lobby.ownerUID}
                onChange={(e) => {
                  if (user.uid !== lobby.ownerUID) return 0;
                  const nums = e.target.value.match(/\d/g);
                  const num = nums?.join("").substr(0, 2);
                  if (num !== lobby.bot.speed) {
                    dispatch(lobbySetBotSpeed(num || ""));
                    if ((num || "").length !== 0) {
                      const emmitedNumber = () => {
                        if (num && Number(num) > 0) {
                          return num;
                        } else {
                          return String(1);
                        }
                      };
                      if (lobby.bot.difficulty !== "custom") {
                        dispatch(lobbySetBotDifficulty("custom"));
                        getSocket().emit("LOBBY_OPTIONS", {
                          code: lobby.code,
                          option: "setDifficulty",
                          ownerUID: lobby.ownerUID,
                          difficulty: "custom",
                        } as lobbyOptionsType);
                      }
                      getSocket().emit("LOBBY_OPTIONS", {
                        code: lobby.code,
                        option: "setSpeed",
                        ownerUID: lobby.ownerUID,
                        speed: emmitedNumber(),
                      } as lobbyOptionsType);
                    }
                  }
                }}
                value={lobby.bot.speed}
              />
            </div>
          );
        })()}
      </div>
    </>
  );
}

export default LobbyOptOther;
