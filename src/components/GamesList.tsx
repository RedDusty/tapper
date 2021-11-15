import { Link } from "react-router-dom";
import { botType, lobbyType } from "../redux/types";
import { useTypedSelector } from "../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import { getServerURL, getSocket } from "../socketio";
import { lobbySet } from "../redux/actions/lobbyActions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LobbyItem from "./Lobby/LobbyItem";
import { gameSet } from "../redux/actions/gameActions";

export type lobbyShortType = {
  ownerUID: string;
  avatar: string;
  nickname: string;
  inLobbyPlayers: string;
  maxPlayers: string;
  fieldX: string;
  fieldY: string;
  code: string;
  bot: botType
};

function GamesList() {
  const { user, lobby } = useTypedSelector((state) => state);
  const [lobbyList, setLobbyList] = useState<lobbyShortType[]>([]);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    const firstLoading = async () => {
      const fetcher = await fetch(getServerURL() + "/data");
      const data = await fetcher.json();

      setLobbyList(data.lobbies);
    };
    firstLoading();
    getSocket().on("LOBBY_GET", (lobbyListArray) => {
      setLobbyList(lobbyListArray);
    });
    return () => {
      getSocket().off("LOBBY_GET");
    };
    // eslint-disable-next-line
  }, []);

  const renderLobbyList = lobbyList.map((lobby) => {
    return <LobbyItem {...lobby} key={lobby.code} />;
  });
  return (
    <div className="panelWidth my-0 mx-auto h-full">
      <div className="h-full">
        <div className="flex justify-evenly pt-4">
          <Link to="/" className="button button-green">
            {t("MAIN")}
          </Link>
          <div className="button bg-gray-300 hover:bg-gray-200">
            {t("L_PUBLIC") + ": " + lobbyList.length}
          </div>
          <Link
            to="/lobby"
            className="button button-yellow"
            onClick={() => {
              if (user.uid && lobby.code.length === 0) {
                const defaultLobby: lobbyType = {
                  fieldX: "3",
                  fieldY: "3",
                  ownerUID: user.uid!,
                  nickname:
                    user.nickname?.slice(0, 16) ||
                    user.uid?.slice(0, 16) ||
                    user.id!.slice(0, 16),
                  inLobbyPlayers: "1",
                  maxPlayers: "2",
                  bot: { isTurned: false, difficulty: "medium", speed: '6' },
                  messages: [
                    {
                      avatar: "system",
                      code: "",
                      id: "system",
                      message:
                        "The rating system does not work in single player mode.",
                      nickname: "System",
                      time: Date.now(),
                      uid: "system",
                    },
                  ],
                  users: [
                    {
                      ...user,
                      key: null,
                    },
                  ],
                  code: "",
                  visibility: "private",
                  isStarted: false,
                  startsIn: 10,
                };
                dispatch(
                  gameSet({
                    addScore: null,
                    decreaseScore: null,
                    dots: [],
                    replay: [],
                    time: { end: 0, start: 0 },
                  })
                );
                dispatch(lobbySet(defaultLobby));
                getSocket().emit("LOBBY_CREATE", defaultLobby);
              }
            }}
          >
            {t(lobby.code.length === 6 ? "LOBBY" : "CREATE")}
          </Link>
        </div>
        <div
          className="overflow-y-scroll"
          style={{ height: "calc(100% - 104px)" }}
        >
          {renderLobbyList}
        </div>
      </div>
    </div>
  );
}

export default GamesList;
