var SleepStore = require('../stores/SleepStore');
var React = require('react');
var SleepItem = require('./SleepItem');


var SleepList = React.createClass({
  getInitialState: function(){
    return {
      sleeps: SleepStore.getCompleted()
    }
  },

  componentDidMount: function() {
    SleepStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    SleepStore.removeChangeListener(this._onStoreChange);
  },

  _onStoreChange: function(){
    this.setState(this.getInitialState());
  },

  render: function() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th><span className="label label-success">Start:</span></th>
            <th><span className="label label-success">Finish:</span></th>
            <th><span className="label label-success">Duration:</span></th>
            <th><span className="label label-success">Note:</span></th>
          </tr>
        </thead>
        <tbody>
          {this.state.sleeps.map(function(sleep, index) {
            return (<SleepItem sleep={sleep} />);
          })}
        </tbody>
      </table>
    );
  }

});

module.exports = SleepList;
