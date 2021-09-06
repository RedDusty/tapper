import React, { Suspense } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import StartPage from './components/StartPage';
import GamesList from './components/GamesList';

function App() {
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
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
