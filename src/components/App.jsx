import React from 'react';

import Header from './Header';
import Drawer from './Drawer';

const App = React.createClass({
  render() {
    return (
      <div className='app'>
        <div className='demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header'>
          <Drawer />

          <div className='mdl-layout__content mdl-color--grey-100'>
            <div className='mdl-grid demo-content'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default App;
