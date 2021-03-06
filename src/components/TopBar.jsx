import React from 'react/addons';

const { PureRenderMixin } = React.addons;

const TopBar = React.createClass({
  mixins: [ PureRenderMixin ],

  render() {
    return (
      <div className='topbar'>
        <div className='container'>
          <h1><span className='primary'>Mole</span> Dashboard</h1>
          <nav>
            <ul>
              <li className='active'><a href='#/' title='Home'>Home</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
});

export default TopBar;
