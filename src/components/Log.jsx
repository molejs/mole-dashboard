import React from 'react';
import { Navigation } from 'react-router';

const Log = React.createClass({
  mixins: [ Navigation ],

  getInitialState: () => ({
    expanded: false
  }),

  onExpand() {
    this.setState({expanded: !this.state.expanded});
  },

  viewDetail(e) {
    e.preventDefault();
    e.stopPropagation();

    this.transitionTo('/log/' + this.props.log.id);
  },

  render() {
    let stacktrace = null;
    if (this.state.expanded) {
      stacktrace = (
        <div className='log__stacktrace'>
          {this.props.log.error.stacktrace.map(function (line) {
            return (
              <pre>
                {`at ${line['function']} (${line.file}:${line.line}:${line.column})`}
              </pre>
            );
          })}
        </div>
      );
    }

    return (
      <div className='log mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid' onClick={this.onExpand}>
        <div className='log__header'>
          <span className='log__id'>#{this.props.log.id}</span>
          <button className='log__full mdl-button mdl-js-button mdl-button--primary' onClick={this.viewDetail}>View detail</button>
          <span className='log__time'>{this.props.log.timestamp}</span>
        </div>
        <a className='log__url' href={this.props.log.location.href}>{this.props.log.location.href}</a>
        <pre className='log__error'>{this.props.log.error.message}</pre>
        {stacktrace}
      </div>
    );
  }
});

export default Log;
