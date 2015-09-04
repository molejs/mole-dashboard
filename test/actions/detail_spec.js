import expect from 'expect';

import { detailLoad, DETAIL_LOAD, DETAIL_LOADED } from '../../src/actions/detail';

describe('actions / detail', () => {
  describe('detailLoad', () => {
    describe('when is called with no args', () => {
      it('should return a load action', () => {
        expect(detailLoad().type).toBe(DETAIL_LOAD);
      });
    });

    describe('when is called with data', () => {
      it('should return the action loaded with data', () => {
        let action = detailLoad('foo');
        expect(action.type).toBe(DETAIL_LOADED);
        expect(action.data).toBe('foo');
      });
    });
  });
});
