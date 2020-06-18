import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Utils from '../utils';

function TodoFooter({ count, completedCount, onClearCompleted }) {
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
          <NavLink exact to="/" activeClassName="selected">
            All
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink to="/active" activeClassName="selected">
            Active
          </NavLink>
        </li>
        <li>
          {' '}
          <NavLink to="/completed" activeClassName="selected">
            Completed
          </NavLink>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}

TodoFooter.propTypes = {
  count: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default TodoFooter;
