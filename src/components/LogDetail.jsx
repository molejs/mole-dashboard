import React from 'react';
import { connect } from 'react-redux';

import { detailLoad } from '../actions/detail';
import { fetchSingleLog } from '../apiService';
import Header from './Header';

const DetailHeader = React.createClass({
  render() {
    return (
      <Header>
        <span className="mdl-layout-title">{`#${this.props.id}`}</span>
        <div className="mdl-layout-spacer"></div>
        <label>{this.props.time}</label>
      </Header>
    );
  }
});

const Card = React.createClass({
  render() {
    return (
      <div className={`detail-card log mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--${this.props.cols}-col mdl-grid`} onClick={this.onExpand}>
        {this.props.children}
      </div>
    );
  }
});

const LogDetail = React.createClass({
  componentWillMount() {
    this.props.dispatch(detailLoad());

    fetchSingleLog(this.props.params.id).then(data => {
      this.props.dispatch(detailLoad(data.log));
    }).catch(() => {
      alert('An error occurred loading logs!');
    });
  },

  render() {
    if (this.props.detail.loading) {
      return (
        <div className='load-more alone'>
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        </div>
      );
    }

    let stacktrace = (
      <div className='log__stacktrace'>
        {this.props.detail.data.error.stacktrace.map(function (line) {
          return (
            <pre>
              {`at ${line['function']} (${line.file}:${line.line}:${line.column})`}
            </pre>
          );
        })}
      </div>
    );

    let actions = this.props.detail.data.action_state_history.action.map(function (a) {
      return (
        <pre className='action-state'>{JSON.stringify(a)}</pre>
      );
    });

    let states = this.props.detail.data.action_state_history.state.map(function (s) {
      return (
        <pre className='action-state'>{JSON.stringify(s)}</pre>
      );
    });

    return (
      <div className='detail'>
        <DetailHeader id={this.props.detail.data.id} time={this.props.detail.data.timestamp} />
        <Card cols={12}>
          <a className='log__url' href={this.props.detail.data.location.href}>{this.props.detail.data.location.href}</a>
          <pre className='log__error'>{this.props.detail.data.error.message}</pre>
          {stacktrace}
        </Card>

        <Card cols={6}>
          <h5>Actions</h5>
          {actions}
        </Card>

        <Card cols={6}>
          <h5>States</h5>
          {states}
        </Card>
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
