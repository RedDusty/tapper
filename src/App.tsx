import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import StartPage from './components/StartPage';
import GamesList from './components/GamesList';
import { Lobby } from './components/Lobby/Lobby';
import Info from './components/Info';
import Dummy from './components/Dummy';
import { useDispatch } from 'react-redux';
import { userSet } from './redux/actions/userActions';
import socket from './socketio';
import { useTypedSelector } from './redux/useTypedSelector';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './fbConfig';
import { fbGetUser } from './firebase';
import Skins from './components/Skins';
import { skinBorderStyleType, userInfoType } from './redux/types';

function App() {
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user);

  socket.on('connect', () => {
    console.log(socket.id);
  });

  useEffect(() => {
    const skinColor = localStorage.getItem('skin-color') || 'bg-red-300';
    const skinBorder = Boolean(localStorage.getItem('skin-border')) || Boolean('false');
    const skinBorderColor = localStorage.getItem('skin-border-color') || 'border-red-300';
    const skinBorderStyle = (localStorage.getItem('skin-border-style') as skinBorderStyleType) || 'solid';
    const skinBorderWidth = Number(localStorage.getItem('skin-border-width')) || Number('1');
    onAuthStateChanged(auth, async (gUser) => {
      if (gUser !== null) {
        const userData = await fbGetUser(gUser);
        dispatch(
          userSet({
            avatar: gUser.photoURL,
            banned: userData.banned,
            firstLogin: userData.firstLogin,
            id: socket.id,
            nickname: gUser.displayName,
            score: userData.score,
            skinOptions: {
              skin: 'standard',
              skinBorder,
              skinBorderColor,
              skinBorderStyle,
              skinBorderWidth,
              skinColor
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
          skinOptions: {
            skin: 'standard',
            skinBorder,
            skinBorderColor,
            skinBorderStyle,
            skinBorderWidth,
            skinColor
          },
          uid: gUser.uid,
          isLoaded: false
        } as userInfoType);
      } else {
        dispatch(
          userSet({
            avatar: null,
            banned: false,
            firstLogin: 0,
            id: undefined,
            nickname: null,
            score: 0,
            skinOptions: {
              skin: 'standard',
              skinBorder,
              skinBorderColor,
              skinBorderStyle,
              skinBorderWidth,
              skinColor
            },
            uid: null
          })
        );
      }
    });
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
          <Route exact path="/games">
            <GamesList />
            <Info />
          </Route>
          <Route exact path="/lobby">
            <Lobby />
            <Info />
          </Route>
          <Route exact path="/score">
            <Dummy />
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
