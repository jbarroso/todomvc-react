import React from 'react';
import { withRedux } from '../../.storybook/decorators';
import MainSection from './MainSection';

export default {
  title: 'MainSection',
  component: MainSection,
  decorators: [withRedux({ todos: { todos: [] } })],
};

export const WithActiveTodos = () => <MainSection />;
WithActiveTodos.story = {
  decorators: [
    withRedux({
      todos: {
        todos: [
          { id: 'foo', title: 'Todo1', completed: false },
          { id: 'bar', title: 'Todo2', completed: true },
        ],
      },
    }),
  ],
};

export const WithoutActiveTodos = () => <MainSection />;
WithoutActiveTodos.story = {
  decorators: [
    withRedux({
      todos: {
        todos: [
          { id: 'foo', title: 'Todo1', completed: true },
          { id: 'bar', title: 'Todo2', completed: true },
        ],
      },
    }),
  ],
};

export const WithoutTodos = () => <MainSection />;
WithoutTodos.story = {
  decorators: [
    withRedux({
      todos: {
        todos: [],
      },
    }),
  ],
};
