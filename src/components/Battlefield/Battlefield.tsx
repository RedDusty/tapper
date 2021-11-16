import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  gameDotSet,
  gameDotsSet,
  gameReplaySet,
  gameScoresSet,
  gameTimeSet,
} from "../../redux/actions/gameActions";
import { lobbySetUsers } from "../../redux/actions/lobbyActions";
import { userSetLoading } from "../../redux/actions/userActions";
import { dotType } from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { getSocket } from "../../socketio";
import Dot from "./Dot";
import LoadingWindow from "./LoadingWindow";

function Battlefield({ dataGained }: { dataGained: boolean }) {
  const [dotSize, setDotSize] = useState<number>(12);
  const [htmlField, setHtmlField] = useState<JSX.Element[]>([]);
  const [canStart, setStart] = useState<boolean>(false);

  const htmlFieldContainer = useRef<HTMLDivElement | null>(null);

  const { user, lobby } = useTypedSelector((state) => state);
  const startsIn = useTypedSelector((state) => state.lobby.startsIn);
  const dispatch = useDispatch();

  const setField = (dots: dotType[]) => {
    const tempField: JSX.Element[] = [];

    dots.forEach((dot, index) =>
      tempField.push(<Dot index={index} user={dot.user} />)
    );

    setHtmlField(tempField);
  };

  const updateField = (dot: dotType) => {
    const tempField = htmlField.slice(0)
    tempField[dot.index] = <Dot index={dot.index} user={dot.user} key={'Dot' + dot.index} />;
    setHtmlField(tempField);
  };

  useEffect(() => {
    if (canStart === false && dataGained === true) {
      if (window.innerWidth > window.innerHeight) {
        setDotSize((window.innerHeight - 64) / Number(lobby.fieldX));
      } else {
        setDotSize((window.innerWidth - 64) / Number(lobby.fieldX));
      }
      const fieldSize = Number(Number(lobby.fieldX) * Number(lobby.fieldY));

      for (let index = 0; index < fieldSize; index++) {
        setTimeout(() => {
          setHtmlField((arr) => [
            ...arr,
            <Dot key={"Dot" + index} index={index} user={undefined} />,
          ]);
        }, index * 10);
      }
    }
    getSocket().on("GAME_END", (data) => {
      getSocket().emit("USER_ROOM", {
        user,
        code: lobby.code,
        room: "game_end",
      });
      dispatch(gameDotsSet(data.dots));
      dispatch(gameTimeSet(data.time));
      dispatch(gameReplaySet(data.replay));
    });
    getSocket().on("GAME_END_SCORE", async (data) => {
      getSocket().emit("USER_ROOM", {
        user,
        code: lobby.code,
        room: "game_end",
      });
      dispatch(gameDotsSet(data.dots));
      dispatch(gameTimeSet(data.time));
      dispatch(gameReplaySet(data.replay));
      dispatch(
        gameScoresSet({
          addScore: data.addScore,
          decreaseScore: data.decreaseScore,
        })
      );
    });
    getSocket().on("GAME_TAP", (data) => {
      if (data.dots) {
        dispatch(gameDotsSet(data));
        setField(data.dots);
      }
      if (typeof data.index === 'number') {
        dispatch(gameDotSet(data));
        updateField(data);
      }
    });
    getSocket().once("GAME_LOADED", (data) => {
      setStart(data);
    });
    getSocket().on("USER_LOADED_RETURN", (data) => {
      dispatch(lobbySetUsers(data));
    });
    const fieldChecker = setInterval(() => {
      if (
        htmlFieldContainer &&
        htmlFieldContainer.current &&
        user.isLoaded === false
      ) {
        if (
          htmlFieldContainer.current.childNodes.length ===
          Number(Number(lobby.fieldX) * Number(lobby.fieldY))
        ) {
          getSocket().emit("USER_LOADED", {
            user: user,
            isLoaded: true,
            lobby: lobby,
          });

          dispatch(userSetLoading(true));
          clearInterval(fieldChecker);
        }
      }
    }, 100);
    return () => {
      getSocket().off("GAME_TAP");
      getSocket().off("GAME_LOADED");
      getSocket().off("USER_LOADED_RETURN");
      clearInterval(fieldChecker);
    };
    // eslint-disable-next-line
  }, [dataGained, startsIn, htmlFieldContainer]);
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "calc(100% - 48px)" }}
    >
      <div
        className="grid w-full h-full p-2 justify-center"
        ref={htmlFieldContainer}
        style={{
          gridTemplateColumns: `repeat(${lobby.fieldX}, ${dotSize}px)`,
          gridTemplateRows: `repeat(${lobby.fieldY}, ${dotSize}px)`,
        }}
      >
        {htmlField}
      </div>
      {lobby.startsIn <= 0 ? <></> : <LoadingWindow canStart={canStart} />}
    </div>
  );
}

export default Battlefield;
