import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Utils from './utils';
import * as types from './constants';

function TodoFooter({ count, completedCount, nowShowing, onClearCompleted }) {
  const activeTodoWord = Utils.pluralize(count, 'item');
  let clearButton = null;

  if (completedCount > 0) {
    clearButton = (
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong>
        {` ${activeTodoWord} `}
        left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: nowShowing === types.ALL_TODOS,
            })}
          >
            All
          </a>
        </li>
        <li>
          {' '}
          <a
            href="#/active"
            className={classNames({
              selected: nowShowing === types.ACTIVE_TODOS,
            })}
          >
            Active
          </a>
        </li>
        <li>
          {' '}
          <a
            href="#/completed"
            className={classNames({
              selected: nowShowing === types.COMPLETED_TODOS,
            })}
          >
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}

TodoFooter.propTypes = {
  count: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  nowShowing: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default TodoFooter;
