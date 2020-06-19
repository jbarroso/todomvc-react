import React from 'react';
import { action } from '@storybook/addon-actions';
import MainSection from './MainSection';

export default {
  title: 'MainSection',
  component: MainSection,
};
const filteredTodos = [
  { id: '1', title: 'Todo1', completed: false },
  { id: '2', title: 'Todo2', completed: true },
];

export const withActiveTodos = () => (
  <MainSection
    toggleAll={action('toggleAll')}
    activeTodoCount={1}
    filteredTodos={filteredTodos}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);

export const withoutActiveTodos = () => (
  <MainSection
    toggleAll={action('toggleAll')}
    activeTodoCount={0}
    filteredTodos={filteredTodos}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);

export const withoutTodos = () => (
  <MainSection
    toggleAll={action('toggleAll')}
    activeTodoCount={1}
    filteredTodos={[]}
    onToggle={action('onToggle')}
    onDestroy={action('onDestroy')}
    onSave={action('onSave')}
  />
);
