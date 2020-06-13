import React from 'react';
import createReactClass from 'create-react-class';
import classNames from 'classnames';

import Utils from './utils';
import * as types from './constants';

var TodoFooter = createReactClass({
  render: function () {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }

    var nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({selected: nowShowing === types.ALL_TODOS})}>
              All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/active"
              className={classNames({selected: nowShowing === types.ACTIVE_TODOS})}>
              Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={classNames({selected: nowShowing === types.COMPLETED_TODOS})}>
              Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
});

export default TodoFooter;
