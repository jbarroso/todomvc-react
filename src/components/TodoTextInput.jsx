import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ENTER_KEY = 13;

const TodoTextInput = ({
  editing,
  text: textProp,
  placeholder,
  onSave,
  newTodo,
}) => {
  const [text, setText] = useState(textProp || '');

  const inputRef = useRef(null);

  useLayoutEffect(() => {
    const node = inputRef.current;
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  }, [editing]);

  const handleSubmit = (event) => {
    const textValue = event.target.value.trim();
    if (event.which === ENTER_KEY) {
      onSave(textValue);
      if (newTodo) {
        setText('');
      }
    }
  };

  const handleChange = (event) => setText(event.target.value);

  const handleBlur = (event) => {
    if (!newTodo) {
      onSave(event.target.value);
    }
  };

  return (
    <input
      ref={inputRef}
      className={classnames({
        'new-todo': newTodo,
        edit: !newTodo,
      })}
      type="text"
      placeholder={placeholder}
      autoFocus
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

TodoTextInput.defaultProps = {
  text: '',
  placeholder: '',
  editing: false,
  newTodo: false,
};

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

export default TodoTextInput;
