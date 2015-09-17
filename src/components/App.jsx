import React from 'react/addons';

import TopBar from './TopBar';

const App = React.createClass({
  render() {
    return (
      <div className='mole-app'>
        <TopBar />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default App;
