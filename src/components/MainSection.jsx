import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  completeAllTodos,
  completeTodo,
  deleteTodo,
  saveTodo,
} from '../actions';
import { getActiveTodoCount, getVisibleTodos } from '../selectors';
import TodoList from './TodoList';

const MainSection = ({ nowShowing }) => {
  const activeTodoCount = useSelector(getActiveTodoCount);
  const filteredTodos = useSelector((state) =>
    getVisibleTodos(state, { nowShowing })
  );

  const dispatch = useDispatch();
  const toggleAll = () => dispatch(completeAllTodos());
  const onToggle = ({ id }) => dispatch(completeTodo(id));
  const onDestroy = ({ id }) => dispatch(deleteTodo(id));
  const onSave = (todoToSave, title) => dispatch(saveTodo(todoToSave, title));

  return (
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
};
MainSection.propTypes = {
  nowShowing: PropTypes.string.isRequired,
};
export default MainSection;
