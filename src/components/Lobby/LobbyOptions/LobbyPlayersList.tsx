import { useEffect, useState } from "react";
import Cross from "../../../icons/cross";
import { userInfoType } from "../../../redux/types";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import UserSkin from "../../UserSkin";
import { renderImage } from "../Lobby";

function LobbyPlayersList() {
  const [listPlayers, setListPlayers] = useState<userInfoType[]>([]);

  const { users, ownerUID } = useTypedSelector((state) => state.lobby);
  const userUID = useTypedSelector((state) => state.user.uid);
  useEffect(() => {
    setListPlayers(users);
  }, [users]);

  return (
    <div className="bg-white p-2 rounded-md text-black max-h-48 lg:max-h-96 overflow-y-auto mt-2">
      {listPlayers.map((user) => {
        return (
          <div
            className="flex items-center p-2 my-2 min-w-min max-w-max hover:bg-gray-200 rounded-md"
            key={user.id + "|||" + user.uid}
          >
            {renderImage(user.avatar)}
            <p className="ml-2">{(user.nickname || user.uid!).substr(0, 16)}</p>
            <div className="ml-4">
              <UserSkin key={user.nickname + "skin"} {...user.skin} />
            </div>
            {user.uid === ownerUID ? (
              <></>
            ) : userUID === ownerUID ? (
              <button
                className="w-8 h-8 ml-2 fill-current bg-gray-300 text-gray-500 hover:text-red-600 hover:bg-red-200 p-1.5 rounded-full"
                onClick={() => {}}
              >
                <Cross />
              </button>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LobbyPlayersList;
