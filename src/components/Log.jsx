import React from 'react/addons';
import { Navigation } from 'react-router';
import Inspector from 'react-json-inspector';

const { PureRenderMixin } = React.addons;

const Log = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      expanded: !!this.props.detail
    };
  },

  toggle() {
    this.setState({expanded: !this.state.expanded});
  },

  viewDetail(e) {
    this.transitionTo('/log/' + this.props.log.id);
  },

  getStackTrace() {
    return (
      <div className='log__stacktrace'>
        {this.props.log.error.stacktrace.map(function (line) {
          return (
            <p>
              {`at ${line['function']} (${line.file}:${line.line}:${line.column})`}
            </p>
          );
        })}
      </div>
    );
  },

  render() {
    return (
      <div className={'log' + (this.props.detail ? ' detailed' : '')}>
        <div className='log__header'>
          <h4>#{this.props.log.id}</h4>
          <span className='time'>{this.props.log.timestamp}</span>
        </div>

        <div className='log__info'>
          <div className='log__url'>
            <span>Error happened on</span>
            <a href={this.props.log.location.href}>{this.props.log.location.href}</a>
          </div>
          {!this.props.detail ? <button onClick={this.viewDetail}>View detail</button> : null}
        </div>

        <div className={'log__error' + (this.state.expanded ? ' expanded' : '')} onClick={this.toggle}>
          <p>
            {this.props.log.error.message}
          </p>
          {this.state.expanded ? this.getStackTrace() : null}
        </div>
      </div>
    );
  }
});

const LogStates = React.createClass({
  mixins: [ PureRenderMixin ],

  render() {
    let states = this.props.states.map(s => <Inspector data={s} search={false} />);

    return (
      <div className='states'>
        <h5>States</h5>
        {states}
      </div>
    );
  }
});

const LogActions = React.createClass({
  mixins: [ PureRenderMixin ],

  render() {
    let actions = this.props.actions.map(a => <Inspector data={a} search={false} />);

    return (
      <div className='actions'>
        <h5>Actions</h5>
        {actions}
      </div>
    );
  }
});

export {
  LogStates,
  LogActions
};

export default Log;
