import React from 'react';
import { withRedux } from '../../.storybook/decorators';
import Footer from './Footer';

export default {
  title: 'Footer',
  component: Footer,
};

export const WithCompletedTodos = () => <Footer />;
WithCompletedTodos.story = {
  decorators: [
    withRedux({
      todos: {
        todos: [
          { id: 'foo', title: 'Todo1', completed: true },
          { id: 'bar', title: 'Todo2', completed: false },
        ],
      },
    }),
  ],
};

export const WithoutCompletedTodos = () => <Footer />;
WithoutCompletedTodos.story = {
  decorators: [
    withRedux({
      todos: {
        todos: [
          { id: 'foo', title: 'Todo1', completed: false },
          { id: 'bar', title: 'Todo2', completed: false },
        ],
      },
    }),
  ],
};
