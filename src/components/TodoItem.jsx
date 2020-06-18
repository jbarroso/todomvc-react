import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TodoTextInput from './TodoTextInput';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editText: props.todo.title,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { todo, editing } = this.props;
    const { editText } = this.state;
    return (
      nextProps.todo !== todo ||
      nextProps.editing !== editing ||
      nextState.editText !== editText
    );
  }

  handleSubmit(val) {
    const { todo, onSave, onDestroy } = this.props;
    if (val) {
      onSave(todo, val);
      this.setState({ editText: val });
    } else {
      onDestroy(todo);
    }
  }

  handleEdit() {
    const { todo, onEdit } = this.props;
    onEdit(todo);
    this.setState({ editText: todo.title });
  }

  handleChange(event) {
    const { editing } = this.props;
    if (editing) {
      this.setState({ editText: event.target.value });
    }
  }

  handleToggle() {
    const { onToggle, todo } = this.props;
    onToggle(todo);
  }

  handleDestroy() {
    const { onDestroy, todo } = this.props;
    onDestroy(todo);
  }

  render() {
    const { todo, editing } = this.props;
    const { editText } = this.state;
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
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={this.handleDestroy}
          />
        </div>
        <TodoTextInput
          text={editText}
          onSave={this.handleSubmit}
          editing={editing}
        />
      </li>
    );
  }
}
TodoItem.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
