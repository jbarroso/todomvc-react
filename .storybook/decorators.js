import React from 'react';
import { Provider } from 'react-redux';
import addons from '@storybook/addons';
import withReduxCore from 'addon-redux/withRedux';
import store from './store';

export const withRedux = (state, actions) => withReduxCore(addons)({
  Provider, store, state, actions
})
