import React from 'react/addons';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import App from './components/App';
import LogDetail from './components/LogDetail';
import Stream from './components/Stream';

export default function createRoutes() {
  return (
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={Stream} name='stream' />
        <Route path='/log/:id' component={LogDetail} name='detail' />
      </Route>
    </Router>
  );
}
