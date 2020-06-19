import React from 'react';
import { action } from '@storybook/addon-actions';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
};

export const DefaultView = () => <Header onSave={action('onSave')} />;
