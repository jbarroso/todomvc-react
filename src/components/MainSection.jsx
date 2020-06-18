import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import TodoItem from './TodoItem';

const MainSection = ({
  toggleAll,
  activeTodoCount,
  filteredTodos,
  onToggle,
  onDestroy,
  onSave,
}) => (
  <section className="main">
    <input
      id="toggle-all"
      name="toggle-all"
      className="toggle-all"
      type="checkbox"
      onChange={toggleAll}
      checked={activeTodoCount === 0}
    />
    <label htmlFor="toggle-all" />
    <TodoList
      filteredTodos={filteredTodos}
      onToggle={onToggle}
      onDestroy={onDestroy}
      onSave={onSave}
    />
  </section>
);

MainSection.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  activeTodoCount: PropTypes.number.isRequired,
  filteredTodos: PropTypes.arrayOf(TodoItem.propTypes.todo).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MainSection;
