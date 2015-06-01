var React = require('react');
var Button = require("./Button.jsx");
var SleepActions = require('../actions/SleepActions.js');
var SleepStore = require('../stores/SleepStore');
var SleepItem = require('./SleepItem');
var moment = require('moment');


var SleepForm = React.createClass({

  getInitialState: function() {
    var current = SleepStore.getCurrent();
    if( current === null ) {
      current = {
        note: "",
        started: null,
        finished: null
      }
    }
    return {
      is_started: current.started !== null,
      current: current
    }
  },

  componentDidMount: function() {
    SleepStore.addChangeListener(this._onStoreChange);
  },


  componentWillUnmount: function() {
    SleepStore.removeChangeListener(this._onStoreChange);
  },

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  handleStart: function() {
    SleepActions.start(this.state.current.note);
  },

  handleStop: function() {
    SleepActions.stop(this.state.current);
  },

  renderStartButton: function() {
    return (
      <Button text="Start" onClick={this.handleStart} />
    )
  },

  renderStopButton: function() {
    return (
      <Button text="Stop" onClick={this.handleStop} />
    )
  },

  handleInputChange:function(event){
    var _current = this.state.current;
    _current.note = event.target.value;

    this.setState({
      current: _current
    });
  },

  renderStartTime: function() {
    var t = this.state.current.started;
    t = t ? moment(t).format("LT") : "--:--";
    return t;
  },

  renderDate: function() {
    var date = this.state.current.started;
    date = date ? moment(date).format("L") : "__.__.__";
    return date;
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 well">
          <div className="row">
            <div className="col-md-6">
              <p>{this.renderStartTime()}</p>
            </div>
            <div className="col-md-6">
              <p className="pull-right">{this.renderDate()}</p>
            </div>
          </div>
          <div className="center">
            {this.state.is_started ? this.renderStopButton() : this.renderStartButton()}
            <br/>
            <input  type="text"
                    value={this.state.current.note}
                    onChange={this.handleInputChange}
                    placeholder="write note"/>
          </div>
        </div>
     </div>
    );
  }

});

module.exports = SleepForm;
