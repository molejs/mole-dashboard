require('es6-promise').polyfill();
require('isomorphic-fetch');
import expect from 'expect';
import fetchMock from 'fetch-mock';

import { fetchSingleLog, fetchLogPage } from '../src/apiService';

fetchMock.registerRoute([
  {
    name: 'load_stream_p1',
    matcher: 'http://localhost:8080/logs?skip=0',
    response: {
      body: {
        error: false,
        logs: [
          1,
          2
        ],
        count: 2,
        total: 4
      }
    }
  },
  {
    name: 'load_stream_p2',
    matcher: 'http://localhost:8080/logs?skip=25',
    response: {
      body: {
        error: false,
        logs: [
          3,
          4
        ],
        count: 2,
        total: 4
      }
    }
  },
  {
    name: 'load_log',
    matcher: 'http://localhost:8080/log/aaaaa',
    response: {
      body: {
        error: false,
        log: 'foo'
      }
    }
  }
]);

describe('apiService', () => {
  beforeEach(() => {
    fetchMock.mock({
      greed: 'bad'
    });
  })

  afterEach(() => {
    fetchMock.restore();
  });

  describe('fetchSingleLog', () => {
    it('should fetch a single log', done => {
      fetchSingleLog('aaaaa').then((data) => {
        expect(data.error).toBe(false);
        expect(data.log).toBe('foo');
      }).catch(() => {
        expect(true).toBe(false);
      });

      setImmediate(() => {
        expect(fetchMock.called('load_log')).toBe(true);
        done();
      });
    });
  });

  describe('fetchLogPage', () => {
    describe('with no page', () => {
      it('should fetch with skip = 0', done => {
        fetchLogPage().then((data) => {
          expect(data.error).toBe(false);
          expect(data.logs).toEqual([1, 2]);
        }).catch(() => {
          expect(true).toBe(false);
        });

        setImmediate(() => {
          expect(fetchMock.called('load_stream_p1')).toBe(true);
          done();
        });
      });
    });

    describe('with page 2', () => {
      it('should fetch with skip = 25', done => {
        fetchLogPage(2).then((data) => {
          expect(data.error).toBe(false);
          expect(data.logs).toEqual([2, 4]);
        }).catch(() => {
          expect(true).toBe(false);
        });

        setImmediate(() => {
          expect(fetchMock.called('load_stream_p2')).toBe(true);
          done();
        });
      });
    });
  });
});
