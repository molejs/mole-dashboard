import expect from 'expect';

import { streamLoad, STREAM_LOAD, STREAM_LOADED } from '../../src/actions/stream';

describe('actions / stream', () => {
  describe('streamLoad', () => {
    describe('when is called with no args', () => {
      it('should return a load action', () => {
        expect(streamLoad().type).toBe(STREAM_LOAD);
        expect(streamLoad().page).toBe(1);
        expect(streamLoad().total).toBe(undefined);
        expect(streamLoad().logs).toBe(undefined);
      });
    });

    describe('when is called with data', () => {
      it('should return the action loaded with data', () => {
        let action = streamLoad(2, {
          logs: 'foo',
          total: 3
        });
        expect(action.type).toBe(STREAM_LOADED);
        expect(action.logs).toBe('foo');
        expect(action.total).toBe(3);
        expect(action.page).toBe(2);
      });
    });
  });
});
