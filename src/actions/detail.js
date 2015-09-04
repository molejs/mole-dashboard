export var DETAIL_LOAD = 'DETAIL_LOAD';
export var DETAIL_LOADED = 'DETAIL_LOADED';

export function detailLoad(data = undefined) {
  return {
    type: data ? DETAIL_LOADED : DETAIL_LOAD,
    data
  };
}
