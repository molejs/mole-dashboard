import React from 'react/addons';
import { connect } from 'react-redux';

import { detailLoad } from '../actions/detail';
import { fetchSingleLog } from '../apiService';
import Log, { LogStates, LogActions } from './Log';

const LogDetail = React.createClass({
  componentWillMount() {
    this.props.dispatch(detailLoad());

    fetchSingleLog(this.props.params.id).then(data => {
      this.props.dispatch(detailLoad(data.log));
    }).catch(err => {
      console.error(err)
      alert('An error occurred loading logs!');
    });
  },

  render() {
    let content;
    if (this.props.detail.loading) {
      content = (
        <div className='load-more alone'>
          Loading...
        </div>
      );
    } else {
      console.log(this.props.detail);
      content = (
        <div>
          <Log log={this.props.detail.data} detail={true} />
          <div className='log__action-state'>
            <LogStates states={this.props.detail.data.action_state_history.map(h => h.state)} />
            <LogActions actions={this.props.detail.data.action_state_history.map(h => h.action)} />
          </div>
        </div>
      );
    }

    return (
      <div className='log-detail'>
        <div className='container'>
          {content}
        </div>
      </div>
    );
  }
});

export {
  LogDetail
};

export default connect(state => ({
  detail: state.detail
}))(LogDetail);
