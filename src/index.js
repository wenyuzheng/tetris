import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import LeaderBoard from './components/startpage/LeaderBoard';
import App from './App';
import Test from './Test';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/test" component={Test} />
      <Route path="/leaderboard" component={LeaderBoard}/>
      <Route defalut path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
