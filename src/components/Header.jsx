import React from 'react';
import { useDispatch } from 'react-redux';
import TodoTextInput from './TodoTextInput';
import { addTodo } from '../actions';

const Header = () => {
  const dispatch = useDispatch();
  const onSave = (title) => dispatch(addTodo(title));
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={onSave}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
