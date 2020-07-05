import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './stores/configureStore';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './containers/App';
import { createWorkerPool } from './workers';
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";

export const client = new W3CWebSocket('ws://127.0.0.1:8000');
window.jslambdasSocketClient = client;
client.onmessage = (msg: IMessageEvent) => { console.log("Recieved :" + msg.data);};
// Create our pool with 4 maximum worker;
const pool = createWorkerPool(4);

const appMode = "worker";
window.jslambdasMode = appMode;

export const store = configureStore();



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
        <Switch>
          <Route path="/" component={App}></Route>
        </Switch>
      </ConnectedRouter>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
