import { Link } from "react-router-dom";
import { lobbyUsersType } from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";
import socket from "../../socketio";
import { lobbyShortType } from "../GamesList";
import { renderImage } from "./Lobby";

function LobbyItem(lobby: lobbyShortType) {
  const user = useTypedSelector((state) => state.user);

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

  return (
    <div className="p-2 m-2 grid grid-cols-4 items-center hover:bg-gray-200">
      <div className="flex items-center font-bold">
        {renderImage(lobby.avatar)}
        <p className="ml-1">{lobby.nickname}</p>
      </div>
      <div className="flex items-center text-lg">
        <p className={`${colorField} font-bold`}>
          {lobby.fieldX +
            "x" +
            lobby.fieldY +
            ` (${Number(lobby.fieldX) * Number(lobby.fieldY)})`}
        </p>
      </div>
      <div className={`${colorPlayers} text-xl font-bold`}>
        {lobby.inLobbyPlayers + "/" + lobby.maxPlayers}
      </div>
      <Link
        to="/lobby"
        className="ml-2 button button-yellow"
        onClick={() => {
          if (lobby.inLobbyPlayers < lobby.maxPlayers) {
            // if (user.uid.length > 0 && user.id) {
            socket.emit("LOBBY_USERS", {
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
