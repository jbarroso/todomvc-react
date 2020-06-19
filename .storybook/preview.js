import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { addDecorator } from '@storybook/react';

import 'todomvc-app-css/index.css';

addDecorator(storyFn =>
  <BrowserRouter>
    <div className="todoapp">{storyFn()}</div>
  </BrowserRouter>
);
