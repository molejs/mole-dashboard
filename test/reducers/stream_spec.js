import expect from 'expect';

import stream from '../../src/reducers/stream';
import { streamLoad } from '../../src/actions/stream';

describe('reducers / stream', () => {
  describe('when receives a load action', () => {
    it('returns a loading state with unchanged previous state', () => {
      let state = stream({foo: 1, loading: false}, streamLoad());
      expect(state.loading).toBe(true);
      expect(state.foo).toBe(1);
    });
  });

  describe('when receives a loaded action', () => {
    it('returns a not-loading state with the data', () => {
      let state = stream({
        logs: [1, 2, 3],
        total: 5,
        page: 1,
        hasMore: true,
        loading: true
      }, streamLoad(2, {
        total: 6,
        logs: [4, 5, 6]
      }));

      expect(state.loading).toBe(false);
      expect(state.total).toBe(6);
      expect(state.page).toBe(2);
      expect(state.hasMore).toBe(false);
      expect(state.logs).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
