import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import TodoApp from './js/app';
import TodoModel from './js/todoModel';

const model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <TodoApp model={model} />
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
