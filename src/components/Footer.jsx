import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearCompleted } from '../actions';
import { getCompletedTodoCount, getTodosCount } from '../selectors';

import Utils from '../utils';

const Footer = () => {
  const count = useSelector(getTodosCount);
  const completedCount = useSelector(getCompletedTodoCount);
  const dispatch = useDispatch();

  const onClearCompleted = () => dispatch(clearCompleted());
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
};

export default Footer;
