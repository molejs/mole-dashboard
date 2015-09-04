import React from 'react';

const Header = React.createClass({
  render() {
    return (
      <header className="demo-header mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600">
        <div className="stream__title mdl-layout__header-row">
          {this.props.children}
        </div>
      </header>
    );
  }
});

export default Header;
