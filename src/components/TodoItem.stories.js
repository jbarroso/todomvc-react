import React from 'react';
import { action } from '@storybook/addon-actions';
import TodoItem from './TodoItem';

export default {
  title: 'TodoItem',
  component: TodoItem,
  decorators: [(storyFn) => <ul className="todo-list">{storyFn()}</ul>],
};
const todo = { id: '1', title: 'Todo1', completed: false };
const completedTodo = { id: '1', title: 'Todo1', completed: true };

export const WithTodo = () => (
  <TodoItem
    todo={todo}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);

export const WithCompletedTodo = () => (
  <TodoItem
    todo={completedTodo}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);
