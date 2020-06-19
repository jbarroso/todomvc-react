import React from 'react';
import { action } from '@storybook/addon-actions';
import Footer from './Footer';

export default {
  title: 'Footer',
  component: Footer,
};

export const WithCompletedTodos = () => (
  <Footer
    count={10}
    completedCount={4}
    onClearCompleted={action('onClearCompleted')}
  />
);

export const WithoutCompletedTodos = () => (
  <Footer
    count={10}
    completedCount={0}
    onClearCompleted={action('onClearCompleted')}
  />
);
