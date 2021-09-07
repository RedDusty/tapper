import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import StartPage from './components/StartPage';
import GamesList from './components/GamesList';
import Lobby from './components/Lobby';
import { useDispatch } from 'react-redux';
import { setUserId } from './redux/actions/userActions';
import socket from './socketio';
import { useTypedSelector } from './redux/useTypedSelector';
import { userInfoType } from './redux/types';

function App() {
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user);

  socket.on('connect', () => {
    console.log(socket.id);
    dispatch(setUserId(socket.id));
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
          </Route>
          <Route exact path="/games">
            <GamesList />
          </Route>
          <Route exact path="/lobby">
            <Lobby />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
