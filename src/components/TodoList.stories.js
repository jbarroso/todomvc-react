import React from 'react';
import { action } from '@storybook/addon-actions';
import TodoList from './TodoList';

export default {
  title: 'TodoList',
  component: TodoList,
};

const filteredTodos = [
  { id: '1', title: 'Todo1', completed: false },
  { id: '2', title: 'Todo2', completed: true },
];

export const DefaultView = () => (
  <TodoList
    filteredTodos={filteredTodos}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);

export const WithoutTodos = () => (
  <TodoList
    filteredTodos={[]}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);
