import { STREAM_LOAD, STREAM_LOADED, FILTER_STREAM } from '../actions/stream';

let initialState = {
  loading: true,
  logs: [],
  total: 0,
  hasMore: true,
  filter: ''
};

export default function streamReducer(state = initialState, action = {}) {
  switch (action.type) {
  case STREAM_LOAD:
    return Object.assign({}, state, { loading: true });

  case STREAM_LOADED:
    return {
      loading: false,
      page: action.page,
      logs: state.logs.concat(action.logs),
      total: action.total,
      hasMore: state.logs.length + action.logs.length < action.total
    };

  case FILTER_STREAM:
    return Object.assign({}, state, {
      filter: action.query
    });

  default:
    return state;
  }
}
