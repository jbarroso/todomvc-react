import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ENTER_KEY = 13;

class TodoTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text || '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    const { editing } = this.props;
    if (!prevProps.editing && editing) {
      this.node.focus();
      this.node.setSelectionRange(
        this.node.value.length,
        this.node.value.length
      );
    }
  }

  handleSubmit(event) {
    const text = event.target.value.trim();
    const { onSave, newTodo } = this.props;
    if (event.which === ENTER_KEY) {
      onSave(text);
      if (newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleBlur(event) {
    const { newTodo, onSave } = this.props;
    if (!newTodo) {
      onSave(event.target.value);
    }
  }

  render() {
    const { newTodo, placeholder } = this.props;
    const { text } = this.state;
    return (
      <input
        ref={(node) => {
          this.node = node;
        }}
        className={classnames({
          'new-todo': newTodo,
          edit: !newTodo,
        })}
        type="text"
        placeholder={placeholder}
        autoFocus
        value={text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

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
