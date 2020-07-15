import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TodoTextInput from './TodoTextInput';

const TodoItem = ({ todo, onSave, onDestroy, onToggle }) => {
  const [editText, setEditText] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const handleSubmit = (val) => {
    if (val) {
      onSave(todo, val);
      setEditText(val);
      setEditing(false);
    } else {
      onDestroy(todo);
      setEditing(false);
    }
  };

  const handleEdit = () => {
    setEditText(todo.title);
    setEditing(true);
  };

  const handleToggle = () => onToggle(todo);

  const handleDestroy = () => onDestroy(todo);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <label onDoubleClick={handleEdit}>{todo.title}</label>
        <button type="button" className="destroy" onClick={handleDestroy} />
      </div>
      <TodoTextInput text={editText} onSave={handleSubmit} editing={editing} />
    </li>
  );
};

TodoItem.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
