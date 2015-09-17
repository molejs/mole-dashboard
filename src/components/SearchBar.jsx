import React from 'react/addons';

const { PureRenderMixin } = React.addons;

const SearchBar = React.createClass({
  mixins: [ PureRenderMixin ],

  render() {
    return (
      <div className='search-bar'>
        <div className='container'>
          <input type='text' onChange={this.props.onSearch}
            placeholder={this.props.placeholder} />
        </div>
      </div>
    );
  }
});

export default SearchBar;
