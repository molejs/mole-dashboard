import { DETAIL_LOAD, DETAIL_LOADED } from '../actions/detail';

let initialState = {
  loading: true
};

export default function detailReducer(state = initialState, action = {}) {
  switch (action.type) {
  case DETAIL_LOAD:
    return {
      loading: true
    };

  case DETAIL_LOADED:
    return {
      loading: false,
      data: action.data
    };

  default:
    return state;
  }
}
