import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import Utils from './utils';
import App from './containers/App';

const STORE_KEY = 'react-todos';
const store = createStore(reducer, Utils.store(STORE_KEY));
store.subscribe(() => Utils.store(STORE_KEY, store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Route
          path="/:nowShowing?"
          render={(props) => <App nowShowing={props.match.params.nowShowing} />}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
