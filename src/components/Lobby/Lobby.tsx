import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { gameDotsSet } from "../../redux/actions/gameActions";
import {
  lobbySet,
  lobbySetFieldX,
  lobbySetFieldY,
  lobbySetinLobbyPlayers,
  lobbySetMaxPlayers,
  lobbySetMessages,
  lobbySetStarted,
  lobbySetUsers,
  lobbySetVisibility,
} from "../../redux/actions/lobbyActions";
import { initialLobbyState } from "../../redux/reducers/lobbyReducer";
import {
  dotType,
  lobbySocketOptionsType,
  lobbyType,
  lobbyUsersGetType,
  visibilityType,
} from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";
import socket from "../../socketio";
import Battlefield from "../Battlefield/Battlefield";
import Loading from "../Helpers/Loading";
import LobbyChat from "./LobbyChat/LobbyChat";
import LobbyHeader from "./LobbyHeader";
import LobbyOptions from "./LobbyOptions/LobbyOptions";

export type fieldType = {
  fieldX: number;
  fieldY: number;
  dots: dotType[];
};

export type lobbyTab = "chat" | "options";

export function renderImage(avatar: string | null) {
  if (avatar !== null) {
    if (avatar === "system") {
      return <div className="bg-blue-500 w-8 h-8 rounded-full"></div>;
    } else {
      return (
        <div className="bg-gray-500 w-8 h-8 animate-pulse rounded-full">
          <img
            src={avatar}
            alt={""}
            className="w-full h-full rounded-full transform duration-200 hover:scale-150"
            onLoad={(e) => {
              e.currentTarget.parentElement?.classList.remove("animate-pulse");
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement?.classList.remove("bg-gray-500");
              e.currentTarget.parentElement?.classList.remove("animate-pulse");
              e.currentTarget.parentElement?.classList.add("bg-red-500");
            }}
          />
        </div>
      );
    }
  } else {
    return <div className="bg-green-600 w-8 h-8 rounded-full"></div>;
  }
}

function renderTab(tab: lobbyTab, code: string) {
  if (code.length > 0) {
    switch (tab) {
      case "chat": {
        return <LobbyChat />;
      }
      case "options": {
        return <LobbyOptions />;
      }
      default: {
        return <></>;
      }
    }
  } else {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center p-12 bg-gray-300 bg-opacity-50 rounded-full">
          <Loading color="text-gray-600" />
        </div>
      </div>
    );
  }
}

export function Lobby() {
  const [tab, setTab] = useState<lobbyTab>("chat");
  const [dataGained, setDataGain] = useState<boolean>(false);
  const history = useHistory()
  const dispatch = useDispatch();

  const lobby = useTypedSelector((state) => state.lobby);
  const onwerUID = lobby.ownerUID;
  const code = lobby.code;
  const user = useTypedSelector((state) => state.user);

  useEffect(() => {
    socket.on("LOBBY_USERS_UPDATE", (data: lobbyUsersGetType) => {
      switch (data.type) {
        case "userJoin": {
          dispatch(lobbySetinLobbyPlayers(String(data.value.length)));
          dispatch(lobbySetUsers(data.value));
          if (!lobby.code) {
            dispatch(lobbySet(data.lobby));
          }
          return 0;
        }
        case "userLeave": {
          dispatch(lobbySetinLobbyPlayers(String(data.value.length)));
          dispatch(lobbySetUsers(data.value));
          return 0;
        }
        case "userKick": {
          if (data.uid === user.uid) {
            dispatch(lobbySet(initialLobbyState));
            history.push("/")
            return 0;
          }
          dispatch(lobbySetinLobbyPlayers(String(data.value.length)));
          dispatch(lobbySetUsers(data.value));
          return 0;
        }
        case "userOwner": {
          dispatch(lobbySet(data.lobby));
          return 0;
        }
        default:
          return 0;
      }
    });
    socket.on("LOBBY_OPTIONS_UPDATE", (data: lobbySocketOptionsType) => {
      if (user.id !== lobby.ownerUID) {
        setOptions(dispatch, data, lobby);
      }
    });
    socket.on("GAME_LOADING", (data) => {
      dispatch(lobbySetStarted(true));
      dispatch(lobbySet(data.lobby));
      dispatch(lobbySetFieldX(data.field.fieldX));
      dispatch(lobbySetFieldY(data.field.fieldY));
      dispatch(gameDotsSet(data.dots));
      dispatch(lobbySetUsers(data.value));
      setDataGain(true);
    });
    socket.on("SKIN_CHANGE_USERS", (data) => {
      dispatch(lobbySetUsers(data.value));
    });
    socket.on("LOBBY_GET_MESSAGES", (msgData) => {
      dispatch(lobbySetMessages(msgData));
    });
    return () => {
      socket.off("LOBBY_USERS_UPDATE");
      socket.off("LOBBY_OPTIONS_UPDATE");
      socket.off("GAME_LOADING");
      socket.off("SKIN_CHANGE_USERS");
      socket.off("LOBBY_GET_MESSAGES");
    };
    // eslint-disable-next-line
  }, [code, onwerUID]);

  return (
    <div className="w-full h-full">
      {dataGained === false ? (
        <>
          <LobbyHeader setTab={setTab} />
          {renderTab(tab, lobby.code)}
        </>
      ) : (
        <Battlefield dataGained={dataGained} />
      )}
    </div>
  );
}

function setOptions(
  dispatch: Dispatch<any>,
  data: lobbySocketOptionsType,
  lobby: lobbyType
) {
  switch (data.type) {
    case "setFieldX": {
      dispatch(lobbySetFieldX(String(data.option)));
      return 0;
    }
    case "setFieldY": {
      dispatch(lobbySetFieldY(String(data.option)));
      return 0;
    }
    case "setInLobbyPlayers": {
      dispatch(lobbySetinLobbyPlayers(String(data.option)));
      return 0;
    }
    case "setMaxPlayers": {
      dispatch(lobbySetMaxPlayers(String(data.option)));
      return 0;
    }
    case "setVisibility": {
      dispatch(lobbySetVisibility(data.option as visibilityType));
      return 0;
    }
    default:
      return 0;
  }
}
