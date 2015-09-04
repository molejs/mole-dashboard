export var STREAM_LOAD = 'STREAM_LOAD';
export var STREAM_LOADED = 'STREAM_LOADED';
export var FILTER_STREAM = 'FILTER_STREAM';

export function streamLoad(page = 1, data = undefined) {
  return {
    type: data ? STREAM_LOADED : STREAM_LOAD,
    page,
    logs: data ? data.logs : undefined,
    total: data ? data.total : undefined
  };
}

export function filter(query) {
  return {
    type: FILTER_STREAM,
    query
  };
}
