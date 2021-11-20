import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { lobbyUsersType } from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { getSocket } from "../../socketio";
import { lobbyShortType } from "../GamesList";
import { renderImage } from "./Lobby";

function LobbyItem(lobby: lobbyShortType) {
  const user = useTypedSelector((state) => state.user);
  const { t } = useTranslation()

  let colorField = "text-black";

  if (Number(lobby.fieldX) * Number(lobby.fieldY) > 25)
    colorField = "text-green-800";
  if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 49)
    colorField = "text-blue-800";
  if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 81)
    colorField = "text-yellow-800";
  if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 144)
    colorField = "text-red-800";

  let colorPlayers = "text-black";

  if (Number(lobby.maxPlayers) > 1) colorPlayers = "text-green-800";
  if (Number(lobby.maxPlayers) >= 3) colorPlayers = "text-blue-800";
  if (Number(lobby.maxPlayers) >= 5) colorPlayers = "text-yellow-800";
  if (Number(lobby.maxPlayers) >= 7) colorPlayers = "text-red-800";

  let colorBot = "text-black";

  if (lobby.bot.difficulty === "easy") colorBot = "text-green-600";
  if (lobby.bot.difficulty === "medium") colorBot = "text-lime-600"
  if (lobby.bot.difficulty === "hard") colorBot = "text-yellow-600";
  if (lobby.bot.difficulty === "extreme") colorBot = "text-orange-600";
  if (lobby.bot.difficulty === "tapper") colorBot = "text-red-600";
  if (lobby.bot.difficulty === "cheater-1") colorBot = "text-pink-600";
  if (lobby.bot.difficulty === "cheater-2") colorBot = "text-violet-600";
  if (lobby.bot.difficulty === "cheater-3") colorBot = "text-sky-800";

  return (
    <div className={`p-2 m-2 grid ${lobby.bot.isTurned ? "grid-cols-5" : "grid-cols-4"} items-center hover:bg-gray-200`}>
      <div className="flex items-center font-bold">
        {renderImage(lobby.avatar)}
        <p className="ml-1">{lobby.nickname}</p>
      </div>
      <div className="flex items-center justify-center text-lg">
        <p className={`${colorField} font-bold`}>
          {lobby.fieldX +
            "x" +
            lobby.fieldY +
            ` (${Number(lobby.fieldX) * Number(lobby.fieldY)})`}
        </p>
      </div>
      <div className={`${colorPlayers} flex justify-center text-xl font-bold`}>
        {lobby.inLobbyPlayers + "/" + lobby.maxPlayers}
      </div>
      {(() => {
        if (lobby.bot.isTurned === false) return <></>;
        return (
          <div className="flex flex-col items-center justify-center text-lg font-bold">
            <p className="text-sky-700 leading-5">{t("BOT")}</p>
            <p className={`${colorBot} font-bold leading-5 capitalize`}>{lobby.bot.difficulty}{lobby.bot.difficulty === "custom" ? ` (${lobby.bot.speed})` : ""}</p>
          </div>
        );
      })()}
      <Link
        to="/lobby"
        className="ml-2 button button-yellow text-center"
        onClick={() => {
          if (lobby.inLobbyPlayers < lobby.maxPlayers) {
            // if (user.uid.length > 0 && user.id) {
            getSocket().emit("LOBBY_USERS", {
              action: "userJoin",
              code: lobby.code,
              ownerUID: lobby.ownerUID,
              user: user,
            } as lobbyUsersType);
            //}
          }
        }}
      >
        {lobby.code}
      </Link>
    </div>
  );
}

export default LobbyItem;
