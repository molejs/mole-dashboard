import expect from 'expect';

import detail from '../../src/reducers/detail';
import { detailLoad } from '../../src/actions/detail';

describe('reducers / detail', () => {
  describe('when receives a load action', () => {
    it('returns a loading state', () => {
      let state = detail({}, detailLoad());
      expect(state.loading).toBe(true);
    });
  });

  describe('when receives a loaded action', () => {
    it('returns a not-loading state with the data', () => {
      let state = detail({}, detailLoad('foo'));
      expect(state.loading).toBe(false);
      expect(state.data).toBe('foo');
    });
  });
});
