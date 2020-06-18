import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'todomvc-app-css/index.css';

import TodoItem from './TodoItem';
import TodoFooter from './Footer';
import * as types from '../constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
      newTodo: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggle = this.toggle.bind(this);
    this.destroy = this.destroy.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== types.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const { newTodo } = this.state;
    const { model } = this.props;

    const val = newTodo.trim();

    if (val) {
      model.addTodo(val);
      this.setState({ newTodo: '' });
    }
  }

  toggleAll(event) {
    const { checked } = event.target;
    const { model } = this.props;
    model.toggleAll(checked);
  }

  toggle(todoToToggle) {
    const { model } = this.props;
    model.toggle(todoToToggle);
  }

  destroy(todo) {
    const { model } = this.props;
    model.destroy(todo);
  }

  edit(todo) {
    this.setState({ editing: todo.id });
  }

  save(todoToSave, text) {
    const { model } = this.props;
    model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  cancel() {
    this.setState({ editing: null });
  }

  clearCompleted() {
    const { model } = this.props;
    model.clearCompleted();
  }

  render() {
    let footer;
    let main;
    const { model, nowShowing } = this.props;
    const { todos } = model;
    const { editing, newTodo } = this.state;

    const shownTodos = todos.filter((todo) => {
      switch (nowShowing) {
        case types.ACTIVE_TODOS:
          return !todo.completed;
        case types.COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    const todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle}
          onDestroy={this.destroy}
          onEdit={this.edit}
          editing={editing === todo.id}
          onSave={this.save}
          onCancel={this.cancel}
        />
      );
    });

    const activeTodoCount = todos.reduce(
      (accum, todo) => (todo.completed ? accum : accum + 1),
      0
    );

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={nowShowing}
          onClearCompleted={this.clearCompleted}
        />
      );
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            name="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }

    return (
      <section className="todoapp">
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onKeyDown={this.handleNewTodoKeyDown}
              onChange={this.handleChange}
              autoFocus
            />
          </header>
          {main}
          {footer}
        </div>
      </section>
    );
  }
}

App.defaultProps = {
  nowShowing: types.ALL_TODOS,
};

App.propTypes = {
  nowShowing: PropTypes.oneOf([
    types.ALL_TODOS,
    types.ACTIVE_TODOS,
    types.COMPLETED_TODOS,
  ]),
  model: PropTypes.shape({
    addTodo: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
  }).isRequired,
};

export default App;
