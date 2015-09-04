import { combineReducers, createStore } from 'redux';

import stream from './reducers/stream';
import detail from './reducers/detail';

const appStore = combineReducers({
  stream,
  detail
});

export default createStore(appStore);
