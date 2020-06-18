import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'todomvc-app-css/index.css';

import Header from './Header';
import TodoList from './TodoList';
import TodoFooter from './Footer';
import * as types from '../constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleOnSave = this.handleOnSave.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggle = this.toggle.bind(this);
    this.destroy = this.destroy.bind(this);
    this.save = this.save.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  handleOnSave(newTodoText) {
    const { model } = this.props;

    const val = newTodoText.trim();

    if (val) {
      model.addTodo(val);
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

  save(todoToSave, text) {
    const { model } = this.props;
    model.save(todoToSave, text);
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
          <TodoList
            filteredTodos={shownTodos}
            onToggle={this.toggle}
            onDestroy={this.destroy}
            onSave={this.save}
          />
        </section>
      );
    }

    return (
      <section className="todoapp">
        <div>
          <Header onSave={this.handleOnSave} />
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
