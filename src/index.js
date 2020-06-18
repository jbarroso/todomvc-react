import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import TodoApp from './components/app';
import TodoModel from './todoModel';

const model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Route
          path="/:nowShowing?"
          render={(props) => (
            <TodoApp nowShowing={props.match.params.nowShowing} model={model} />
          )}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

model.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
