import React from 'react';
import { withRedux } from '../../.storybook/decorators';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  decorators: [withRedux()],
};

export const DefaultView = () => <Header />;
