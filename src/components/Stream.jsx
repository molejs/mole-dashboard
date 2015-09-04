import React from 'react';
import { connect } from 'react-redux';

import { filter, streamLoad } from '../actions/stream';
import { fetchLogPage } from '../apiService';
import Log from './Log';
import Header from './Header';

let l = str => str.toLowerCase();

const StreamHeader = React.createClass({
  render() {
    return (
      <Header>
        <span className="mdl-layout-title">Home</span>
        <div className="mdl-layout-spacer"></div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <div className="mdl-textfield__expandable-holder">
            <input className="mdl-textfield__input" type="text" id="search" onChange={this.props.onSearch} />
            <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
          </div>
        </div>
      </Header>
    );
  }
});

const Stream = React.createClass({
  onSearch(e) {
    this.props.dispatch(filter(e.target.value));
  },

  componentWillMount() {
    this.loadMore();
  },

  loadMore() {
    let page = this.props.stream.page + 1;
    this.props.dispatch(streamLoad(page));

    fetchLogPage(page).then(data => {
      this.props.dispatch(streamLoad(page, data));
    }).catch(() => {
      this.props.dispatch(streamLoad(page, {
        total: this.props.stream.total,
        logs: []
      }));

      alert('An error occurred loading logs!');
    });
  },

  render() {
    let logs = this.props.stream.logs
      .filter(log => !this.props.stream.filter || l(log.error.message).indexOf(l(this.props.stream.filter)) >= 0)
      .map(log => <Log log={log} key={log.id} />);
    return (
      <div className='stream'>
        <StreamHeader onSearch={this.onSearch} />
        {logs}
        {
          this.props.stream.hasMore
          ? <div className='load-more'>
            {
              this.props.stream.loading
              ? (<div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />)
              : (<button onClick={this.loadMore} className='mdl-button mdl-js-button mdl-button--primary'>Load more</button>)
            }
            </div>
          : null
        }
      </div>
    );
  }
});

export {
  Stream
};

export default connect(state => ({
  stream: state.stream
}))(Stream);
