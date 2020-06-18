import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';

const Header = ({ onSave }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={onSave}
      placeholder="What needs to be done?"
    />
  </header>
);

Header.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Header;
