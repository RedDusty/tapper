import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import StartPage from "./components/StartPage";
import GamesList from "./components/GamesList";
import { Lobby } from "./components/Lobby/Lobby";
import Info from "./components/Info";
import Dummy from "./components/Helpers/Dummy";
import GameScores from "./components/GameScores";
import Skins from "./components/Skins";
import Score from "./components/Score";
import { useDispatch } from "react-redux";
import { userInfoType } from "./redux/types";
import { userSet } from "./redux/actions/userActions";
import { getSocket } from "./socketio";
import { useTypedSelector } from "./redux/useTypedSelector";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./fbConfig";
import { fbAuthUser, logOut } from "./firebase";
import Loading from "./components/Helpers/Loading";
import Connecting from "./components/Helpers/Connecting";
import FAQ from "./components/FAQ";
import GlobalChat from "./components/GlobalChat";

function App() {
  const [serverConnected, setServerConnected] = React.useState(false);
  const [isDuplicate, setDuplicate] = React.useState(false);
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user);

  getSocket().on("connect", () => {
    console.log(getSocket().id);
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (gUser) => {
      if (gUser !== null) {
        const userData = (await fbAuthUser(gUser)) as userInfoType;
        dispatch(
          userSet({
            avatar: gUser.photoURL,
            banned: userData.banned,
            firstLogin: userData.firstLogin,
            id: getSocket().id,
            nickname: gUser.displayName,
            score: userData.score,
            key: userData.key,
            skin: {
              type: userData.skin.type,
              color: userData.skin.color,
              withBorder: userData.skin.withBorder,
              borderColor: userData.skin.borderColor,
              borderStyle: userData.skin.borderStyle,
              borderWidth: userData.skin.borderWidth,
            },
            uid: gUser.uid,
            isLoaded: false,
          })
        );
        getSocket().emit("USER_LOGIN", {
          avatar: gUser.photoURL,
          banned: userData.banned,
          firstLogin: userData.firstLogin,
          id: user.id,
          nickname: gUser.displayName,
          score: userData.score,
          key: null,
          skin: {
            type: userData.skin.type,
            color: userData.skin.color,
            withBorder: userData.skin.withBorder,
            borderColor: userData.skin.borderColor,
            borderStyle: userData.skin.borderStyle,
            borderWidth: userData.skin.borderWidth,
          },
          uid: gUser.uid,
          isLoaded: false,
        } as userInfoType);
      } else {
        dispatch(userSet({} as userInfoType));
      }
    });
    getSocket().on("ACCOUNT_DUPLICATE", (val) => setDuplicate(val));
    return () => {
      getSocket().off("ACCOUNT_DUPLICATE");
    };
    // eslint-disable-next-line
  }, [auth.currentUser]);

  if (isDuplicate) {
    return (
      <div className="failConnect">
        <p className="font-bold text-center flex justify-center items-center text-2xl md:text-9xl">
          Account duplicate not allowed.
        </p>
        <button
          className="bg-white p-4 font-bold text-2xl md:text-4xl mt-12 text-black rounded-md"
          style={{ boxShadow: "0 0 4px 2px #ffffff" }}
          onClick={() => {
            logOut();
            getSocket().emit("USER_LOGOUT");
            setDuplicate(false);
          }}
        >
          Logout
        </button>
      </div>
    );
  } else if (serverConnected) {
    return (
      <div className="App">
        <RenderApp />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Connecting
          setServerConnected={setServerConnected}
          serverConnected={serverConnected}
          key={"serverConnectionCheck"}
        />
      </div>
    );
  }
}

const RenderApp = () => {
  const [isKick, setKick] = React.useState<boolean>(false);
  useEffect(() => {
    getSocket().on("LOBBY_KICK", () => {
      setKick(true);
    });
    return () => {
      getSocket().off("LOBBY_KICK");
      getSocket().off("G_CHAT_MESSENGER");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <div className="fixed w-screen h-screen flex items-center justify-center bg-black bg-opacity-25">
            <div className="flex items-center justify-center p-12 bg-gray-300 bg-opacity-50 rounded-full">
              <Loading color="text-gray-600" />
            </div>
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <StartPage isKick={isKick} setKick={setKick} />
            <Info />
          </Route>
          <Route exact path="/faq">
            <FAQ />
            <Info />
          </Route>
          <Route exact path="/game-score">
            <GameScores />
            <Info />
          </Route>
          <Route exact path="/games">
            <GamesList />
            <Info />
          </Route>
          <Route exact path="/lobby">
            <Lobby />
            <Info />
          </Route>
          <Route exact path="/score">
            <Score />
            <Info />
          </Route>
          <Route exact path="/skins">
            <Skins />
            <Info />
          </Route>
          <Route exact path="/replays">
            <Dummy />
            <Info />
          </Route>
          <Route exact path="/gChat">
            <GlobalChat />
            <Info />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
