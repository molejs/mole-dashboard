const logs = {
  '55bb692e19ff303084000000': {
    id: '55bb692e19ff303084000000',
    timestamp: new Date().toString(),
    location: {
      host: 'fake.molejs.org',
      href: 'http://fake.molejs.org/app',
      hash: '',
      pathname: '/app',
      port: '',
      protocol: 'http:',
      search: ''
    },
    error: {
      message: 'Uncaught Error: invariant requires an error message argument',
      stacktrace: [
        {
          'function': 'invariant',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '40803',
          column: '123'
        },
        {
          'function': 'findFirstReactDOMImpl',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '31938',
          column: '39'
        },
        {
          'function': 'ReactMount.getFirstReactDOM',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '32267',
          column: '29'
        },
        {
          'function': 'handleTopLevelWithoutPath',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '30683',
          column: '90'
        },
        {
          'function': 'handleTopLevelImpl',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '30678',
          column: '12'
        },
        {
          'function': 'Mixin.perform',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '35320',
          column: '123'
        }
      ]
    },
    action_state_history: [
      {
        action: {
          type: 'OPEN_LOGIN'
        },
        state: {
          loggedIn: false
        }
      }
    ]
  },
  '55bb692e19ff303084000001': {
    id: '55bb692e19ff303084000001',
    timestamp: new Date().toString(),
    location: {
      host: 'fake.molejs.org',
      href: 'http://fake.molejs.org/app',
      hash: '',
      pathname: '/app',
      port: '',
      protocol: 'http:',
      search: ''
    },
    error: {
      message: 'TypeError: ReactDOM.findDOMNode(...).className.split is not a function',
      stacktrace: [
        {
          'function': 'findAllInRenderedTreeInternal',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '40803',
          column: '123'
        },
        {
          'function': 'findAllInRenderedTreeInternal',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '31938',
          column: '39'
        },
        {
          'function': 'findAllInRenderedTreeInternal',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '32267',
          column: '29'
        },
        {
          'function': 'Object.ReactTestUtils.findAllInRenderedTree',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '30683',
          column: '90'
        },
        {
          'function': 'Object.ReactTestUtils.scryRenderedDOMComponentsWithClass',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '30678',
          column: '12'
        },
        {
          'function': 'ReactTestUtils.findRenderedDOMComponentWithClass',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '45355',
          column: '89'
        },
        {
          'function': 'Object.<anonymous>',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '76576',
          column: '67'
        },
        {
          'function': 'attemptSync',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '987987',
          column: '54'
        },
        {
          'function': 'QueueRunner.run',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '238945',
          column: '34'
        }
      ]
    },
    action_state_history: [
      {
        action: {
          type: 'OPEN_LOGIN'
        },
        state: {
          loggedIn: false
        }
      },
      {
        action: {
          type: 'LOGIN'
        },
        state: {
          loggedIn: false
        }
      },
      {
        action: {
          type: 'LOGGED_IN'
        },
        state: {
          loggedIn: true
        }
      }
    ]
  },
  '55bb692e19ff303084000002': {
    id: '55bb692e19ff303084000002',
    timestamp: new Date().toString(),
    location: {
      host: 'fake.molejs.org',
      href: 'http://fake.molejs.org/app',
      hash: '',
      pathname: '/app',
      port: '',
      protocol: 'http:',
      search: ''
    },
    error: {
      message: 'TypeError: response.json is not a function',
      stacktrace: [
        {
          'function': '(anonymous function)',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '8768',
          column: '45'
        },
        {
          'function': 'run',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '28376',
          column: '90'
        },
        {
          'function': '(anonymous function)',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '2737',
          column: '8'
        },
        {
          'function': 'flush',
          file: 'http://fake.molejs.org/assets/bundle.js',
          line: '72836',
          column: '65'
        }
      ]
    },
    action_state_history: [
      {
        action: {
          type: 'OPEN_LOGIN'
        },
        state: {
          loggedIn: false
        }
      }
    ]
  }
};

const logsResponse = {
  error: false,
  logs: [],
  total: 10,
  count: 0
};

window.fetch = function (url) {
  if (/\/logs/.test(url)) {
    return new Promise((resolve, reject) => {
      let skip = url.split('skip=').pop();
      if (Number(skip) === 0) {
        let responseLogs = Object.keys(logs).map(k => logs[k]);
        resolve({
          json() {
            return Object.assign({}, logsResponse, {
              logs: responseLogs,
              count: responseLogs.length
            });
          }
        });
      } else {
        resolve({
          json() {
            return logsResponse;
          }
        });
      }
    });
  } else if (/\/log\//.test(url)) {
    return new Promise((resolve, reject) => {
      let id = url.split('/').pop();
      if (logs[id]) {
        resolve({
          json() {
            return {
              error: false,
              log: logs[id]
            };
          }
        });
      } else {
        reject();
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
};