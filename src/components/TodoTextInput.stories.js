import React from 'react';
import { action } from '@storybook/addon-actions';
import TodoTextInput from './TodoTextInput';

export default {
  title: 'TodoTextInput',
  component: TodoTextInput,
};

export const NewTodo = () => (
  <TodoTextInput
    newTodo
    text=""
    editing
    placeholder="testing placeholder"
    onSave={action('onSave')}
  />
);

export const Todo = () => (
  <TodoTextInput text="Todo1" editing onSave={action('onSave')} />
);
