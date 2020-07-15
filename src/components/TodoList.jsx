import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ filteredTodos, onToggle, onDestroy, onSave }) => (
  <ul className="todo-list">
    {filteredTodos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDestroy={onDestroy}
        onSave={onSave}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(TodoItem.propTypes.todo).isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
