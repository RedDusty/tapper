import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import StartPage from './components/StartPage';
import GamesList from './components/GamesList';
import { Lobby } from './components/Lobby/Lobby';
import Info from './components/Info';
import Dummy from './components/Helpers/Dummy';
import GameScores from './components/GameScores';
import Skins from './components/Skins';
import Score from './components/Score';
import { useDispatch } from 'react-redux';
import { userInfoType } from './redux/types';
import { userSet, userSetScore } from './redux/actions/userActions';
import socket from './socketio';
import { useTypedSelector } from './redux/useTypedSelector';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './fbConfig';
import { fbAuthUser, fbGetUserScore } from './firebase';
function App() {
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user);

  socket.on('connect', () => {
    console.log(socket.id);
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (gUser) => {
      if (gUser !== null) {
        const userData = await fbAuthUser(gUser);
        dispatch(
          userSet({
            avatar: gUser.photoURL,
            banned: userData.banned,
            firstLogin: userData.firstLogin,
            id: socket.id,
            nickname: gUser.displayName,
            score: userData.score,
            key: userData.key,
            skin: {
              type: userData.skin.type,
              color: userData.skin.color,
              withBorder: userData.skin.withBorder,
              borderColor: userData.skin.borderColor,
              borderStyle: userData.skin.borderStyle,
              borderWidth: userData.skin.borderWidth
            },
            uid: gUser.uid,
            isLoaded: false
          })
        );
        socket.emit('USER_LOGIN', {
          avatar: gUser.photoURL,
          banned: userData.banned,
          firstLogin: userData.firstLogin,
          id: user.id,
          nickname: gUser.displayName,
          score: userData.score,
          key: null,
          skin: {
            type: "standard",
            color: "orange-600",
            withBorder: true,
            borderColor: "lime-600",
            borderStyle: "solid",
            borderWidth: 2
          },
          uid: gUser.uid,
          isLoaded: false
        } as userInfoType);
      } else {
        dispatch(userSet({} as userInfoType));
      }
    });
    socket.on('GAME_END_SCORE', async () => {
      const newScore = await fbGetUserScore(user.uid!);
      dispatch(userSetScore(newScore));
    });
    return () => {
      socket.off('GAME_END_SCORE');
    };
    // eslint-disable-next-line
  }, [auth.currentUser]);

  return (
    <div className="App">
      <Suspense fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <StartPage />
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
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
