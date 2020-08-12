import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Store from './Store';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import LeaderBoard from './Components/LeaderBoard';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/leaderboard" component={LeaderBoard}/>
      <Route defalut path="/" component={Store} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
