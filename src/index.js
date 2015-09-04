require('../style/material.min.css');
require('../style/styles.css');
require('babel/polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import { Provider } from 'react-redux';

import createRoutes from './routes';
import store from './store';
React.render(
  <Provider store={store}>
    {() => createRoutes()}
  </Provider>,
  document.body
);
