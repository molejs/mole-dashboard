require('../node_modules/normalize.css');
require('../style/main.less');
require('../node_modules/react-json-inspector/json-inspector.css');
require('babel/polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('./fake-data');

import React from 'react/addons';
import { Provider } from 'react-redux';

import createRoutes from './routes';
import store from './store';
React.render(
  <Provider store={store}>
    {() => createRoutes()}
  </Provider>,
  document.body
);
