import React from 'react/addons';
import { connect } from 'react-redux';

import { filter, streamLoad } from '../actions/stream';
import { fetchLogPage } from '../apiService';
import Log from './Log';
import SearchBar from './SearchBar';

const l = str => str.toLowerCase();

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
    }).catch(err => {
      this.props.dispatch(streamLoad(page, {
        total: this.props.stream.total,
        logs: []
      }));

      alert('An error occurred loading logs!');
    });
  },

  filteredLog() {
    return this.props.stream.logs
      .filter(log => !this.props.stream.filter
        || l(log.error.message).indexOf(l(this.props.stream.filter)) >= 0)
  },

  render() {
    let logs = this.filteredLog()
      .map(log => <Log log={log} key={log.id} detail={false} />);

    return (
      <div className='stream'>
        <SearchBar onSearch={this.onSearch} placeholder='Search for logs...' />

        <div className='stream__logs container'>
          {logs}
        </div>
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
