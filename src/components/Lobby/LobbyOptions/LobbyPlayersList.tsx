import { useEffect, useState } from "react";
import Cross from "../../../icons/cross";
import Crown from "../../../icons/crown";
import { lobbyType, userInfoType } from "../../../redux/types";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { getSocket } from "../../../socketio";
import UserSkin from "../../Helpers/UserSkin";
import { renderImage } from "../Lobby";

function LobbyPlayersList() {
  const [listPlayers, setListPlayers] = useState<userInfoType[]>([]);

  const lobby = useTypedSelector((state) => state.lobby);
  const users = lobby.users;
  const ownerUID = lobby.ownerUID
  const userUID = useTypedSelector((state) => state.user.uid);
  useEffect(() => {
    setListPlayers(users);
  }, [users]);

  return (
    <div className="bg-white p-2 rounded-md text-black max-h-48 lg:max-h-96 overflow-y-auto mt-2">
      {listPlayers.map((user) => {
        return (
          <PlayerRender
            ownerUID={ownerUID}
            user={user}
            lobby={lobby}
            userUID={userUID!}
            key={user.nickname + "listplayer"}
          />
        );
      })}
    </div>
  );
}

const PlayerRender = ({
  user,
  ownerUID,
  lobby,
  userUID,
}: {
  user: userInfoType;
  ownerUID: string;
  lobby: lobbyType;
  userUID: string;
}) => {
  if (user.uid === ownerUID) {
    return (
      <div className="flex items-center p-2 my-2 min-w-min max-w-max hover:bg-gray-200 rounded-md">
        {renderImage(user.avatar)}
        <p className="ml-2">{(user.nickname || user.uid!).substr(0, 16)}</p>
        <div className="ml-4">
          <UserSkin key={user.nickname + "skin"} {...user.skin} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center p-2 my-2 min-w-min max-w-max hover:bg-gray-200 rounded-md">
        {renderImage(user.avatar)}
        <p className="ml-2">{(user.nickname || user.uid!).substr(0, 16)}</p>
        <div className="ml-4">
          <UserSkin key={user.nickname + "skin"} {...user.skin} />
        </div>
        <PlayerButtonsRender
          lobby={lobby}
          ownerUID={ownerUID}
          user={user}
          userUID={userUID}
          key={user.nickname + "buttonlist"}
        />
      </div>
    );
  }
};

const PlayerButtonsRender = ({
  lobby,
  ownerUID,
  userUID,
  user,
}: {
  userUID: string;
  ownerUID: string;
  lobby: lobbyType;
  user: userInfoType;
}) => {
  if (userUID === ownerUID) {
    return (
      <>
        <button
          className="w-8 h-8 ml-2 fill-current bg-gray-300 text-gray-500 hover:text-red-600 hover:bg-red-200 p-1.5 rounded-full"
          onClick={() => {
            getSocket().emit("LOBBY_USERS", {
              action: "userKick",
              code: lobby.code,
              user: user,
            });
          }}
          title="Kick"
        >
          <Cross />
        </button>
        <button
          className="w-8 h-8 ml-2 fill-current bg-gray-300 text-gray-500 hover:text-green-600 hover:bg-green-200 p-1.5 rounded-full"
          onClick={() => {
            getSocket().emit("LOBBY_USERS", {
              action: "userOwner",
              code: lobby.code,
              user: user,
            });
          }}
          title="Make owner"
        >
          <Crown />
        </button>
      </>
    );
  } else {
    return <></>;
  }
};

export default LobbyPlayersList;
