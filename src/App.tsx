import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import StartPage from './components/StartPage';
import GamesList from './components/GamesList';
import Lobby from './components/Lobby/Lobby';
import { useDispatch } from 'react-redux';
import { userSetId } from './redux/actions/userActions';
import socket from './socketio';
import { useTypedSelector } from './redux/useTypedSelector';
import { userInfoType } from './redux/types';
import Info from './components/Info';
import Dummy from './components/Dummy';

function App() {
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user);

  socket.on('connect', () => {
    console.log(socket.id);
    dispatch(userSetId(socket.id));
  });

  useEffect(() => {
    socket.emit('USER_LOGIN', {
      nickname: user.nickname,
      avatar: user.avatar,
      skin: user.skin,
      rank: user.rank,
      firstLogin: user.firstLogin,
      uid: user.uid,
      id: socket.id
    } as userInfoType);
  }, [user]);

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
          <Route exact path="/ranking">
            <Dummy />
            <Info />
          </Route>
          <Route exact path="/skins">
            <Dummy />
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
