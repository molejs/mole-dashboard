import React from 'react';

const Drawer = React.createClass({
  render() {
    return (
      <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header className="demo-drawer-header">
          <h5>Mole</h5>
        </header>
        <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          <a className="mdl-navigation__link" href="#/"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
        </nav>
      </div>
    );
  }
});

export default Drawer;
